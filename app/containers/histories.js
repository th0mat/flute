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
            <div className="flContainer" style={{minWidth: "470px"}}>

                <Header/>
                <HistoriesCf/>
                <Footer/>

            </div>
        )
    }
};



