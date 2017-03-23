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
    ['tests', 'pt-icon-cloud', 'test'],
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
                                 content={x[0]}><a id={`hm-${x[0]}`} className={`pt-button pt-minimal ${x[1]}`}
                                 onClick={this.selected.bind(this, x[2])}  role="button"></a>
                        </Tooltip>
                    )

            })}


            </div>
        )
    }

};


