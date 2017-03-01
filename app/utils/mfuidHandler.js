import fs from 'fs';
import {postJsonPromise} from './flengineComm';
import {remote} from 'electron';
import {internetAvailable} from './connectionHandling';
import {store} from '../index';
import * as actions from '../actions/appState';

const userDir = remote.getGlobal('sharedObj').userDir;
const logger = remote.getGlobal('sharedObj').logger;

export async function mfuidFileHandler() {

    let mfuid;
    if (fs.existsSync(userDir + '.mfuid')) {
        mfuid = fs.readFileSync(userDir + '.mfuid', 'utf8')
    } else {
        mfuid = process.env.USER + '-' + +new Date();
        mfuid = new Buffer(mfuid).toString('base64');
        try {
            fs.writeFileSync(userDir + '.mfuid', mfuid, 'utf8');
        } catch (e) {
            logger.error(`*** writing of ${userDir + '.mfuid'} failed`);
            remote.getGlobal('sharedObj').mfuid =
                new Buffer('tmp-' + process.env.USER).toString('base64');
            return; // leave mfuidRegistered at null -> registration will not be triggered
        }
        logger.warn("*** new installation - mfuid created");
        let userConfig = JSON.parse(JSON.stringify(store.getState().appState.userConfig));
        userConfig.mfuidRegistered = false;
        store.dispatch(actions.saveUserConfig(userConfig));
    }
    remote.getGlobal('sharedObj').mfuid = mfuid;
}


export async function registerMfuid() {
    if (!await internetAvailable()) return;
    let mfuid = remote.getGlobal('sharedObj').mfuid;
    postJsonPromise('/mfapi/mfuidreg', {mfuid: mfuid})
        .then(x => {
            let userConfig = JSON.parse(JSON.stringify(store.getState().appState.userConfig));
            userConfig.mfuidRegistered = true;
            store.dispatch(actions.saveUserConfig(userConfig));
            logger.info("*** mfuid registration successful")
        })
        .catch(err => {
            logger.error("*** mfuid registration attempt failed");

        });
}
