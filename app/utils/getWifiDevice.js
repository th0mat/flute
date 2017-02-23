import child_process from 'child_process';
import {remote} from 'electron';

const logger = remote.getGlobal('sharedObj').logger;
const sysConfig = remote.getGlobal('sharedObj').sysConfig;


let device;


export default function getWifiDevice() {
    return device || getDev();
}


function getDev() {
    if (device = sysConfig.manualWifiDeviceOverride) {  // null if not set
        logger.warn("*** manual wifi device override with", device);
        return device;
    }
    const raw = child_process.execSync("networksetup -listallhardwareports", {encoding: "utf-8"});
    const arr = raw.split('\n');
    let index;
    if ((index = arr.indexOf("Hardware Port: Wi-Fi")) == -1) {
        logger.warn("*** wifi device not found, will try en0");
        return device = "en0";
    }
    device = arr[index + 1].substr(8);
    logger.info("*** wifi device used:", device);
    return device;
}
