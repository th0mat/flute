import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {Intent, Popover, Position, Switch, Tooltip} from "@blueprintjs/core";

import titleCase from '../utils/titleCaseOui';
import saveAsCsv from '../utils/saveAsCsv';
import {moveTo} from '../utils/nav';
import tooltipButton from '../utils/tooltipButton';
import Mac from '../utils/mac';

import {remote} from 'electron';


const logger = remote.getGlobal('sharedObj').logger;


const props = (store) => {
    return {
        userDir: store.appState.userDir,
        rangeTraffic: store.appState.rangeTraffic,
    }
}

const PER_PAGE = 100;

class HistoriesCf extends Component {

    constructor(props) {
        super(props);
        const sqlite3 = require('sqlite3').verbose();
        this.db = new sqlite3.Database(this.props.userDir + 'papageno/papageno.db', sqlite3.OPEN_READONLY,
            (err) => {
                if (err) {
                    logger.error("*** error opening db from timeRangeResults: ", err);
                    alert("timeRangeResults: " + err.stack);
                }
            });
        this.db.configure("busyTimeout", 5000);
        this.formatString = "YYYY-MM-DD HH:mm";
        this.today = moment().hours(0).minutes(0).seconds(0).milliseconds(0);
        this.getResults = this.getResults.bind(this);
        this.clearResults = this.clearResults.bind(this);
        this.saveAs = this.saveAs.bind(this);

        this.state = {
            hogs: this.props.rangeTraffic.data || [],
            filtered: this.props.rangeTraffic.filtered || [],
            currentPage: this.props.rangeTraffic.page || 1,
            zeroHogsMsg: <tr>
                <td>select range then click play</td>
            </tr>,
            filter: {
                manu: this.props.rangeTraffic.filterManu || "",
                mac: this.props.rangeTraffic.filterMac || ""
            },
            range: {
                fromDt: this.props.rangeTraffic.fromDt || this.today.format(this.formatString),
                toDt: this.props.rangeTraffic.toDt || this.today.add(1, 'days').format(this.formatString)
            }
        };
    }


    componentWillUnmount() {
        this.db.close();
        this.dispatchTrafficRange();
    }


    getResults() {
        if (!moment(this.state.range.fromDt).isValid() || !moment(this.state.range.toDt).isValid()) {
            alert('date or time invalid');
            return;
        }
        let agg = [];
        const dbTimer = +new Date();
        this.db.all(
            `SELECT mac, SUM(bytes) as trafficVol FROM traffic WHERE 
            ts >= ${moment(this.state.range.fromDt).unix()} AND
            ts <= ${moment(this.state.range.toDt).unix()}
            GROUP BY mac ORDER BY trafficVol DESC`,
            function (err, rows) {
                if (err) {
                    logger.error("*** db error in histories/Cf: ", err);

                } else {
                    rows.forEach((x) => agg.push([x.mac, x.trafficVol]));
                }
                agg = agg.sort((x, y) => y[1] - x[1]);
                this.setState({hogs: agg});
                if (agg.length === 0) {
                    this.setState({
                        zeroHogsMsg: <tr>
                            <td>no traffic in this range</td>
                        </tr>
                    })
                }
                this.applyFilter();
                logger.info(`*** histories db read time: ${+new Date() - dbTimer} ms`);
                this.dispatchTrafficRange();
            }.bind(this));
    }

    clearResults() {
        this.setState({hogs: [], filtered: [], currentPage: 1});
        this.props.dispatch({
            type: "TRAFFIC_RANGE_DATA",
            payload: {fromDt: "", toDt: "", page: 1, data: [], filtered: [], filterManu: "", filterMac: ""}
        })
    }

    dispatchTrafficRange() {
        this.props.dispatch({
            type: "TRAFFIC_RANGE_DATA", payload: {
                fromDt: this.state.range.fromDt, toDt: this.state.range.toDt, data: this.state.hogs,
                filtered: this.state.filtered, filterManu: this.state.filter.manu, filterMac: this.state.filter.mac,
                page: this.state.currentPage
            }
        })
    }

    handleRangeChange(e) {
        let obj = {...this.state.range};
        obj[e.target.name] = e.target.value;
        this.setState({range: obj});
    }

    handleFilterChange(e) {
        let obj = {...this.state.filter};
        obj[e.target.name] = e.target.value;
        this.setState({filter: obj});
    }

    getWarning() {
        return "";
    }

    getParsed(str) {
        let dt = moment(str);
        if (dt.isValid()) return dt.format("YYYY-MM-DD HH:mm");
        return ' ...invalid...';
    }

    applyFilter() {
        let filtered = this.state.hogs;
        // apply filters
        if (this.state.filter.manu != "" || this.state.filter.mac != "") {
            filtered = this.state.hogs.filter((x) => {
                return (x[0].includes(this.state.filter.mac) &&
                (titleCase(new Mac(x[0]).manuf).includes(this.state.filter.manu)));
            })
        }
        this.setState({filtered: filtered, currentPage: 1});
        this.dispatchTrafficRange();
    }

    saveAs() {
        let content = "mac; bytes; name; manufacturer\n";
        let filtered = this.state.filtered;
        // create content string
        for (let m of filtered) {
            let mac = new Mac(m[0]);
            content += `${m[0]}; ${m[1]}; ${mac.dname}; ${titleCase(mac.manuf, 99)}\n`;
        }
        let ts = moment().format().substring(0, 16).replace(':', '');
        saveAsCsv(`history-data@${ts}.txt`, content);
    }

    pageNav() {
        const maxPage = Math.floor(this.state.filtered.length / PER_PAGE) + 1;
        if (this.state.filtered.length === 0) return;
        const menu = [
            ['first page', 'pt-icon-double-chevron-left', () => this.setState({currentPage: 1})],
            ['previous page', 'pt-icon-chevron-left', () => {
                if (this.state.currentPage === 1) return;
                this.setState({currentPage: this.state.currentPage - 1})
            }],
            ['next page', 'pt-icon-chevron-right', () => {
                if (this.state.currentPage === maxPage) return;
                this.setState({
                    currentPage: this.state.currentPage + 1
                })
            }],
            ['last page', 'pt-icon-double-chevron-right', () => this.setState({currentPage: maxPage})],
        ]
        return (
            <div>
                <div id="flPageNavStats">
                    {(this.state.currentPage - 1) * PER_PAGE +1}-
                    {this.state.currentPage * PER_PAGE > this.state.filtered.length ? this.state.filtered.length :
                        this.state.currentPage * PER_PAGE}
                    /{this.state.filtered.length}
                    {this.state.filtered.length !== this.state.hogs.length ? " [filtered]" : ""}
                </div>
                <div id="flPageNav">
                    {menu.map(x => {
                        return (
                            <Tooltip key={x[0]} position={Position.BOTTOM}
                                     hoverOpenDelay={1000}
                                     content={x[0]}><a id={`hm-${x[0]}`} className={`pt-button pt-minimal ${x[1]}`}
                                                       onClick={x[2]} role="button"></a>
                            </Tooltip>
                        )

                    })}


                </div>
            </div>)

    }

    render() {
        let hogs = this.state.filtered.slice(
            (this.state.currentPage - 1) * PER_PAGE, this.state.currentPage * PER_PAGE);


        return (


            <div className="flContentFrame">
                <div className="flContentFrozenTop">
                    <h3 id="title">Traffic History</h3>
                    <table>
                        <tbody>
                        <tr>
                            <td width="150px">from</td>
                            <td width="150px">to</td>
                            <td width="150px"></td>
                            <td width="60px"></td>
                        </tr>
                        <tr>
                            <td><input name="fromDt" value={this.state.range.fromDt} type="text"
                                       onChange={this.handleRangeChange.bind(this)}/></td>
                            <td><input name="toDt" value={this.state.range.toDt} type="text"
                                       onChange={this.handleRangeChange.bind(this)}/></td>
                            <td>
                                {tooltipButton("look up all macs in range", "pt-icon-play", this.getResults)}
                                &nbsp;&nbsp;
                                {tooltipButton("clear results", "pt-icon-eject", this.clearResults)}
                                &nbsp;&nbsp;
                                {tooltipButton("export data", "pt-icon-download", this.saveAs)}
                            </td>
                            <td>
                            </td>

                        </tr>
                        <tr style={{color: 'OliveDrab', fontSize: '80%', paddingTop: '0px'}}>
                            <td>&nbsp;{this.getParsed(this.state.range.fromDt)}</td>
                            <td>&nbsp;{this.getParsed(this.state.range.toDt)}</td>
                            <td></td>
                            <td></td>
                        </tr>

                        </tbody>
                    </table>
                </div>

                <div className="flContent">
                    {this.props.rangeTraffic.data.length == 0 ? <br/> : ""}
                    <table
                        className="pt-table pt-striped">
                        <thead>
                        <tr style={{display: this.props.rangeTraffic.data.length != 0 ? 'table-row' : 'none'}}>
                            <th style={{paddingTop: '15px'}}>Filter</th>
                            <th></th>
                            <th style={{paddingTop: '15px'}}><input name="mac" value={this.state.filter.mac}
                                                                    placeholder="mac address"
                                                                    onChange={this.handleFilterChange.bind(this)}
                                                                    type="text"/></th>
                            <th style={{paddingTop: '15px'}}><input name="manu" value={this.state.filter.manu}
                                                                    placeholder="manufacturer"
                                                                    onChange={this.handleFilterChange.bind(this)}
                                                                    type="text"/></th>
                            <th style={{textAlign: 'right'}}>
                                <button style={{marginTop: '0px'}} className="pt-button"
                                        onClick={this.applyFilter.bind(this)}>
                                    <small>apply</small>
                                </button>
                            </th>
                        </tr>
                        </thead>
                        < tbody >
                        {hogs.length == 0 ? this.state.zeroHogsMsg : hogs.map(x => {
                                const mac = new Mac(x[0]);
                                return (
                                    <tr className="flHoverBg" onClick={moveTo.bind(this, 'history', x[0])}
                                        key={x[0]}>
                                        <td><img className="flTablePix" src={this.props.userDir + mac.avatar} alt=""/>
                                        </td>
                                        <td><span>{mac.dname}</span></td>
                                        <td style={{fontFamily: "monospace"}}>{x[0]}</td>
                                        <td>{titleCase(mac.manuf, 22)}</td>
                                        <td style={{textAlign: 'right'}}>{x[1].toLocaleString()}</td>
                                    </tr>
                                )
                            })}
                        </tbody >
                    </table >
                    {this.pageNav()}
                </div>
            </div>
        );
    }
}


export default connect(props)(HistoriesCf);
