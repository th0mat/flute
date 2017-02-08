import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
const remote = require('electron').remote;

import Footer from '../components/footer';
import Header from '../components/header';


@connect((store) => {
    return {
        // userDir: store.appState.userDir,
        // appDir: store.appState.appDir,
    };
})
export default class LoaderPage extends React.Component {

    constructor(props) {
        super(props);
        setTimeout(() => {
            browserHistory.push('/dashboard')
        }, 3000);
    }

    render() {
        return (
            <div className="flContainer">

                <Header/>

                <div className="flContentFrame">

                    <div className="flContent" style={{height: '100%', backgroundRepeat: 'no-repeat',
                                backgroundImage: 'url(' + remote.getGlobal('sharedObj').appDir + '/assets/img/Papageno.jpeg)',
                                backgroundSize: '200px 200px', backgroundPosition: 'center'}}>
                    </div>

                </div>

                <Footer/>

            </div>
        )
    }
};



