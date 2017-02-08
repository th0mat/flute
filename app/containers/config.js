import React from 'react';
import {connect} from 'react-redux';
import Footer from '../components/footer';
import Header from '../components/header';

import ConfigCf from '../components/configCf';

@connect((store) => {
    return {};
})
export default class ConfigPage extends React.Component {


    componentWillMount() {
    }


    render() {
        return (
            <div className="flContainer">

                <Header/>
                <ConfigCf/>
                <Footer/>

            </div>
        )
    }
};



