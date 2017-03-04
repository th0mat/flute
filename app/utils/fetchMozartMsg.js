import {store} from '../index';
import {remote} from 'electron';
import postJson from './postJson';
import {internetAvailable} from './connectionHandling'
const logger = remote.getGlobal('sharedObj').logger;

let wait = 60000;
let maxTries = 8;
let tries = 0;

export async function fetchMozartMsg() {

    if (await internetAvailable()) {
        let load = {
            version: remote.getGlobal('sharedObj').sysConfig.version,
            mfuid: remote.getGlobal('sharedObj').mfuid
        };

        logger.info(`*** fetching MozartMsg`);
        postJson('/mfapi/fetchMsg', load)
            .then(msg => {
                store.dispatch({type: 'UPDATE_MOZART_MSG', payload: msg});
                logger.info("*** mozartMsg: ", JSON.stringify(msg));
            })
            .catch(err => {
                logger.error(`*** try ${++tries} of ${maxTries} to fetchMozartMsg failed`);
                logger.error(`*** fetchMozartMsg error: ${err}`);
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