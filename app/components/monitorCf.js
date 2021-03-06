import React from 'react';
import {connect} from 'react-redux'
import sql from 'sqlite3';
import {remote, shell} from 'electron';
import MonitorCfTarget from './monitorCfTarget.js';
import MonitorCfLegend from '../components/monitorCfLegend';
import * as liveEvents from '../utils/liveEvents';
import {store} from '../index';
import {liveMonitorOffWarning} from '../utils/logSysOnOff';


const logger = remote.getGlobal('sharedObj').logger;
const userDir = remote.getGlobal('sharedObj').userDir;

function addPeriod(targets, justIn) {
    for (let i = 0; i < targets.length; i++) {
        if (justIn[targets[i].macHex]) { // just in mac is a target
            targets[i].traffic.unshift(justIn[targets[i].macHex]);
            targets[i].lastSeen = new Date();
        } else {
            targets[i].traffic.unshift(0);
        }
        targets[i].traffic.pop();
    }
    return targets;
}


function monitor(data) {
    try {
        const justIn = JSON.parse(data);
        let targetsTmp = JSON.parse(JSON.stringify(store.getState().appState.monitorData));
        targetsTmp = addPeriod(targetsTmp, justIn);
        store.dispatch({type: "MONITOR_DATA", payload: targetsTmp
        });
    } catch (e) {
        logger.warn("*** error processing live data: ", data.toString())
    }
}


// started by index.js to ensure early data collection

export function initialMonitorStartup() {
    const sqlite3 = sql.verbose();
    const db = new sqlite3.Database(userDir + 'papageno/papageno.db', (err) => {
        if (err) {
            logger.error("*** error opening db from monitorConnect: ", err);
            alert("monitorConnect.js: " + err.stack);
        }
    });
    // add traffic[] to targets
    let tmpTargets = JSON.parse(JSON.stringify(store.getState().appState.targets));
    let targetsWithTraffic = tmpTargets.map(x => {
        x['traffic'] = new Array(12).fill(0);
        return x;
    });

    const lastSeen = {};
    db.all(
        `SELECT mac, MAX(ts) AS ts FROM traffic GROUP BY mac`,
        function (err, rows) {
            if (err) {
                logger.error("*** error in MonitorConnect/updateLastSeen", err);
                return;
            }
            rows.forEach((x) => {
                lastSeen[x.mac] = x.ts
            });
            for (let t of targetsWithTraffic) {
                t.lastSeen = lastSeen[t.macHex] ? new Date(lastSeen[t.macHex] * 1000) : null;
            }
            store.dispatch({type: "MONITOR_DATA", payload: targetsWithTraffic})
            turnOnMonitor();
            db.close();
        });
    }


export function turnOnMonitor() {
    if (!store.getState().appState.monitorCp) liveEvents.turnLiveMonitorOn();
    term = liveEvents.ee;
    removeListener();
    term.on('data', monitor);
};


function removeListener(){
    if (term && term.listeners('data').includes(monitor)) {
        term.removeListener('data', monitor);
    }
}


let term;

const props = (store) => {
    return {
        targets: store.appState.targets,
        monitorData: store.appState.monitorData,
        userDir: store.appState.userDir,
        appDir: store.appState.appDir,
        liveSys: store.appState.userConfig.liveSys
    };
};


class MonitorConnect extends React.Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        //turnOnMonitor();
    }

    componentWillMount() {
        liveMonitorOffWarning();
    };


    componentWillUnmount() {
    };

    noTargetsMsg(){
        return <div style={{paddingRight: '10px'}} ><br/><h4>No profiles to display yet</h4><p>Learn how to add, change or remove profiles and make
        them appear on the live traffic monitor:</p>
            <p style={{cursor: 'pointer', color: 'blue'}} onClick={()=>shell.openExternal("https://packetmozart.com/how-to-videos/")}>
                how-to videos</p>
            <br/><br/>
            <img src={this.props.appDir + '/assets/img/noteBirds.png'}
                 style={{height: '50px', width: '50px', margin: 'auto', display: 'block'}}alt=""/>
        </div>
    }


    render() {

        return (

            <div className="flContentFrame">
                <div className="flContentFrozenTop">
                    <h3 id="title">Live Monitor</h3>
                    <MonitorCfLegend></MonitorCfLegend>
                </div>
                <div className="flContent" style={{paddingRight: '0px'}}>
                    <div>
                        {this.props.monitorData.length == 0 ? this.noTargetsMsg() :
                            <div className="flTargets"> {
                                this.props.monitorData
                                    .filter(x => {
                                        return x.onMonitor
                                    })
                                    .map(function (target) {
                                        return (<MonitorCfTarget key={ target.macHex }
                                                                 macHex={ target.macHex }
                                                                 dname={ target.dname }
                                                                 avatar={ target.avatar }
                                                                 lastSeen={ target.lastSeen }
                                                                 traffic={ target.traffic }> </MonitorCfTarget>
                                        )
                                    })
                            }
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(props)(MonitorConnect);