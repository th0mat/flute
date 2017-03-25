import moment from 'moment';
import {store} from '../index';
import {sendMail} from './sendMail';
import {sortAscending} from './updateActivityLog';
import {remote} from 'electron';
import {ee} from './liveEvents';

const logger = remote.getGlobal('sharedObj').logger;


export default class Notifier {

    constructor() {
        this.notifierInterval = null;
        this.ee = ee;
        this.liveWatch = this.liveWatch.bind(this);
        this.liveWatch.last = {};
    }

    turnOn() {
        if (this.notifierInterval) return; // already running
        this.run();
        this.notifierInterval = setInterval(() => this.run(), 1000 * 30); // sqlite write is every 60 secs
        logger.info(`*** notifier interval ${this.notifierInterval} created`)
        this.ee.on('data', this.liveWatch);
    }

    turnOff() {
        clearInterval(this.notifierInterval);
        logger.info(`*** notifier interval ${this.notifierInterval} cleared`);
        this.notifierInterval = null;
        this.ee.removeListener('data', this.liveWatch);
        this.run.old = null;
    }

    openDb() {
        const sqlite3 = require('sqlite3').verbose();
        const db = new sqlite3.Database(store.getState().appState.userDir + 'papageno/papageno.db', (err) => {
            if (err) {
                logger.error("*** error opening db from Notifier: ", err);
                db.close()
            }
        });
        db.configure("busyTimeout", 5000);
        return db;
    }

    run() {  // for gone notifications and creation of run.old
        // which is also used for back comparison
        const windowGone = store.getState().appState.userConfig.windowGoneTarget;
        const db = this.openDb();
        const lastSeenNew = {};
        const targets = store.getState().appState.targets;
        targets.forEach(x => lastSeenNew[x.macHex] = null);
        const targetMacs = targets.map(x => x.macHex);
        let now = moment().unix();
        now = now - now % 60;
        const dbTimer = +new Date();
        db.all(
            `SELECT mac, MAX(ts) AS ts FROM traffic WHERE ts >= ${now - windowGone} GROUP BY mac`,
            function (err, rows) {
                if (err) {
                    logger.error("*** error in Notifier/updateLastSeen", err);
                    db.close();
                    return;
                }
                if (rows.length != 0) {
                    rows
                        .filter(function (x) {
                            return this.indexOf(x.mac) >= 0;
                        }, targetMacs)
                        .forEach(function (x) {
                            lastSeenNew[x.mac] = x.ts
                        });
                }
                logger.info(`*** notifier db read time: ${+new Date() - dbTimer} ms`);
                db.close();
                if (this.run.old) {
                    this.lastSeenComparer(this.run.old, lastSeenNew);
                } else {
                    this.run.old = lastSeenNew; // to not overwrite liveWatch entries
                    // into this.run.old
                }
            }.bind(this));
    }


    lastSeenComparer(lsOld, lsNew) {
        const windowGone = store.getState().appState.userConfig.windowGoneTarget;
        let now = moment().unix();
        now = now - now % 60;
        const gone = [];
        const back = [];
        // looking for GONE
        for (let key in lsNew) {
            // was there (=> not yet notified, otherwise null), but long ago
            if (lsOld[key] && lsNew[key] && (now - lsNew[key] >= windowGone)) {
                if (!this.liveWatch.last[key] || this.liveWatch.last[key] < now - 100) {  // to check against double issuance to to run.old overwrite
                    gone.push([key, lsNew[key]]);
                    logger.info(`*** gone notification trigger for ${key}`)
                    lsNew[key] = null;
                }
                // if the same period is run again, to avoid second notification the
                // following run
                if (!lsOld[key] && now - lsNew[key] > 60) {
                    lsNew[key] = null;
                }
            }
            this.run.old = lsNew;
            if (store.getState().appState.notifyBySys) this.notifyBySys(gone, back);
            if (store.getState().appState.notifyByEmail) this.notifyByEmail(gone, back);
        }
    }

    liveWatch(data) {  // for back notifications
        const targets = store.getState().appState.targets;
        const targetMacs = targets.map(x => x.macHex);
        let back = [];
        let arr = Object.entries(JSON.parse(data));
        arr = arr.map(x => {
            return x[0]
        });
        arr = arr.filter(x => targetMacs.includes(x));
        // console.log("*** arrData:", arr)
        let now = moment().unix();
        now = now - now % 60;
        const last = this.liveWatch.last || {};
        if (this.run.old) {
            arr.forEach(x => {
                if (!this.run.old[x]) {  // if not found in the old last seen
                    if (!last[x] || last[x] < now - 100) {  // to check against double issuance to to run.old overwrite
                        back.push([x, now]);
                        logger.info(`*** back notification trigger for ${x}`)
                        last[x] = now;
                        console.log("*** this.liveWatch.last", this.liveWatch.last);
                        this.run.old[x] = now;

                    }
                }
            })
        }
        if (back.length > 0) {
            if (store.getState().appState.notifyBySys) this.notifyBySys([], back);
            if (store.getState().appState.notifyByEmail) this.notifyByEmail([], back);
        }
    }


    notifyBySys(gone, back) {
        const targets = store.getState().appState.targets;
        const userDir = store.getState().appState.userDir;
        if (gone.length != 0) {
            gone
                .filter((x) => {
                    const t = targets.find(t => t.macHex == x[0]);
                    return t.notifyGone;
                })
                .forEach((x) => {
                    const t = targets.find(t => t.macHex == x[0]);
                    new Notification(`Gone - ${t.dname}`, {
                        body: `last seen at ${moment(x[1] * 1000).format("h:mm a")}`,
                        icon: userDir + t.avatar
                    });
                })
        }
        if (back.length != 0) {
            back
                .filter((x) => {
                    const t = targets.find(t => t.macHex == x[0]);
                    return t.notifyBack;
                })
                .forEach((x) => {
                    const t = targets.find(t => t.macHex == x[0]);
                    new Notification(`Back - ${t.dname}`, {
                        body: `at ${moment(x[1] * 1000).format("h:mm a")}`,
                        icon: userDir + t.avatar
                    });
                })
        }
    }


    notifyByEmail(gone, back) {
        const targets = store.getState().appState.targets;
        const g = gone
            .filter((x) => {
                const t = targets.find(t => t.macHex == x[0]);
                return t.notifyGone;
            })
            .map(x => {
                return ['gone', x[0], x[1]]
            });
        const b = back
            .filter((x) => {
                const t = targets.find(t => t.macHex == x[0]);
                return t.notifyBack;
            })
            .map(x => {
                return ['back', x[0], x[1]]
            });
        const all = [...g, ...b];
        if (all.length === 0) return;
        const named = all.map(x => {
            let t = targets.find(t => t.macHex == x[1]);
            return [t.dname, ...x]
        });
        // named format [[dname, goneOrBack, mac, ts], ...]
        named.forEach(x => {
            let subj = `${x[0]} is ${x[1]}`;
            let content = x[1] === 'gone' ?
                `${x[0]} was last seen at ${moment.unix(x[3]).format("h:mm a")}` :
                `${x[0]} is back since ${moment.unix(x[3]).format("h:mm a")}`;
            sendMail(subj, content)
                .catch(err => {
                    logger.error(`*** sendMail promise from notifyByEmail rejected: ${err}`);
                });
            logger.info(`*** email notification sent for ${x[0]} (${x[1]})`);
        })
    }
}

// assumption: activityLog was already updated
export function getLogTableHtml() {
    const activities = store.getState().appState.activityLog.activities;
    const targets = store.getState().appState.targets;
    const filtered = activities.filter((x) => {
        const t = targets.find((tar) => {
            return tar.macHex == x.mac
        });
        if (t) return t.onLogs;
        if (x.dname.indexOf("SYS") != -1) return true;
        //return false;
    });
    const filteredAsc = filtered.sort(sortAscending);
    let html = '<table><tr><th>Date</th><th>Name</th><th>In</th><th>Out</th></th>';
    filteredAsc.forEach((e) => {
        html += '<tr><td>' + moment.unix(e.ts).format("MMM DD") + '</td><td>' + e.dname + '</td><td>'
            + (e.prez ? moment.unix(e.ts).format("HH:mm") : "") + '</td><td>' +
            (e.prez ? "" : moment.unix(e.ts).format("HH:mm")) + '</td></tr>'
    });
    html += '</table>';
    return html;
}
