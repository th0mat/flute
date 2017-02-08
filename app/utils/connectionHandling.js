import {exec} from 'child_process';
import dns from 'dns';
import moment from 'moment';
import {remote} from 'electron';
import {store} from '../index';
import {sendPendingMail} from './sendMail';
import {fetchMozartMsg} from './fetchMozartMsg';
import {registerMfuid} from './mfuidHandler';

const logger = remote.getGlobal('sharedObj').logger;
const appDir = remote.getGlobal('sharedObj').appDir;

const airport = '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport';

export function updateInternetStatus() {

    dns.lookup('google.com', (e, r) => {
        let oldStatus = store.getState().appState.internetOn;
        if (e) {
            if (e.code != "ENOTFOUND") {
                logger.warn("*** internet gone with unusual error code: ", e)
            }
            if (oldStatus === true || oldStatus === null) {
                store.dispatch({type: "UPDATE_INTERNET_STATUS", payload: false});
                logger.warn("*** no internet connection");
                new Notification(`Internet connection lost`, {
                    body: `no connection available from ${moment().format("HH:mm")}`,
                    icon: appDir + '/app/assets/img/Wifi.jpg'
                });
            }
        }
        else {
            if (oldStatus === false || oldStatus === null) {
                logger.info("*** internet available");
                if (oldStatus !== null) { // no notification at startup
                    new Notification(`Internet connection back`, {
                        body: `connection back at ${moment().format("HH:mm")}`,
                        icon: appDir + '/app/assets/img/Wifi.jpg'
                    });
                    sendPendingMail();
                    if (store.getState().appState.mozartMsg == null) fetchMozartMsg();
                    if (store.getState().appState.userConfig.mfuidRegistered == false) registerMfuid();
                }
                store.dispatch({type: "UPDATE_INTERNET_STATUS", payload: true});
            }
        }
    });
}


export function internetAvailable() {
    return new Promise((resolve, reject) => {
        dns.lookup('google.com', (e, r) => {
            if (e) {
                if (store.getState().appState.internetOn != false) {
                    store.dispatch({type: "UPDATE_INTERNET_STATUS", payload: false});
                    logger.warn("*** no internet connection");
                }
                resolve(false);
            } else {
                resolve(true);
            }
        })
    })
}


// example usage of internetAvailable
export async function testInternet() {
    if (await internetAvailable()) {
        logger.debug("^^^^ YEP, available");
    } else {
        logger.debug("^^^ NOPE, not avialble");
    }
}

