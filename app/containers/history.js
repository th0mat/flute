import React from 'react';
import {connect} from 'react-redux';

import Footer from '../components/footer';
import Header from '../components/header';

import HistoryCf from '../components/historyCf';


@connect((store) => {
    return {};
})
export default class History extends React.Component {


    componentWillMount() {
    }

    render() {

        return (
            <div className="flContainer">

                <Header/>
                <HistoryCf mac={this.props.params.mac}/>
                <Footer/>

            </div>
        )
    }
}




