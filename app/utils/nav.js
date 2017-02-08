import React, {Component} from 'react';
import {browserHistory} from 'react-router';

export function moveTo(route, mac = null) {
    if (mac) {
        browserHistory.push('/' + route + '/' + mac);
    } else {
        browserHistory.push('/' + route);
    }
}

export function backOne() {
    browserHistory.go(-1);
}

