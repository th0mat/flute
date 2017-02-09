import React from 'react';

import Footer from '../components/footer';
import Header from '../components/header';

import TestCf from '../components/testCf';


export default class TestPage extends React.Component {


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
