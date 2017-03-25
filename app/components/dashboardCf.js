import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import fs from 'fs';
import moment from 'moment';
import validateEmail from '../utils/validateEmail';
import formatNumber from '../utils/formatNumber';
import * as logSys from '../utils/logSysOnOff'
import tooltipButton from '../utils/tooltipButton';
import {Switch, Button, Position, Tooltip } from "@blueprintjs/core";

import {remote, shell} from 'electron';

const logger = remote.getGlobal('sharedObj').logger;

const props = (store) => {
    return {
        logSysUp: store.appState.logSysUp,
        appDir: store.appState.appDir,
        userDir: store.appState.userDir,
        retentionDays: store.appState.userConfig.retentionDays,
        notifier: store.appState.notifier, // if not null, notifier is running
        notifyBySys: store.appState.notifyBySys,
        notifyByEmail: store.appState.notifyByEmail,
        emailAddress: store.appState.userConfig.notificationEmailAddress,
        mozartMsg: store.appState.mozartMsg
    }
}


class DashboardCf extends React.Component {

    constructor(props) {
        super(props);
        this.toggleEmailNotifier = this.toggleEmailNotifier.bind(this);
        this.toggleSysNotifier = this.toggleSysNotifier.bind(this);
        this.temporaryOff = this.temporaryOff.bind(this);
        this.getSysStatusMsg = this.getSysStatusMsg.bind(this);
        this.handleLogSysSwitch = this.handleLogSysSwitch.bind(this);
        this.countDownInterval = null;
        const sqlite3 = require('sqlite3').verbose();
        this.db = new sqlite3.Database(this.props.userDir + 'papageno/papageno.db', sqlite3.OPEN_READONLY,
            (err) => {
                if (err) {
                    logger.error("*** error opening db from dashboard: ", err);
                    alert("dashboard.js: " + err.stack);
                }
            });
        this.db.configure("busyTimeout", 5000)
        this.state = {
            dbSize: 0,
            noHardMacs: 0,
            noSoftMacs: 0,
            noRecs: 0,
            minTs: 0,
            countDown: 0
        };
    }


    componentWillMount() {
        this.getDbSize(this.props.userDir + 'papageno/papageno.db');
        this.getMinTs();
        this.getMaxTs();
        this.countRecs();
        this.countMacs();
    }


    componentDidMount() {
        if (remote.getGlobal('sharedObj').configReset == true) this.showResetMsg();
    }


    componentWillUnmount() {
        this.db.close();
        if (this.countDownInterval) clearInterval(this.countDownInterval);
    };


    getDbSize(path) {
        const that = this;
        fs.stat(path, function (err, stats) {
            if (err) {
                logger.error("*** error reading file size: ", err);
                return;
            }
            that.setState({...that.state, dbSize: stats["size"]});
        });
    }

    getMinTs() {
        const that = this;
        const dbTimer = +new Date();
        this.db.all(
            `SELECT MIN(ts) as ts FROM traffic`,
            function (err, rows) {
                if (err) {
                    logger.error('error accessing db dashboard getMinTs: ', err);
                    return;
                }
                that.setState({minTs: rows[0].ts});
                logger.info(`*** earliest timestamp db read time: ${+new Date() - dbTimer} ms`);
            });
    }

    getMaxTs() {
        const that = this;
        const dbTimer = +new Date();
        this.db.all(
            `SELECT MAX(ts) as ts FROM traffic`,
            function (err, rows) {
                if (err) {
                    logger.error('error accessing db dashboard/getMaxTs: ', err);
                    return;
                }
                logger.info(`*** newest timestamp db read time: ${+new Date() - dbTimer} ms`);
                that.setState({maxTs: rows[0].ts});
            });
    }

    countRecs() {
        const that = this;
        const dbTimer = +new Date();
        this.db.all(
            `SELECT COUNT(ts) as ts FROM traffic`,
            function (err, rows) {
                if (err) {
                    logger.error('error accessing db dashboard/countRecs: ', err);
                    return;
                }
                logger.info(`*** count records db read time: ${+new Date() - dbTimer} ms`);
                that.setState({noRecs: rows[0].ts});
            });
    }

    countMacs() {
        const that = this;
        const randStr = '2367abef';
        const dbTimer = +new Date();
        this.db.all(
            `select mac from traffic group by mac`,
            function (err, rows) {
                if (err) {
                    logger.error('error accessing db dashboard/countMacs: ', err);
                    return;
                }
                let rands = rows.filter(x=>randStr.includes(x.mac[1]));
                logger.info(`*** count unique macs db read time: ${+new Date() - dbTimer} ms`);
                that.setState({noHardMacs: rows.length - rands.length, noSoftMacs: rands.length});
            });
    }

    toggleSysNotifier() {
        logger.info(`*** system notifications turned ${!this.props.notifyBySys ? 'on' : 'off'}`)
        this.props.dispatch({type: "SET_NOTIFIER_SYS", payload: !this.props.notifyBySys});
        if (this.props.notifier.notifierInterval) {
            if (!this.props.notifyByEmail) {
                this.props.notifier.turnOff();
            } else {
                logger.error("*** notifer stays on");
            }
        } else {
            this.props.notifier.turnOn();
        }
    }

    toggleEmailNotifier() {
        logger.info(`*** email notifications turned ${!this.props.notifyByEmail ? 'on' : 'off'}`)
        this.props.dispatch({type: "SET_NOTIFIER_EMAIL", payload: !this.props.notifyByEmail});
        if (this.props.notifier.notifierInterval) {
            if (!this.props.notifyBySys) {
                this.props.notifier.turnOff();
            } else {
                // logger.info("*** notifier stays on")
            }
        } else {
            this.props.notifier.turnOn();
        }
    }

    handleLogSysSwitch() {
        if (this.props.logSysUp) {
            logSys.monitorModeOff()
        } else {
            this.setState({countDown: 0});
            logSys.monitorModeOn();
        }
    }

    temporaryOff() {
        logSys.monitorModeOff();
        this.setState({countDown: 60});
        this.countDownInterval = setInterval(() => {
            this.setState({countDown: this.state.countDown - 1})
        }, 1000);
        setTimeout(() => {
            logSys.monitorModeOn();
            clearInterval(this.countDownInterval);
            this.countDownInterval = null;
            this.setState({countDown: 0});
        }, 60000);
    }

    getSysStatusMsg() {
        if (this.props.logSysUp) {
            return (
                <span>system is up &nbsp;| &nbsp;disable for 60 sec&nbsp;&nbsp;
                <Tooltip position={Position.BOTTOM}
                         hoverOpenDelay={1000}
                         content={<div className="flToolTip"><p>disable logging system for 60 seconds,
                         then turn it on again automatically</p></div>}>
                    <a className="pt-button flMini pt-icon-automatic-updates" onClick={this.temporaryOff}></a></Tooltip>
                </span>);
        } else {
            if (this.state.countDown == 0)
                return (<span style={{color: "orange"}}>not running</span>);
            else {
                return (<span>will automatically restart in &nbsp;
                    <span style={{color: "orange"}}>{this.state.countDown}</span></span>)
            }
        }
    }

    getDashboardTip() {
        let tip = this.props.mozartMsg ? this.props.mozartMsg.dashboardTip : null;
        let disp = "";
        if (tip) {
            disp =
                <div>
                    <h4>{tip.title}</h4>
                    <p style={{cursor: 'pointer'}} onClick={()=>shell.openExternal(tip.link)}>
                        {tip.text}</p>
                </div>
        }
        return disp;
    }

    showResetMsg(){
        remote.dialog.showMessageBox(remote.getCurrentWindow(), {
            type: "warning",
            title: "Configuration Settings",
            message: "MagicFlute detected default settings. Please review your settings and customize.",
            buttons: ['OK']
        }, (x)=>{
            remote.getGlobal('sharedObj').configReset = false;
            browserHistory.push('/config');
        })
    }



    render() {

        let sysStatusMsg = this.getSysStatusMsg();


        return (
            <div className="flContentFrame" style={{textAlign: 'center'}}>
                <div className="flContentFrozenTop">
                    <img src={this.props.appDir + '/assets/img/noteBirds.png'} style={{width: '80px',
                    height: '80px', marginTop: '20px', marginBottom: '20px'
                    }}/>
                    <br/>
                </div>

                <div className="flContent">


                    <h4 id="firstH4">Logging system status</h4>
                    <br/>

                    <Switch style={{display: 'inline'}} checked={this.props.logSysUp} label=""
                            onChange={this.handleLogSysSwitch}/>
                    <span>{sysStatusMsg}</span>
                    <p onClick={()=>{browserHistory.push("/history/000000000000")}}
                    className="flDashboardLink">system uptime history</p>
                    <br/>


                    <h4>Notification switches</h4>
                    <br/>

                    <div>
                        <Switch id="sysNotify" style={{display: 'inline'}} checked={this.props.notifyBySys}
                                label={this.props.notifyBySys ? "system notifications are on" :
                         "sytstem notifciations are off"} onChange={this.toggleSysNotifier}>
                        </Switch><br/><br/>

                        <Switch id="emailNotify" style={{display: 'inline'}} checked={this.props.notifyByEmail}
                                label={this.props.notifyByEmail ? "email notifications are on" :
                         "email notifciations are off"} onChange={this.toggleEmailNotifier}>
                        </Switch>

                        {(this.props.notifyByEmail && !validateEmail(this.props.emailAddress)) ? <p style={{
                            color: "orange",
                            cursor: "pointer"

                        }} onClick={()=>{browserHistory.push('/config')}}>set valid email address</p> : ""}

                        <br/>

                    </div>
                    <br/><br/>

                    <h4 style={{display: "inline"}}>Data base status &nbsp;</h4>
                        {tooltipButton("refresh status", "pt-icon-refresh flMini", '/bouncer/dashboard/1000')}
                    <br/><br/>
                    <div>
                        <table className="pt-table pt-striped" style={{margin: 'auto'}}>
                            <tbody>
                            <tr>
                                <td style={{paddingLeft: '0px'}}>Database size (KB)</td>
                                <td style={{textAlign: 'right'}}>{formatNumber(this.state.dbSize / 1000, 0)}</td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: '0px'}}>Time stamp of first record</td>
                                <td style={{textAlign: 'right'}}>{(this.state.minTs === null) ?
                                    'n/a' : moment(this.state.minTs * 1000).calendar()}</td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: '0px'}}>Time stamp of last record</td>
                                <td style={{textAlign: 'right'}}>{(this.state.maxTs === null) ?
                                    'n/a' : moment(this.state.maxTs * 1000).calendar()}</td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: '0px'}}>Number of records</td>
                                <td id="noOfRecs" style={{textAlign: 'right'}}>{formatNumber(this.state.noRecs, 0)}</td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: '0px'}}>Hardware mac addresses</td>
                                <td id="noOfDevs" style={{textAlign: 'right'}}>{formatNumber(this.state.noHardMacs, 0)}</td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: '0px'}}>Randomized mac addresses</td>
                                <td id="noOfSoftMacs" style={{textAlign: 'right'}}>{formatNumber(this.state.noSoftMacs, 0)}</td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: '0px'}}>Retention period</td>
                                <td style={{textAlign: 'right'}}>{this.props.retentionDays} days
                                </td>
                            </tr>
                            </tbody>
                        </table>

                    </div>
                    <br/>
                    {this.getDashboardTip.apply(this)}
                </div>
            </div>


        )
    }
};

export default connect(props)(DashboardCf);

