import React from 'react';
import {connect} from 'react-redux';

import Footer from '../components/footer';
import Header from '../components/header';

import DashboardCf from '../components/dashboardCf';


export default class DashboardPage extends React.Component {


    render() {
        return (
            <div className="flContainer">

                <Header/>
                <DashboardCf/>
                <Footer/>

            </div>
        )
    }
};



