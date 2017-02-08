import React from 'react';
import {browserHistory} from 'react-router';

// via props get destination, buttonName, invalidMsg
export default class AddMac extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTarget: 'abcdef123456'
        }
    }

    buttonAction() {
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
                    <span style={{color: 'red'}}>{this.props.invalidMsg}</span>
                </span>
            )
        }

    }


    render() {

        return (
            <span>
                <input name="targetMac" value={this.state.searchTarget} type="text"
                       onChange={this.handleChange.bind(this)}/>&nbsp;&nbsp;
                {this.getWarning()}
            </span>
        )
    }
};



