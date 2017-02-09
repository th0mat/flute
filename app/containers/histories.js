import React from 'react';
import {connect} from 'react-redux';
import Footer from '../components/footer';
import Header from '../components/header';

import HistoriesCf from '../components/historiesCf';



export default class HistoriesPage extends React.Component {


    componentWillMount() {
    }


    render() {
        return (
            <div className="flContainer">

                <Header/>
                <HistoriesCf/>
                <Footer/>

            </div>
        )
    }
};



