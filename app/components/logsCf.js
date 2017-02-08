import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import saveAsCsv from '../utils/saveAsCsv';
import {updateActivityLog, sortAscending} from '../utils/updateActivityLog';
import {moveTo} from '../utils/nav';


const props = (store)=> {
    return {
        activityLog: store.appState.activityLog,
        targets: store.appState.targets,
        userDir: store.appState.userDir

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


    componentWillMount() {
    }


    componentDidMount() {
    }


    componentWillUnmount() {
    };


    updateDimensions() {
    }


    saveAs() {
        // filter as per display filter
        const includeSys = this.state.includeSys ? 'imposssible' : "SYS";
        const entries = this.logs
            .filter((x)=> {
                return (x.dname.indexOf(includeSys) === -1)
            })
            .filter((x)=> {
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
        this.logs = this.props.activityLog.activities.sort(sortAscending);

        const includeSys = this.state.includeSys ? 'imposssible' : "SYS";
        let k = 0;

        return (

            <div className="flContentFrame">
                <div className="flContentFrozenTop">
                    <h3>Activities Log</h3>

                    <a className="pt-button pt-icon-download" onClick={this.saveAs}></a>
                    &nbsp;&nbsp;


                    <a className="pt-button pt-icon-refresh" onClick={this.updateLog}></a>
                    &nbsp;&nbsp;


                    <span>Filter: </span>&nbsp;&nbsp;


                    <input type="text" value={this.state.displayFilter} onChange={this.handleDisplayFilter}/>
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
                            <th>Day</th>
                            <th>Name</th>
                            <th>Mac</th>
                            <th>In</th>
                            <th>Out</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.logs
                            .filter((x)=> {
                                return x.dname.indexOf(includeSys) === -1
                            })
                            .filter((x)=> {
                                return (x.dname.includes(this.state.displayFilter) || x.dname.includes("SYS"))
                            })
                            .map(x=> {
                                return (
                                    <tr onClick={moveTo.bind(this, 'history', x.mac)} key={x.ts + x.mac + x.prez}
                                    className="flHoverBg">
                                        <td>{moment.unix(x.ts).format('MMM D')}</td>
                                        <td>{x.dname}</td>
                                        <td  style={{fontFamily: "monospace"}}>{x.mac}</td>
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