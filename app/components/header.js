import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import { Intent, Popover, Position, Switch, Tooltip } from "@blueprintjs/core";


export function backOne() {
    browserHistory.go(-1);
}


export function moveTo(route, mac = null) {
    if (mac) {
        browserHistory.push('/' + route + '/' + mac);
    } else {
        browserHistory.push('/' + route);
    }
}



const menu = [
    ['dashboard', 'pt-icon-dashboard', 'dashboard'],
    ['monitor', 'pt-icon-people', 'monitor'],
    ['scan', 'pt-icon-search-around', 'scan'],
    ['history', 'pt-icon-history', 'history'],
    ['activity logs', 'pt-icon-sort', 'logs'],
    // ['tests', 'pt-icon-cloud', 'test'],
    ['help & about', 'pt-icon-help', 'about'],
    ['profiles', 'pt-icon-mugshot', 'profiles'],
    ['settings', 'pt-icon-settings', 'config'],
]



export default class Header extends React.Component {


    selected(id) {
        moveTo(id)
    }


    render() {
        return (
            <div className="flHeader">

                {menu.map(x=>{
                    return (
                        <Tooltip key={x[0]} position={Position.BOTTOM}
                                 hoverOpenDelay={1000}
                                 content={x[0]}><a className={`pt-button pt-minimal ${x[1]}`}
                                 onClick={this.selected.bind(this, x[2])}  role="button"></a>
                        </Tooltip>
                    )

            })}

                    {/*// <Tooltip position={Position.BOTTOM}*/}
                    {/*//          hoverOpenDelay={1000}*/}
                    {/*//          content="dashboard"><a className="pt-button pt-minimal pt-icon-dashboard"*/}
                    {/*//       onClick={this.selected.bind(this, "dashboard")}  role="button"></a>*/}
                    {/*// </Tooltip>*/}
                    {/*//*/}
                    {/*// <a className="pt-button pt-minimal pt-icon-people"*/}
                    {/*//       onClick={this.selected.bind(this, "monitor")} role="button"></a>*/}
                    {/*//*/}
                    {/*// <a className="pt-button pt-minimal pt-icon-search-around"*/}
                    {/*//       onClick={this.selected.bind(this, "scan")} role="button"></a>*/}
                    {/*//*/}
                    {/*// <a className="pt-button pt-minimal pt-icon-history"*/}
                    {/*//       onClick={this.selected.bind(this, "history")} role="button"></a>*/}
                    {/*//*/}
                    {/*// <a className="pt-button pt-minimal pt-icon-sort"*/}
                    {/*//       onClick={this.selected.bind(this, "logs")} role="button"></a>*/}
                    {/*//*/}
                    {/*// <a className="pt-button pt-minimal pt-icon-cloud"*/}
                    {/*//       onClick={this.selected.bind(this, "test")} role="button"></a>*/}
                    {/*//*/}
                    {/*// <a className="pt-button pt-minimal pt-icon-help"*/}
                    {/*//       onClick={this.selected.bind(this, "about")} role="button"></a>*/}
                    {/*//*/}
                    {/*// <a className="pt-button pt-minimal pt-icon-mugshot"*/}
                    {/*//       onClick={this.selected.bind(this, "profiles")} role="button"></a>*/}
                    {/*//*/}
                    {/*///!*<a className="pt-button pt-minimal pt-icon-settings"*!/*/}
                    {/*//      /!*onClick={this.selected.bind(this, "config")} role="button"></a>*!/*/}

            </div>
        )
    }

};


