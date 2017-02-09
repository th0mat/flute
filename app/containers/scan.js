import React from 'react';
import {connect} from 'react-redux';


import Footer from '../components/footer';
import Header from '../components/header';

import ScanCf from '../components/scanCf';


export default class ScanPage extends React.Component {


    componentWillMount() {
    }

    render() {
        return (
            <div className="flContainer">

                <Header/>
                <ScanCf/>
                <Footer/>

            </div>
        )
    }
};



