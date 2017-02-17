import {store} from '../index';
import moment from 'moment';
import {remote} from 'electron';

const logger = remote.getGlobal('sharedObj').logger;
const userDir = remote.getGlobal('sharedObj').userDir;

logger.info("*** userDir: ", userDir);

let startTs;

// updates activityLog in redux but also returns a promise
// to be used for email updates
export function updateActivityLog() {

    startTs = new Date();
    const activityLog = {lastLog: 0, activities: []};
    store.dispatch({"type": "ACTIVITY_LOG_LOADED", payload: activityLog});
    const lastTs = activityLog.lastLog;
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database(userDir + 'papageno/papageno.db', (err) => {
        if (err) {
            logger.error("*** error opening db from updateActivityLog: ", err);
            alert("updateActivityLog: " + err.stack);
        }
    });

    return fetchTrafficFromDb(db, lastTs)
        .then((traffic) => {
            buildTrafficLogEntries(traffic, activityLog);
            return fetchSysupFromDb(db, lastTs)
        })
        .then((sysups) => {
            buildSysupLogEntries(sysups, activityLog);
            store.dispatch({"type": "ACTIVITY_LOG_LOADED", payload: JSON.parse(JSON.stringify(activityLog))});
            db.close();
            logger.info("*** activityLog update time:", new Date() - startTs, "ms");
            return Promise.resolve(activityLog);
        })
        .catch((err) => {
            db.close();
            logger.error("*** updateActivityLog/fetchTraffic error: ", err);
            return Promise.reject("problem fetching data via updateActivityLog() ")
        })
}


function fetchTrafficFromDb(db, lastTs) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT ts, mac FROM traffic WHERE ts > ${lastTs}`,
            function (err, rows) {
                if (err) {
                    logger.error("*** db traffic fetch error from updateActivityLog: ", err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
    });
}

function fetchSysupFromDb(db, lastTs) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT ts FROM sysup WHERE ts > ${lastTs}`,
            function (err, rows) {
                if (err) {
                    logger.error("*** db sysup fetch error from updateActivityLog: ", err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
    });
}


function buildTrafficLogEntries(allTraffic, activityLog) {

    const window = store.getState().appState.userConfig.windowGoneTarget;
    const activities = activityLog.activities;
    let targets = store.getState().appState.targets;
    // targets.push(store.getState().appState.userConfig.sysUp);
    const tmacs = targets
        .filter((x) => {
            return x.onLogs
        })
        .map(x => x.macHex);
    // reduce population to only target traffic
    const ttraffic = allTraffic.filter(function (x) {
        return this.indexOf(x.mac) >= 0
    }, tmacs);
    // create entries by mac

    for (let t of targets) {
        ttraffic
            .filter((x) => {
                return x.mac === t.macHex
            })
            .forEach((x, i, arr) => {
                if (i === 0) {  // first traffic entry for incremental log build
                    if (activityLog.lastLog != 0 && x.ts - activityLog.lastLog >= window) {
                        activities.push({
                            ts: activityLog.lastLog,
                            mac: t.macHex,
                            avatar: t.avatar,
                            dname: t.dname,
                            prez: 0
                        });
                        activities.push({ts: x.ts, mac: t.macHex, avatar: t.avatar, dname: t.dname, prez: 1});
                    } else {  // first traffic entry in initial log build
                        if (activityLog.lastLog == 0) {
                            activities.push({ts: x.ts, mac: t.macHex, avatar: t.avatar, dname: t.dname, prez: 1});
                        }
                    }
                }
                if (i !== 0 && x.ts - arr[i - 1].ts >= window) { // all but the first traffic entry
                    activities.push({ts: arr[i - 1].ts, mac: t.macHex, avatar: t.avatar, dname: t.dname, prez: 0});
                    activities.push({ts: x.ts, mac: t.macHex, avatar: t.avatar, dname: t.dname, prez: 1});
                }
                if (i === arr.length - 1) {  // only the last traffic entry
                    if (moment().unix() - x.ts >= window) {
                        activities.push({ts: arr[i].ts, mac: t.macHex, avatar: t.avatar, dname: t.dname, prez: 0});
                    }
                }
            })
    }
}


function buildSysupLogEntries(sysups, activityLog) {
    const window = store.getState().appState.userConfig.windowGoneSysup;
    const activities = activityLog.activities;
    const sysUp = store.getState().appState.userConfig.sysUp;
    sysups
        .forEach((x, i, arr) => {
            if (i === 0) {  // first sysup entry for incremental log build
                if (activityLog.lastLog != 0 && x.ts - activityLog.lastLog >= window) {
                    activities.push({ts: activityLog.lastLog - 1, mac: "", dname: "[SYS DOWN]", prez: 0});
                    activities.push({ts: x.ts, mac: sysUp.macHex, avatar: sysUp.avatar, dname: "[SYS UP]", prez: 1});
                } else {  // first sysup entry in initial log build
                    if (activityLog.lastLog == 0) {
                        activities.push({
                            ts: x.ts,
                            mac: sysUp.macHex,
                            avatar: sysUp.avatar,
                            dname: "[SYS UP]",
                            prez: 1
                        });
                    }
                }
            }
            if (i !== 0 && x.ts - arr[i - 1].ts >= window) {  // all but the first sysup entry
                activities.push({
                    ts: arr[i - 1].ts,
                    mac: sysUp.macHex,
                    avatar: sysUp.avatar,
                    dname: "[SYS DOWN]",
                    prez: 0
                });
                activities.push({ts: x.ts, mac: sysUp.macHex, avatar: sysUp.avatar, dname: "[SYS UP]", prez: 1});
            }
            if (i === arr.length - 1) {  // only the last sysup entry
                if (moment().unix() - x.ts >= window) {
                    activities.push({
                        ts: arr[i].ts,
                        mac: sysUp.macHex,
                        avatar: sysUp.avatar,
                        dname: "[SYS DOWN]",
                        prez: 0
                    });
                }
            }
        })
}


export function sortAscending(x, y) {
    if (x.ts != y.ts) {
        return x.ts - y.ts
    } else {
        if (x.mac == y.mac) {
            if (x.prez) {
                return -1
            } else {
                return 1
            }
        } else {
            if (x.mac > y.mac) {
                return 1
            } else {
                return -1
            }
        }
    }
}

export function sortDescending(x, y) {
    if (x.ts != y.ts) {
        return y.ts - x.ts
    } else {
        if (x.mac == y.mac) {
            if (x.prez) {
                return 1
            } else {
                return -1
            }
        } else {
            if (x.mac > y.mac) {
                return -1
            } else {
                return 1
            }
        }
    }
}

