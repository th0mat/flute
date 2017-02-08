import React from 'react';
import {connect} from 'react-redux';

import Footer from '../components/footer';
import Header from '../components/header';

import TestCf from '../components/testCf';

@connect((store) => {
    return {};
})
export default class TestPage extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="flContainer">

                <Header/>
                <TestCf/>
                <Footer/>

            </div>
        )
    }
};
