import child_process from 'child_process';
import events from 'events';
import {remote} from 'electron';
import getWifiDevice from './getWifiDevice'
import {store} from '../index';
import {initialMonitorStartup} from '../components/monitorCf';

const logger = remote.getGlobal('sharedObj').logger;
const config = remote.getGlobal('sharedObj').sysConfig;
const userDir = remote.getGlobal('sharedObj').userDir;

let cp,
    ee = new events.EventEmitter();

setTimeout(turnLiveMonitorOn, 2000);


//todo: change cwd to avoid creation of new papageno.db
export function turnLiveMonitorOn() {
    if (cp) {
        logger.info("*** live monitor already running");
        return;
    }
    //todo: use sysConfig
    cp = child_process.spawn('sh',
        ['-c', `${userDir}papageno/${config.liveSys} ${getWifiDevice()} json`], {
            cwd: `${userDir}papageno`  // to ensure no new db file is created
        });
    store.dispatch({type: "SET_MONITOR_CP", payload: cp});
    logger.info("*** live monitor turned on, pid:", cp.pid)
    initialMonitorStartup(); // to ensure that all live monitor blips are reset
}

export function turnLiveMonitorOff() {
    if (cp) {
        let pid = cp.pid;
        cp.kill();
        cp = null;
        store.dispatch({type: "SET_MONITOR_CP", payload: null});
        logger.info("*** killed live monitor, pid:", pid)
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
    if (arr.length > 1) logger.warn(`*** split stdout data into ${arr.length} objects`)
}


export {ee};

