import React from 'react';
import {connect} from 'react-redux';

import HistoryCfHeader from "./historyCfHeader";
import HistoryCfHours from "./historyCfHours";


export default class HistoryCf extends React.Component {


    componentWillMount() {
    }

    render() {

        return (
            <div className="flContentFrame">

                <div className="flContentFrozenTop">
                    <HistoryCfHeader mac={this.props.mac}/>

                </div>

                <div className="flContent">
                    <HistoryCfHours mac={this.props.mac}/>
                </div>

            </div>
        )
    }
}




