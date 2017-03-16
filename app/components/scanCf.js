import React, {Component} from 'react';
import {connect} from 'react-redux';
import titleCase from '../utils/titleCaseOui';
import saveAsCsv from '../utils/saveAsCsv';
import {moveTo} from '../utils/nav';
import moment from 'moment';
import tooltipButton from '../utils/tooltipButton';
import {remote} from 'electron';
import Mac from '../utils/mac';
import * as liveEvents from '../utils/liveEvents';

const logger = remote.getGlobal('sharedObj').logger;

const props = (store) => {
    return {
        oui: store.appState.oui,
        scanTraffic: store.appState.scanTraffic,
        liveSys: store.appState.userConfig.liveSys,
        userDir: store.appState.userDir,
        appDir: store.appState.appDir,
        monitorCp: store.appState.monitorCp

    }
}



class ScanCf extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hogs: this.props.scanTraffic.data,
            zeroHogsMsg: <tr>
                <td>click play to start scan</td>
            </tr>,
            scanOn: false
        };
        this.startScan = this.startScan.bind(this);
        this.resetScan = this.resetScan.bind(this);
        this.pauseScan = this.pauseScan.bind(this);
        this.saveAs = this.saveAs.bind(this);
        this.scan = this.scan.bind(this);
        this.removeListener = this.removeListener.bind(this);
        this.radarGif = this.props.appDir + 'assets/img/radar.gif';
        this.emptyGif = this.props.appDir + 'assets/img/empty.gif';
    }


    componentWillUnmount() {
        this.removeListener();
        this.updateTrafficScanData();

    };


    scan(data) {
        try {
            var justIn = JSON.parse(data);
            this.setState({hogs: this.addLastIn(this.state.hogs, justIn)});
        } catch (e) {
            logger.error("*** parsing error - data received: ", data.toString())
        }
    }

    startScan() {
        if (!this.monitorCp) liveEvents.turnMonitorOn();
        this.term = liveEvents.ee;
        this.removeListener();
        this.term.on('data', this.scan);
        this.setState({scanOn: true});
    };

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

    removeListener(){
        if (this.term && this.term.listeners('data').includes(this.scan)) {
            this.term.removeListener('data', this.scan);
            this.setState({scanOn: false});
        }
    }

    pauseScan() {
        this.removeListener();
        this.updateTrafficScanData();
    };

    resetScan() {
        this.removeListener();
        this.setState({hogs: new Map()});
        this.updateTrafficScanData();
    };


    saveAs() {
        let content = "mac; bytes; name; manufacturer\n";
        let targets = this.props.targets;
        for (let m of this.state.hogs) {
            var target = targets.find(t => t['macHex'] === m[0]);
            var dname = (target) ? target.dname : 'Unknown';
            content += `${m[0]}; ${m[1]}; ${dname}; ${titleCase(this.props.oui[m[0].substr(0, 6)], 99)}\n`;
        }
        let ts = moment().format().substring(0, 16).replace(':', '');
        saveAsCsv(`scan@${ts}.txt`, content);
    }

    render() {
        let hogs = Array.from(this.state.hogs);
        const targets = this.props.targets;
        hogs = hogs.sort((x, y) => y[1] - x[1]);
        const radar =
            <div className="flRadarDiv">
                <img className="flRadarGif" src={this.state.scanOn ? this.radarGif : this.emptyGif} alt=""/>
            </div>

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
                    {radar}
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
                        {hogs.length == 0 ? this.state.zeroHogsMsg : hogs.map(x => {

                                const mac = new Mac(x[0])
                                return (
                                    <tr onClick={moveTo.bind(this, 'history', x[0])} key={x[0]} className="flHoverBg">
                                        <td><img className="flTablePix" src={this.props.userDir + mac.avatar} alt=""/></td>
                                        <td><span>{mac.dname}</span></td>
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