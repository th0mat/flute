/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import {connect} from 'react-redux'
import pty from 'pty.js';
import sql from 'sqlite3';
import {remote, shell} from 'electron';
import MonitorCfTarget from './monitorCfTarget.js';
import MonitorCfLegend from '../components/monitorCfLegend';
import getWifiDevice from '../utils/getWifiDevice';


const logger = remote.getGlobal('sharedObj').logger;

function addPeriod(targets, justIn) {
    for (let i = 0; i < targets.length - 1; i++) { // don't include TOTAL in loop
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

const props = (store) => {
    return {
        targets: store.appState.targets,
        userDir: store.appState.userDir,
        appDir: store.appState.appDir,
        liveSys: store.appState.userConfig.liveSys
    };
};


class MonitorConnect extends React.Component {

    constructor(props) {
        super(props);
        const sqlite3 = sql.verbose();
        this.db = new sqlite3.Database(this.props.userDir + 'papageno/papageno.db', (err) => {
            if (err) {
                logger.error("*** error opening db from monitorConnect: ", err);
                alert("monitorConnect.js: " + err.stack);
            }
        });
        let tmpTargets = JSON.parse(JSON.stringify(this.props.targets)); // to not add traffic[] to targets.json
        let targetsWithTraffic = tmpTargets.map(x => {
            x['traffic'] = new Array(12).fill(0);
            return x;
        });
        this.state = {targets: targetsWithTraffic};
        this.updateLastSeen();
    }


    componentDidMount() {
        this.turnOnScanning();
    }


    updateLastSeen() {
        this.lastSeen = {};
        const targetsTmp = JSON.parse(JSON.stringify(this.state.targets));
        this.db.all(
            `SELECT mac, MAX(ts) AS ts FROM traffic GROUP BY mac`,
            function (err, rows) {
                if (err) {
                    logger.error("*** error in MonitorConnect/updateLastSeen", err);
                    return;
                }
                rows.forEach((x) => {
                    this.lastSeen[x.mac] = x.ts
                });
                for (let t of targetsTmp) {

                    t.lastSeen = this.lastSeen[t.macHex] ? new Date(this.lastSeen[t.macHex] * 1000) : null;
                }
                this.setState({targets: targetsTmp})
            }.bind(this));
    }


    turnOnScanning() {

        this.term = pty.spawn('sh', ['-c', `cd ${this.props.userDir}/papageno; ./pap_live ${getWifiDevice()} json`], {
            name: 'xterm-color', cols: 80, rows: 30, cwd: process.env.HOME, env: process.env
        });
        const that = this;
        this.term.on('data', function (data) {
            try {
                const justIn = JSON.parse(data);
                let targetsTmp = JSON.parse(JSON.stringify(that.state.targets));
                targetsTmp = addPeriod(targetsTmp, justIn);
                that.setState({
                    targets: targetsTmp
                });
            } catch (e) {
                logger.warn("*** error processing live data: ", data.toString())
            }
        })
    }

    componentWillUnmount() {
        if (this.term) this.term.destroy();
        this.db.close();
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
                    <h3>Live Monitor</h3>
                    <MonitorCfLegend></MonitorCfLegend>
                </div>
                <div className="flContent" style={{paddingRight: '0px'}}>
                    <div>
                        {this.props.targets.length == 0 ? this.noTargetsMsg() :
                            <div className="flTargets"> {
                                this.state.targets
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