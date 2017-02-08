import React from 'react';
import {connect} from 'react-redux';

import Footer from '../components/footer';
import Header from '../components/header';

import LogsCf from '../components/logsCf';


@connect((store) => {
    return {};
})
export default class LogsPage extends React.Component {


    componentWillMount() {
    }

    render() {
        return (
            <div className="flContainer">

                <Header/>
                <LogsCf/>
                <Footer/>

            </div>
        )
    }
};



