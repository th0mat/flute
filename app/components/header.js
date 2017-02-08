import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';



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




@connect((store) => {
    return {
    };
})
export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }


    selected(id) {
        moveTo(id)
    }


    render() {
        return (
            <div className="flHeader">

                    <a className="pt-button pt-minimal pt-icon-dashboard"
                          onClick={this.selected.bind(this, "dashboard")}  role="button"></a>

                    <a className="pt-button pt-minimal pt-icon-people"
                          onClick={this.selected.bind(this, "monitor")} role="button"></a>

                    <a className="pt-button pt-minimal pt-icon-search-around"
                          onClick={this.selected.bind(this, "scan")} role="button"></a>

                    <a className="pt-button pt-minimal pt-icon-history"
                          onClick={this.selected.bind(this, "history")} role="button"></a>

                    <a className="pt-button pt-minimal pt-icon-sort"
                          onClick={this.selected.bind(this, "logs")} role="button"></a>

                    <a className="pt-button pt-minimal pt-icon-cloud"
                          onClick={this.selected.bind(this, "test")} role="button"></a>

                    <a className="pt-button pt-minimal pt-icon-help"
                          onClick={this.selected.bind(this, "about")} role="button"></a>

                    <a className="pt-button pt-minimal pt-icon-mugshot"
                          onClick={this.selected.bind(this, "profiles")} role="button"></a>

                    <a className="pt-button pt-minimal pt-icon-settings"
                          onClick={this.selected.bind(this, "config")} role="button"></a>

            </div>
        )
    }

};


