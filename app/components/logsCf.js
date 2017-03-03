import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import saveAsCsv from '../utils/saveAsCsv';
import {updateActivityLog, sortAscending, sortDescending} from '../utils/updateActivityLog';
import {moveTo} from '../utils/nav';
import tooltipButton from '../utils/tooltipButton';


const props = (store) => {
    return {
        activityLog: store.appState.activityLog,
        userDir: store.appState.userDir,
    }
};


class LogsCf extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayFilter: "",
            includeSys: true
        };
        this.saveAs = this.saveAs.bind(this);
        this.handleDisplayFilter = this.handleDisplayFilter.bind(this);
        this.handleIncludeSys = this.handleIncludeSys.bind(this);
    }


    saveAs() {
        // filter as per display filter
        const includeSys = this.state.includeSys ? 'imposssible' : "SYS";
        const entries = this.logs
            .filter((x) => {
                return (x.dname.indexOf(includeSys) === -1)
            })
            .filter((x) => {
                return (x.dname.includes(this.state.displayFilter) || x.dname.includes("SYS"))
            });
        // build content string
        let content = "day; mac; name; inTime; outTime\n";
        for (let e of entries) {
            content += `${moment.unix(e.ts).format('MMM D')}; ${e.mac}; ${e.dname}; ${e.prez ? moment.unix(e.ts).format('HH:mm')
                : ""}; ${e.prez ? " " : moment.unix(e.ts).format('HH:mm')}\n`;
        }
        const ts = moment().format().substring(0, 16).replace(':', '');
        saveAsCsv(`logs@${ts}.txt`, content);
    }


    updateLog() {
        updateActivityLog();
    }

    handleDisplayFilter(e) {
        this.setState({displayFilter: e.target.value})
    }

    handleIncludeSys() {
        this.setState({includeSys: !this.state.includeSys})

    }

    render() {
        // this.logs = this.props.activityLog.activities.sort(sortAscending);
        this.logs = this.props.activityLog.activities.sort(sortDescending);
        // this.logs = this.props.activityLog.activities;

        const includeSys = this.state.includeSys ? 'imposssible' : "SYS";
        let k = 0;

        return (

            <div className="flContentFrame">
                <div className="flContentFrozenTop">
                    <h3>Activities Log</h3>

                    {tooltipButton("reload", "pt-icon-refresh", this.updateLog)}
                    &nbsp;&nbsp;

                    {tooltipButton("export data", "pt-icon-download", this.saveAs)}
                    &nbsp;&nbsp;

                    <span>Filter: </span>&nbsp;&nbsp;


                    <input type="text" value={this.state.displayFilter}
                           placeholder="name"
                           onChange={this.handleDisplayFilter}/>
                    &nbsp;&nbsp;


                    <label><input type="checkbox" onChange={this.handleIncludeSys}
                                  checked={this.state.includeSys}/>
                        &nbsp;&nbsp;incl sys msg
                    </label>
                    <br/><br/>


                </div>
                <div className="flContent">
                    <table className="pt-table pt-striped">
                        <thead>
                        <tr>
                            <th>Img</th>
                            <th>Day</th>
                            <th>Name</th>
                            <th>Mac</th>
                            <th>In</th>
                            <th>Out</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.logs
                            .filter((x) => {
                                return x.dname.indexOf(includeSys) === -1
                            })
                            .filter((x) => {
                                return (x.dname.includes(this.state.displayFilter) || x.dname.includes("SYS"))
                            })
                            .map(x => {
                                return (
                                    <tr onClick={moveTo.bind(this, 'history', x.mac)} key={x.ts + x.mac + x.prez}
                                        className="flHoverBg">
                                        <td><img className="flTablePix" src={this.props.userDir + x.avatar} alt=""/></td>
                                        <td>{moment.unix(x.ts).format('ddd, MMM D')}</td>
                                        <td>{x.dname}</td>
                                        <td style={{fontFamily: "monospace"}}>{
                                            x.mac !== '000000000000'
                                                ? x.mac
                                                : x.prez ? '+'.repeat(12) : '-'.repeat(12)}
                                        </td>
                                        <td>{x.prez ? moment.unix(x.ts).format('HH:mm') : ""}</td>
                                        <td>{x.prez ? " " : moment.unix(x.ts).format('HH:mm')}</td>
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


export default connect(props)(LogsCf);