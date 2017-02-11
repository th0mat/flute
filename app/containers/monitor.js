import React from 'react';
import {connect} from 'react-redux';

import Footer from '../components/footer';
import Header from '../components/header';

import MonitorCf from '../components/monitorCf';



export default class MonitorPage extends React.Component {

    componentWillMount() {
    }


    render() {
        return (
            <div className="flContainer" style={{minWidth: "250px"}}>

                <Header/>
                <MonitorCf/>
                <Footer/>

            </div>
        )
    }
};



