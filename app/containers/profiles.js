import React from 'react';
import Footer from '../components/footer';
import Header from '../components/header';

import ProfilesCf from '../components/profilesCf';


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



