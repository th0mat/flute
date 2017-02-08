import React from 'react';
import {connect} from 'react-redux';
import Footer from '../components/footer';
import Header from '../components/header';

import HistoriesCf from '../components/historiesCf';


@connect((store) => {
    return {};
})
export default class HistoriesPage extends React.Component {

    constructor(props) {
        super(props);
    }


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



