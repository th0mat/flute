import React, {Component} from 'react';
import {connect} from 'react-redux';
import pty from 'pty.js';
import titleCase from '../utils/titleCaseOui';
import saveAsCsv from '../utils/saveAsCsv';
import {moveTo} from '../utils/nav';
import moment from 'moment';
import tooltipButton from '../utils/tooltipButton';
import getWifiDevice from '../utils/getWifiDevice';
import {remote} from 'electron';

const logger = remote.getGlobal('sharedObj').logger;

const props = (store)=> {
    return {
        targets: store.appState.targets,
        oui: store.appState.oui,
        scanTraffic: store.appState.scanTraffic,
        liveSys: store.appState.userConfig.liveSys,
        userDir: store.appState.userDir,
        incognito: store.appState.userConfig.incognito

    }
}

class ScanCf extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hogs: this.props.scanTraffic.data,
            zeroHogsMsg: <tr><td>click play to start scan</td></tr>,
            scanOn: this.props.scanTraffic.scanOn
        };
        this.turnOnScanning = this.turnOnScanning.bind(this);
        this.startScan = this.startScan.bind(this);
        this.resetScan = this.resetScan.bind(this);
        this.pauseScan = this.pauseScan.bind(this);
        this.saveAs = this.saveAs.bind(this);
    }



    componentWillUnmount() {
        if (this.term) this.term.destroy();
        this.updateTrafficScanData();

    };


  turnOnScanning() {
        this.term = pty.spawn('sh', ['-c', `cd ${this.props.userDir}/papageno; ./pap_live ${getWifiDevice()} json`], {
            name: 'xterm-color', cols: 80, rows: 30, cwd: process.env.HOME, env: process.env
        });
        var that = this;
        this.term.on('data', function (data) {
            try {
                var justIn = JSON.parse(data);
                that.setState({hogs: that.addLastIn(that.state.hogs, justIn)});
            } catch (e) {
                logger.error("*** parsing error - data received: ", data.toString())
            }
        });
    }

    addLastIn(hogs, justIn) {
        hogs = new Map(hogs);  //clone hogs to maintain immutability
        for (var x in justIn) {
            if (justIn.hasOwnProperty(x)) {
                if (hogs.has(x)) {
                    hogs.set(x, hogs.get(x) + parseInt(justIn[x]));
                }
                else {
                    hogs.set(x, parseInt(justIn[x]))
                }
            }
        }
        return hogs;
    }


    updateTrafficScanData() {
        let scanObj = {...this.props.scanTraffic};
        scanObj.data = this.state.hogs;
        scanObj.scanOn = this.state.scanOn;
        this.props.dispatch({type: "TRAFFIC_SCAN_DATA", payload: scanObj});
    }

    startScan() {
        if (this.term) this.term.destroy();
        this.turnOnScanning();
        this.setState({scanOn: true});
    };

    pauseScan() {
        if (this.term) this.term.destroy();
        this.setState({scanOn: false});
        this.updateTrafficScanData();
    };

    resetScan() {
        if (this.term) this.term.destroy();
        this.setState({scanOn: false, hogs: new Map()});
        this.updateTrafficScanData();
    };


    saveAs() {
        let content = "mac; bytes; name; manufacturer\n";
        let targets = this.props.targets;
        for (let m of this.state.hogs) {
            var target = targets.find(t=>t['macHex'] === m[0]);
            var dname = (target) ? target.dname : 'Unknown';
            content += `${m[0]}; ${m[1]}; ${dname}; ${titleCase(this.props.oui[m[0].substr(0, 6)], 99)}\n`;
        }
        let ts = moment().format().substring(0, 16).replace(':', '');
        saveAsCsv(`scan@${ts}.txt`, content);
    }

    render() {
        var hogs = Array.from(this.state.hogs);
        var targets = this.props.targets;
        hogs = hogs.sort((x, y)=>y[1] - x[1]);

        return (

            <div className="flContentFrame">

                <div className="flContentFrozenTop">
                    <h3>Scan for all devices</h3>
                    <span>Number of devices detected: {this.state.hogs.size}</span>
                    <br/><br/>
                    &nbsp;&nbsp;
                    {tooltipButton("start scan", "pt-icon-play", this.startScan)}
                    &nbsp;&nbsp;
                    {tooltipButton("pause scan", "pt-icon-pause", this.pauseScan)}
                    &nbsp;&nbsp;
                    {tooltipButton("reset scan", "pt-icon-eject", this.resetScan)}
                    &nbsp;&nbsp;
                    {tooltipButton("export scan result", "pt-icon-download", this.saveAs)}
                </div>
                <div className="flContent">
                    {this.state.hogs.size == 0 ? <br/> : ""}
                    <table className="pt-table pt-striped">
                        <thead>
                        <tr style={{display: this.state.hogs.size != 0 ? 'table-row' : 'none'}}>
                            <th>Img</th>
                            <th>Name</th>
                            <th>Mac</th>
                            <th>Manufacturer</th>
                            <th>Bytes</th>
                        </tr>
                        </thead>
                        <tbody>
                        {hogs.length == 0 ? this.state.zeroHogsMsg : hogs.map(x=> {
                            var target = targets.find(t=>t['macHex'] === x[0]);
                            var dname = (target) ? target.dname : this.props.incognito.dname;
                            var avatar = (target) ? target.avatar : this.props.incognito.avatar;
                            return (
                                <tr onClick={moveTo.bind(this, 'history', x[0])} key={x[0]} className="flHoverBg">
                                    <td><img className="flTablePix" src={this.props.userDir + avatar} alt=""/></td>
                                    <td><span>{dname}</span></td>
                                    <td style={{fontFamily: "monospace"}}>{x[0]}</td>
                                    <td>{titleCase(this.props.oui[x[0].substr(0, 6)])}</td>
                                    <td style={{textAlign: 'right'}}>{x[1].toLocaleString()}</td>
                                </tr>
                            )
                        })}
                        </tbody>

                    </table>
                </div>

            </div>

        );
    }
}

export default connect(props)(ScanCf);