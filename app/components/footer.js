import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';




export default class Footer extends React.Component {

    constructor(props) {
        super(props);
    }




    render() {
        return (
            <div className="flFooter">
                <span>
                    i'm a tiny footer
                </span>
            </div>
        )
    }

};


