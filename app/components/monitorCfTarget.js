import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import {moveTo} from '../utils/nav';
import MonitorCfTargetTraffic from './monitorCfTargetTraffic';

@connect((store) => {
    return {
        userDir: store.appState.userDir,
    }
})
export default class MonitorCfTarget extends React.Component {

    componentDidMount() {
    }

    render() {

        return (

            <div onClick={moveTo.bind(this, 'history', this.props.macHex)} className="flTarget flHoverBg">

                <div className="flTargetImg">
                    <img
                         src={this.props.userDir + this.props.avatar}
                         alt=""/>
                </div>


                <div className="flTargetStack">

                    <div className="flTargetName">
                        <strong> {this.props.dname} </strong>
                    </div>

                    <MonitorCfTargetTraffic traffic={this.props.traffic}></MonitorCfTargetTraffic>

                    <div className="flTargetLastSeen">
                        <span>
                            <small>
                                last seen: {this.props.lastSeen == undefined ?
                                'not yet' : moment(this.props.lastSeen).calendar()} </small>
                        </span>
                    </div>

                </div>

            </div>
        );
    }
}

