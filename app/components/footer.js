import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';



@connect((store) => {
    return {
        userConfig: store.appState.defaultConfig,
        logSysUp: store.appState.logSysUp
    };
})
export default class Footer extends React.Component {

    constructor(props) {
        super(props);
    }




    render() {
        return (
            <div className="flFooter">
                <span>
                    i'm a useless tiny footer
                </span>
            </div>
        )
    }

};


