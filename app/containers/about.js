import React from 'react';
import {connect} from 'react-redux';
import Footer from '../components/footer';
import Header from '../components/header';

import AboutCf from '../components/aboutCf';

@connect((store) => {
    return {};
})
export default class AboutPage extends React.Component {


    componentWillMount() {
    }


    render() {
        return (
            <div className="flContainer">

                <Header/>
                <AboutCf/>
                <Footer/>

            </div>
        )
    }
};



