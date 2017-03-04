// to allow testing this function will return a set
// time when global.sharedObj.test == true

import {remote} from 'electron';
import moment from 'moment';

const test = remote.getGlobal('sharedObj').test;
const logger = remote.getGlobal('sharedObj').logger;

export default function currentMoment(){
    if (test) {
        logger.info("*** trim() used test date");
        return moment.unix(1488191460 + 10);


    } // last ts from db
    return moment();
}