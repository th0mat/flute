import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';


import ConfigCfTable from './configCfTable';



export default class ConfigCf extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div className="flContentFrame">

                <div className="flContentFrozenTop">
                    <h3 id="title">System Settings</h3>
                </div>

                <div className="flContent">

                    <ConfigCfTable/>

                </div>
            </div>
        )
    }
};



