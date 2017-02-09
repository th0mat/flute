import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {remote} from 'electron';
import {sendMail} from '../utils/sendMail'
const logger = remote.getGlobal('sharedObj').logger;

import { ContextMenu, MenuFactory, MenuItemFactory } from "@blueprintjs/core";




const props = (store) => {
    return {
        userConfig: store.appState.defaultConfig,
        logSysUp: store.appState.logSysUp
    };
};


class TestCf extends React.Component {

    constructor() {
        super();
        this.state = {isContextMenuOpen: false}
    }

    goToPage(page) {
        browserHistory.push(page);
    }


    reloadTest() {
        logger.debug("*** process: ", process.env.HOME)

    }

    sendMailTest(){
        sendMail("MF testmail", "this comes from clicking the test button on the test page of MF");
    }

    render() {
        return (
            <div className="flContentFrame">
                <div className="flContentFrozenTop" onContextMenu={(e)=>{
                    logger.debug("*** oncontextmenu event: ", e.target);
                    e.preventDefault();
                    //ContextMenu.show(menu, { left: e.clientX, top: e.clientY}, ()=>{} );
                    this.setState({isContextMenuOpen: true});
                }}>
                    <h3 name="blabla">Testing</h3>
                </div>

                <div className="flContent">

                    <p>nothing for now</p>
                    <button className="pt-button" onClick={this.goToPage.bind(this, '/dashboard')}>go to dashboard</button>
                    <br/><br/>
                    <button className="pt-button" onClick={this.reloadTest.bind(this)}>Show process</button>
                    <button className="pt-button" onClick={this.sendMailTest.bind(this)}>Send test mail</button>
                    <br/><br/>
                    <p>bla bla bla</p>
                    <p>bla bla bla</p>
                    <p>bla bla bla</p>
                    <p>bla bla bla</p>
                    <p>bla bla bla</p>

                </div>
            </div>
        )
    }

};


export default connect(props)(TestCf);