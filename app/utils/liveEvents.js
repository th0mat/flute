import child_process from 'child_process';
import events from 'events';
import {remote} from 'electron';
import getWifiDevice from './getWifiDevice'
import {store} from '../index';

const logger = remote.getGlobal('sharedObj').logger;
const config = remote.getGlobal('sharedObj').sysConfig;
const userDir = remote.getGlobal('sharedObj').userDir;

let cp,
    ee = new events.EventEmitter();

setTimeout(turnLiveMonitorOn, 2000);


//todo: change cwd to avoid creation of new papageno.db
export function turnLiveMonitorOn() {
    if (cp) return;
    //todo: use sysConfig
    cp = child_process.spawn('sh',
        ['-c', `${userDir}papageno/${config.liveSys} ${getWifiDevice()} json`], {});
    store.dispatch({type: "SET_MONITOR_CP", payload: cp});
    logger.info("*** live monitor turned on, pid: ", cp.pid)
}

export function turnLiveMonitorOff() {
    if (cp) {
        let pid = cp.pid;
        cp.kill();
        cp = null;
        store.dispatch({type: "SET_MONITOR_CP", payload: null});
        logger.info("*** killed live monitor pid: ", pid)
    }
}


setInterval(x => {
    if (!cp) return;
    let raw = cp.stdout.read();
    if (raw) (
        parseAndEmit(new Buffer(raw).toString())
    )
}, 1000)


function parseAndEmit(raw) {
    let arr = raw.match(/{.*?}/g);
    // let arr = raw.split('\n');
    arr.forEach(x => {
        ee.emit('data', x);
    })
    if (arr.length > 1) logger.info(`*** split data into ${arr.length} events`)
}


export {ee};

