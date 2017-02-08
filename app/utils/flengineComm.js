import axios from 'axios';
import {remote} from 'electron';

const logger = remote.getGlobal('sharedObj').logger;
const flengineUrl = remote.getGlobal('sharedObj').sysConfig.flengine;
const defaultConfig = {
    headers: {'Content-Type': 'application/json'}
};


// export function postJson(api, load, config = defaultConfig) {
//     let uri = flengineUrl + api;
//
//
//     axios.post(uri, load, config)
//         .then((response) => {
//             logger.info(`*** flengine ${api} response:`, response.status);
//         })
//         .catch((error) => {
//             logger.error(`*** failed communication content for ${api}: `, error.config.data);
//             if (error.response) {
//                 // The request was made, but the server responded with a status code
//                 // that falls out of the range of 2xx
//                 logger.error(`*** flengine ${api} error, response data:`, error.response.data);
//                 logger.error(`*** flengine ${api} error, response status:`, error.response.status);
//                 logger.error(`*** flengine ${api} error, response headers:`, error.response.headers);
//             } else {
//                 // Something happened in setting up the request that triggered an Error
//                 logger.error(`*** error sending request to flengine  ${api}:`, error.message);
//             }
//         });
// }



export function postJsonPromise(api, load, config = defaultConfig) {
    return new Promise((resolve, reject)=>{
        let uri = flengineUrl + api;

        axios.post(uri, load, config)
            .then((response) => {
                logger.info(`*** flengine response from ${api}:`, response.status);
                resolve(response.data)
            })
            .catch((error) => {
                logger.error(`*** failed communication content for ${api}:`, error.config.data);
                if (error.response) {
                    // The request was made, but the server responded with a status code
                    // that falls out of the range of 2xx
                    logger.error(`*** flengine ${api} error, response data:`, error.response.data);
                    logger.error(`*** flengine ${api} error, response status:`, error.response.status);
                    //logger.error(`*** flengine ${api} error, response headers:`, error.response.headers);
                    reject(error.response.headers);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    logger.error(`*** error sending request to flengine ${api}:`, error.message);
                    reject(error.message);
                }
            });
    })
}



