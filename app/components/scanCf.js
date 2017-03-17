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
import {store} from '../index';

const logger = remote.getGlobal('sharedObj').logger;

const props = (store) => {
    return {
        oui: store.appState.oui,
        scanTraffic: store.appState.scanTraffic,
        scanData: store.appState.scanData,
        liveSys: store.appState.userConfig.liveSys,
        userDir: store.appState.userDir,
        appDir: store.appState.appDir,
        monitorCp: store.appState.monitorCp

    }
}


function scan(data) {
    try {
        var justIn = JSON.parse(data);
        //todo: try to move getState outside
        store.dispatch({type: "SCAN_DATA", payload: addLastIn(store.getState().appState.scanData, justIn)});
    } catch (e) {
        logger.error("*** parsing error - data received: ", data.toString())
        logger.error("*** parsing error - error: ", e)
    }
}

function addLastIn(hogs, justIn) {
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

let term;


class ScanCf extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hogs: this.props.scanData,
            zeroHogsMsg: <tr>
                <td>click play to start scan</td>
            </tr>,
            scanOn: false
        };
        this.startScan = this.startScan.bind(this);
        this.resetScan = this.resetScan.bind(this);
        this.pauseScan = this.pauseScan.bind(this);
        this.saveAs = this.saveAs.bind(this);
        this.removeListener = this.removeListener.bind(this);
        this.radarGif = this.props.appDir + 'assets/img/radar.gif';
        this.emptyGif = this.props.appDir + 'assets/img/empty.gif';
    }


    componentWillUnmount() {
    };


    startScan() {
        if (!this.monitorCp) liveEvents.turnMonitorOn();
        term = liveEvents.ee;
        this.removeListener();
        term.on('data', scan);
        this.setState({scanOn: true});
    };


    removeListener(){
        if (term && term.listeners('data').includes(scan)) {
            term.removeListener('data', scan);
            this.setState({scanOn: false});
        }
    }

    pauseScan() {
        this.removeListener();
    };

    resetScan() {
        this.removeListener();
        this.props.dispatch({type: "SCAN_DATA", payload: new Map()});
    };


    saveAs() {
        let content = "mac; bytes; name; manufacturer\n";
        let targets = this.props.targets;
        for (let m of this.props.scanData) {
            var target = targets.find(t => t['macHex'] === m[0]);
            var dname = (target) ? target.dname : 'Unknown';
            content += `${m[0]}; ${m[1]}; ${dname}; ${titleCase(this.props.oui[m[0].substr(0, 6)], 99)}\n`;
        }
        let ts = moment().format().substring(0, 16).replace(':', '');
        saveAsCsv(`scan@${ts}.txt`, content);
    }

    render() {
        let hogs = Array.from(this.props.scanData);
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