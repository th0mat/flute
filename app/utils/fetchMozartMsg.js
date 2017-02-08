import {store} from '../index';
import {remote} from 'electron';
import {postJsonPromise} from './flengineComm';
import {internetAvailable} from './connectionHandling'
const logger = remote.getGlobal('sharedObj').logger;

let wait = 60000;
let maxTries = 10;
let tries = 0;

export async function fetchMozartMsg() {

    if (await internetAvailable()) {
        let load = {
            version: remote.getGlobal('sharedObj').sysConfig.version,
            mfuid: remote.getGlobal('sharedObj').mfuid
        };

        logger.info(`*** fetching MozartMsg`);
        postJsonPromise('/mfapi/fetchMsg', load)
            .then(msg => {
                store.dispatch({type: 'UPDATE_MOZART_MSG', payload: msg});
            })
            .catch(err => {
                logger.error(`*** try ${++tries} of ${maxTries} fetchMozartMsg failed`);
                if (tries < maxTries) {
                    setTimeout(fetchMozartMsg, wait);
                    wait *= 3; // 1 min, 3, 9, 27, 71 ...,
                }
            });
    } else {
        logger.info("*** failed at fetchMozartMsg, no internet; will retry");
        setTimeout(fetchMozartMsg, 1000 * 60 * 5);
    }

}