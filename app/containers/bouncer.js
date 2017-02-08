import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import Footer from '../components/footer';
import Header from '../components/header';


// props to be passed in: 'destination' and 'loadTime' in millisecs
@connect((store) => {
    return {
        //userDir: store.appState.userDir,
        appDir: store.appState.appDir,
        userConfig: store.appState.userConfig
    };
})
export default class BouncerPage extends React.Component {

    constructor(props) {
        super(props);
        setTimeout(() => {
            browserHistory.push("/" + this.props.params.destination)
        }, this.props.params.duration);
    }

    render() {
        return (
            <div className="flContainer">

                <Header/>

                <div className="flContentFrame">

                    <div className="flContent" style={{height: '100%', backgroundRepeat: 'no-repeat',
                                backgroundImage: 'url(' + this.props.appDir + '/assets/img/Papageno.jpeg)',
                                backgroundSize: '200px 200px', backgroundPosition: 'center'}}>
                    </div>

                </div>

                <Footer/>

            </div>
        )
    }
};



