import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {shell} from 'electron';
import AddMac from './addMac';
import * as actions from '../actions/appState';


@connect((store) => {
    return {
        targets: store.appState.targets,
        appDir: store.appState.appDir,
        userDir: store.appState.userDir
    };
})
export default class ProfileSelect extends React.Component {

    constructor(props) {
        super(props);
    }


    arrowClick(mac, direction) {
        // get targets
        const targets = this.props.targets;
        // find target
        const target = targets.find((x) => {
            return x.macHex === mac
        });
        // update sortOrder
        target.sortOrder += direction;
        // sort by sortOrder
        const sorted = targets.sort((x, y) => {
            return x.sortOrder - y.sortOrder
        });
        // update sortOrder field to index
        const updated = sorted.map((x, i) => {
            x.sortOrder = i;
            return x;
        });
        // dispatch targets
        this.props.dispatch(actions.postTargetChanges(updated));
    }

    noTargetsMsg() {
        return <div style={{paddingRight: '10px'}}><br/><h4>No profiles to display yet</h4><p>Learn how to add,
        change or remove profiles:</p>
            <p style={{cursor: 'pointer', color: 'blue'}}
               onClick={()=>shell.openExternal("https://packetmozart.com/how-to-videos/")}>
                how-to videos</p>
            <br/><br/>
            <img src={this.props.appDir + '/app/assets/img/noteBirds.png'}
                 style={{height: '50px', width: '50px', margin: 'auto', display: 'block'}} alt=""/>
        </div>
    }

    render() {
        const targets = this.props.targets;
        const check = <span style={{color: "grey"}} className="pt-icon pt-icon-small-tick"></span>;

        return (
            <div className="flContentFrame">

                <div className="flContentFrozenTop">
                    <h3>Edit Profiles</h3>
                    <p>Profiles make it easier to recognize known devices. They are required for life
                            monitoring and only registered profiles appear in logs.
                    </p>

                    <div>
                        <AddMac buttonName='add device' destination="/profile/" invalidMsg="invalid mac address"/>
                        <br/>
                    </div>

                </div>


                <div className="flContent">

                    {targets.length !== 0 ? <table className="pt-table pt-striped">
                            <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Mac</th>
                                <th><span className="pt-icon pt-icon-people"></span></th>
                                <th><span className="pt-icon pt-icon-sort"></span></th>
                                <th><span className="pt-icon pt-icon-notifications"></span></th>
                                <th>Sort</th>
                            </tr>
                            </thead>
                            <tbody>
                            {targets.map(x => {
                                return (
                                    <tr className="flHoverBg" key={x.macHex}>

                                        <td>< img
                                            className="flProfilesPix"
                                            src={
                                                  this.props.userDir + x.avatar
                                              }
                                            alt={x.dname}
                                            onClick={()=>browserHistory.push('/profile/' + x.macHex)}
                                        />

                                        </td>
                                        <td onClick={()=>browserHistory.push('/profile/' + x.macHex)}>{x.dname}</td>
                                        <td onClick={()=>browserHistory.push('/profile/' + x.macHex)}
                                            style={{fontFamily: "monospace"}}>{x.macHex}</td>
                                        <td onClick={()=>browserHistory.push('/profile/' + x.macHex)}>{x.onMonitor ? check : ""}</td>
                                        <td onClick={()=>browserHistory.push('/profile/' + x.macHex)}>{x.onLogs ? check : ""}</td>
                                        <td onClick={()=>browserHistory.push('/profile/' + x.macHex)}>{(x.notifyGone || x.notifyBack) ? check : ""}</td>
                                        <td style={{color: "blue"}}><span
                                            className="pt-icon pt-icon-arrow-up flSortArrow"
                                            onClick={this.arrowClick.bind(this, x.macHex, -1.5)}></span>
                                            &nbsp;
                                            <span className="pt-icon pt-icon-arrow-down flSortArrow"
                                                  onClick={this.arrowClick.bind(this, x.macHex, +1.5)}></span></td>

                                    </tr>
                                )
                            })}
                            </tbody>
                        </table> : this.noTargetsMsg()}
                </div>
            </div>
        )
    }

};


