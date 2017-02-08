import React from 'react';
import {connect} from 'react-redux';
import Footer from '../components/footer';
import Header from '../components/header';

import ProfilesCf from '../components/profilesCf';

@connect((store) => {
    return {};
})
export default class ProfilesPage extends React.Component {


    componentWillMount() {
    }

    render() {
        return (
            <div className="flContainer">

                <Header/>
                <ProfilesCf/>
                <Footer/>

            </div>
        )
    }
};



