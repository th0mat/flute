import {connect} from 'react-redux';
import React from 'react';
import moment from 'moment';
import {remote} from 'electron';

import HistoryCfHour from "./historyCfHour";

const logger = remote.getGlobal('sharedObj').logger;

@connect((store) => {
    return {
        tsec: store.appState.targets,
        userDir: store.appState.userDir
    };
})
export default class hours extends React.Component {

    constructor(props) {
        super(props);
        const sqlite3 = require('sqlite3').verbose();
        this.db = new sqlite3.Database(this.props.userDir + 'papageno/papageno.db', sqlite3.OPEN_READONLY,
            (err)=>{
            if (err) {
                logger.error("*** error opening db from historyHours: ", err);
                alert("historyHours: " + err.stack);
            }
        });
        this.db.configure("busyTimeout", 5000)
        this.state = {macHistory: []};
        this.fetchFromDb(this.props.mac);

    }

    componentWillMount() {
    }


    componentDidMount() {
    }


    componentWillUnmount() {
        this.db.close();
    };



    fetchFromDb(mac) {
        const agg = [];
        this.db.all(
            `SELECT sysup.ts5 AS ts, sysup.upmin AS upmin, traffic.bytes AS bytes
FROM (SELECT (ts-ts%300 + 300) AS ts5, SUM(secs)/60 AS upmin FROM sysup GROUP BY ts5) sysup
LEFT JOIN (SELECT mac, (ts-ts%300 + 300) AS ts5, SUM(bytes) AS bytes FROM traffic WHERE mac = "${mac}" GROUP BY ts5) traffic
ON sysup.ts5=traffic.ts5;`,
            function (err, rows) {
                if (err) {
                    logger.error("*** From historyHours: ", err);
                    return;
                }
                rows.forEach((x)=>agg.push([x.ts, [x.upmin, x.bytes]]));
                const history = this.addEmptyTs(agg);
                this.setState({macHistory: history});
            }.bind(this));
    }


    addEmptyTs(agg) {
        const allTs = new Map();
        const todayDay24 = moment().hours(24).minutes(0).seconds(0).unix();
        const firstDay00 = moment.unix(agg[0][0]).hours(0).minutes(0).seconds(0).unix();
        // create map of empty ts for all ts between 00:00 of first day and 24:00 of today
        let t = firstDay00 + (60 * 5);
        while (t <= todayDay24) {
            allTs.set(t, [0, 0]);
            t += 60 * 5;
        }
        // add actual traffic data from db
        for (let ts of agg) {
            allTs.set(ts[0], [ts[1][0], ts[1][1]]);
        }
        // transfor map to array of [[tsHour00, [[bytes, bytes, ... ][upmin, upmin, ...]], ..]
        let history = [];
        const left = Array.from(allTs);
        let current = [];
        while (left.length >= 12) {
            current = left.splice(0, 12);
            let tmp = [];
            tmp[0] = current[0][0];  // set mac
            let innerTraffic = [];
            let innerSysup = [];
            for (let i = 0; i < 12; i++) {
                innerSysup[i] = current[i][1][0];
                innerTraffic[i] = current[i][1][1];
            }

            tmp[1] = [innerSysup, innerTraffic];
            history.push(tmp);
        }
        history = history.reverse();
        // cut off today's hours from now to midnight
        const cutHours = 24 - moment().hours() - 1;
        history.splice(0, cutHours);
        // mark not yet minutes of current hour neg.
        let notYetMinutes = Math.floor(moment().minutes() / 5) + 1;
        for (notYetMinutes; notYetMinutes < 12; notYetMinutes++) {
            history[0][1][1][notYetMinutes] = -0.01; // small enough to be rounded out
        }
        return history;
    }



    render() {

        return (
            <div>
                <div>
                {
                    this.state.macHistory.map((x) => {
                            return (
                                <HistoryCfHour
                                    key={x[0]}
                                    hour={x[0]-300}
                                    traffic={x[1][1]}
                                    sysup={x[1][0]}
                                ></HistoryCfHour>
                            )
                        }
                    )
                }
                </div>
            </div>
        )
    }

};


