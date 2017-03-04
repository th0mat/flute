import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import {remote} from 'electron';
import {Switch, Button}  from '@blueprintjs/core'

import * as logSys from '../utils/logSysOnOff'
import * as actions from '../actions/appState';
import trimDb from '../utils/trimDb';
import validateEmail from '../utils/validateEmail';


const logger = remote.getGlobal('sharedObj').logger;

const props = (store) => {
    return {
        userDir: store.appState.userDir,
        userConfig: store.appState.userConfig,
        logSysUp: store.appState.logSysUp,
        retentionDays: store.appState.userConfig.retentionDays

    };
};


class ConfigCfTable extends React.Component {

    constructor(props) {
        super(props);
        const sqlite3 = require('sqlite3').verbose();
        this.db = new sqlite3.Database(this.props.userDir + 'papageno/papageno.db', (err) => {
            if (err) {
                logger.error("*** error opening db from config: ", err);
                alert("config: " + err.stack);
            }
        });
        this.state = {};
        this.trimDb = trimDb.bind(this, 0);
        this.handleEmailAddrChange = this.handleEmailAddrChange.bind(this);
    }

    resetDb() {
        this.trimDb(); // bound in constructor
        browserHistory.push('/dashboard');
    }


    handleUserConfigChange(e) {
        const config = this.props.userConfig;
        config[e.target.value] = !config[e.target.value];
        this.props.dispatch(actions.saveUserConfig({...config}));
    }

    handleRetentionDayChange(e) {
        const config = this.props.userConfig;
        config['retentionDays'] = e.target.value;
        this.props.dispatch(actions.saveUserConfig({...config}));
    }

    handleEmailAddrChange(e) {
        const config = this.props.userConfig;
        config['notificationEmailAddress'] = e.target.value;
        this.props.dispatch(actions.saveUserConfig({...config}));
    }

    componentWillMount() {
    }

    turnLogSysOn() {
        logSys.turnLogSysOn();
    }

    turnLogSysOff() {
        logSys.turnLogSysOff();
    }

    temporaryOff() {
        logSys.turnLogSysOff();
        setTimeout(() => {
            this.turnLogSysOn();
        }, 60000);
    }


    render() {
        return (
            <div>
                <table className="pt-table pt-striped">
                    <tbody>


                    <tr>
                        <td>MagicFlute start-up behaviour</td>
                        <td>
                            <input type="checkbox" value="autoOnPapageno"
                                          onChange={this.handleUserConfigChange.bind(this)}
                                          checked={this.props.userConfig.autoOnPapageno}/>
                        </td>
                        <td>turn traffic logging system on at application start (if not already running)</td>

                    </tr>

                    <tr>
                        <td>MagicFlute quit behaviour</td>
                        <td>
                            <input type="checkbox" value="onQuitStay"
                                          onChange={this.handleUserConfigChange.bind(this)}
                                          checked={this.props.userConfig.onQuitStay}/>
                        </td>
                        <td>keep traffic logging system on after application 'quit' [recommended]</td>
                    </tr>

                    <tr>
                        <td>System notifications</td>
                        <td>
                            <input type="checkbox" value="autoOnSysNotifications"
                                          onChange={this.handleUserConfigChange.bind(this)}
                                          checked={this.props.userConfig.autoOnSysNotifications}/>
                        </td>
                        <td>turn system notifications on at application start</td>
                    </tr>

                    <tr>
                        <td>No internet connection notifications</td>
                        <td>
                            <input type="checkbox" value="noInternetNotifications"
                                          onChange={this.handleUserConfigChange.bind(this)}
                                          checked={this.props.userConfig.noInternetNotifications}/>

                        </td>
                        <td>show system notification when the connection is lost or returned</td>
                    </tr>

                    <tr>
                        <td>Email notifications</td>
                        <td>
                            <input type="checkbox" value="autoOnEmailNotifications"
                                          onChange={this.handleUserConfigChange.bind(this)}
                                          checked={this.props.userConfig.autoOnEmailNotifications}/>
                        </td>
                        <td>turn email notifications on at application start</td>
                    </tr>

                    <tr>
                        <td>Email address for notifications</td>
                        <td></td>
                        <td>
                            <input type="text" value={this.props.userConfig.notificationEmailAddress}
                                          onChange={this.handleEmailAddrChange}/>

                            {(!validateEmail(this.props.userConfig.notificationEmailAddress) &&
                            this.props.userConfig.notificationEmailAddress !== "") ?
                                <span style={{color: "orange"}}><small>&nbsp;&nbsp;invalid</small></span> : ""}
                        </td>
                    </tr>

                    <tr>
                        <td>Traffic data retention period</td>
                        <td>

                                    <select value={this.props.userConfig.retentionDays} onChange={this.handleRetentionDayChange.bind(this)}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                    </select>

                        </td>
                        <td>days</td>
                    </tr>


                    <tr>
                        <td>Turn logging on/off</td>
                        <td><a className="pt-button flMini pt-icon-dashboard" role="button"
                               onClick={browserHistory.push.bind(this, '/dashboard')}/>
                        </td>
                        <td>click to go to dashboard</td>
                    </tr>

                    <tr>
                        <td>Clear database</td>
                        <td>
                            <a className="pt-button flMini pt-icon-offline" role="button" onClick={this.resetDb.bind(this)}/>
                        </td>
                        <td>click to erase all data</td>
                    </tr>

                    </tbody>

                </table>
            </div>
        )
    }

};


export default connect(props)(ConfigCfTable);