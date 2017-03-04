import React from 'react';
import {connect} from 'react-redux';
import {remote} from 'electron';
import {browserHistory} from 'react-router';


const test = remote.getGlobal('sharedObj').test;


export default class Footer extends React.Component {

    constructor(props) {
        super(props);
    }




    render() {
        return (
            <div className={test ? "flFooter flTestFooter" : "flFooter"}>
                <span>
                    i'm a tiny footer
                </span>
            </div>
        )
    }

};


