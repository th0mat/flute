import React from 'react';
import {connect} from 'react-redux';
import titleCase from '../utils/titleCaseOui';
import {moveTo, backOne} from '../utils/nav';
import Mac from '../utils/mac';
import tooltipButton from '../utils/tooltipButton';

import HistoryCfLegend from './historyCfLegend';

const SYSUP_MAC = "000000000000";

const props = (store) => {
    return {
        userConfig: store.appState.userConfig,
        userDir: store.appState.userDir
    };
}

class HistoryCfHeader extends React.Component {

    constructor(props) {
        super(props);
        this.mac = new Mac(this.props.mac);
    }

    componentDidMount() {
    }


    goProfileHandler(route, mac) {
        moveTo(route, mac, 'history')
    }

    // target() {
    //     if (this.props.mac === SYSUP_MAC) return this.props.userConfig.sysUp;
    //     return this.props.targets.find((x) => x.macHex === this.props.mac) || this.props.userConfig.incognito;
    // }


    render() {
        // const found = this.target();
        const sub = (this.props.mac === SYSUP_MAC)
            ? 'System uptime data'
            : 'Mac address: ' + this.props.mac;
        return (
            <div>
                <img onClick={backOne} src={this.props.userDir + this.mac.avatar}
                     className='flProfilePix'/>
                <div id="flProfileInfo">
                    <h3 style={{display: "inline", bottom: '20px'}}>{this.mac.dname}&nbsp;&nbsp;</h3>
                    {this.props.mac !== SYSUP_MAC
                        ? tooltipButton("profile settings", "flMini pt-icon-cog", "/profile/" + this.props.mac)
                        : ""}
                    <br/>
                    <p>{sub}</p>
                    <p>
                        <small>{this.props.mac !== SYSUP_MAC
                            ? titleCase(this.mac.manuf)
                            : <br/>}</small>
                    </p>

                </div>
                <br/>
                <div>
                    <h4>
                        {this.props.mac !== SYSUP_MAC
                            ? "Traffic history"
                            : <span>Logging system history</span>}
                    </h4>
                    {this.props.mac === SYSUP_MAC
                        ? <HistoryCfLegend sysUp={true}/>
                        : <HistoryCfLegend sysUp={false}/> }
                </div>

            </div>
        )
    }

}
;

export default connect(props)(HistoryCfHeader);