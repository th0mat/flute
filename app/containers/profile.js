import React from 'react';
import {connect} from 'react-redux';

import Footer from '../components/footer';
import Header from '../components/header';

import ProfileCf from "../components/profileCf";

@connect((store) => {
    return {
        tsec: store.appState.targets
    };
})
export default class Profile extends React.Component {


    componentWillMount() {
    }

    render() {

        return (

            <div className="flContainer">

                <Header/>
                <ProfileCf mac={this.props.params.mac}/>
                <Footer/>

            </div>
        )
    }
}


