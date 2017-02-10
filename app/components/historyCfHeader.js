import React from 'react';
import {connect} from 'react-redux';
import titleCase from '../utils/titleCaseOui';
import {moveTo, backOne} from '../utils/nav';
import tooltipButton from '../utils/tooltipButton';

import HistoryCfLegend from './historyCfLegend';

const props = (store) => {
    return {
        targets: store.appState.targets,
        oui: store.appState.oui,
        userConfig: store.appState.userConfig,
        userDir: store.appState.userDir
    };
}

class HistoryCfHeader extends React.Component {

    componentDidMount() {
    }


    goProfileHandler(route, mac) {
        moveTo(route, mac, 'history')
    }

    target() {
        return this.props.targets.find((x)=>x.macHex === this.props.mac) || this.props.userConfig.incognito;
    }


    render() {
        const found = this.target();
        const sub = (this.props.mac === '000000000000')
            ? 'System uptime data'
            : 'Mac address: ' + this.props.mac;
        return (
            <div>
                <img onClick={backOne} src={this.props.userDir + found.avatar}
                     className='flProfilePix'/>
                <div id="flProfileInfo">
                    <h3 style={{display: "inline", bottom: '20px'}}>{found.dname}&nbsp;&nbsp;</h3>
                    {tooltipButton("profile settings", "pt-icon-cog", this.goProfileHandler.bind(this, "profile", this.props.mac))}
                    <br/><br/>
                    <p>{sub}</p>
                    <p>
                        <small>{titleCase(this.props.oui[this.props.mac.substr(0, 6)])}</small>
                    </p>

                </div>
                <br/>
                <div>
                    <h4>Traffic history</h4>
                    <HistoryCfLegend/>
                </div>

            </div>
        )
    }

};

export default connect(props)(HistoryCfHeader);