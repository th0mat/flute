import React from 'react';
import {connect} from 'react-redux';

import Footer from '../components/footer';
import Header from '../components/header';

import DashboardCf from '../components/dashboardCf';

@connect((store) => {
    return {};
})
export default class DashboardPage extends React.Component {

    componentWillMount() {
    }


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



