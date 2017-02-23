import child_process from 'child_process';
import {store} from '../index';
import {remote} from 'electron';
import getWifiDevice from './getWifiDevice';


const logger = remote.getGlobal('sharedObj').logger;


// returns the pid if log_iruka is running and 0 if not running
export function getLogSysPid() {
    try {
        const pid = child_process.execSync(`pgrep pap_log`);
        const pidString = pid.toString("utf-8").trim();
        return parseInt(pidString);
    } catch (e) {
        return 0;
    }
}

export function turnLogSysOn() {
    const config = remote.getGlobal('sharedObj').sysConfig;
    const userDir = store.getState().appState.userDir;

    let check = getLogSysPid();
    if (check) {
        logger.info("*** log sys is already running"); // runnning already
        store.dispatch({type: "SET_LOG_SYS_STATUS", payload: true});
        return;
    }
    try {
        child_process.spawn(userDir + "papageno/" + config.logSys, [getWifiDevice()], {
            stdio: 'ignore',
            detached: true,
            cwd: userDir + "papageno/"
        }).unref();
        let pid = getLogSysPid();
        if (pid) {
            logger.info('*** logSys started with pid ' + getLogSysPid());
            store.dispatch({type: "SET_LOG_SYS_STATUS", payload: true});
        } else {
            logger.error("*** problem turning on " + config.logSys);
        }
    } catch (e) {
        logger.error('*** problem turning on ' + config.logSys + " err msg: " + e);
        store.dispatch({type: "SET_LOG_SYS_STATUS", payload: false});
    }
}


export function turnLogSysOff() {
    let pid = getLogSysPid();
    if (!pid) {
        logger.info("*** log system was not running");
        store.dispatch({type: "SET_LOG_SYS_STATUS", payload: false});
        return;
    }
    try {
        child_process.exec("kill " + pid);
        logger.info("*** killed pid: ", pid)
        store.dispatch({type: "SET_LOG_SYS_STATUS", payload: false});
    } catch (e) {
        logger.error("problem turning off log system, err msg: " + e)
    }
}