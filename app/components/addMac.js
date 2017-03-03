import React from 'react';
import {browserHistory} from 'react-router';
import Toaster from '../utils/toaster';
import {Intent} from '@blueprintjs/core';


// via props get destination, buttonName, invalidMsg
export default class AddMac extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTarget: ''
        }
    }

    buttonAction() {
        if (this.state.searchTarget === "") {
            Toaster.show({intent: Intent.WARNING, message: "enter a valid mac address"});
            return;
        }
        browserHistory.push(this.props.destination + this.strip(this.state.searchTarget))
    }



    handleChange(event) {
        this.setState({searchTarget: event.target.value});
    }


    strip(mac){
        const small = mac.toLowerCase();
        const arr = small.split("");
        const filtered = arr.filter((x)=>{
            return (x >= 'a' && x <= 'f') || (x >= 0 && x <= 9 );
        });
        return filtered.join('');
    }


    validateMac(mac) {
        if (~mac.search(/[^a-f0-9A-F\.:-]/)) return false;
        if (mac==="") return true;
        return this.strip(mac).length === 12;
    }


    getWarning() {
        if (this.validateMac(this.state.searchTarget)) {
            return (<button className="pt-button" onClick=
                {this.buttonAction.bind(this)}>
                {this.props.buttonName}</button>)
        } else {
            return (
                <span>
                    {/*<Button bsStyle="default" bsSize="small">search</Button> &nbsp;&nbsp;*/}
                    <span style={{color: 'orange'}}>{this.props.invalidMsg}</span>
                </span>
            )
        }

    }


    render() {

        return (
            <span>
                <input name="targetMac" value={this.state.searchTarget}
                       type="text"
                       placeholder="mac address"
                       onChange={this.handleChange.bind(this)}/>&nbsp;&nbsp;
                {this.getWarning()}
            </span>
        )
    }
};



