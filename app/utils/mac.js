import {remote} from 'electron';
import {store} from '../index';



const incognito = remote.getGlobal('sharedObj').sysConfig.incognito;
const random = remote.getGlobal('sharedObj').sysConfig.random;
const sysUp = remote.getGlobal('sharedObj').sysConfig.sysUp;

const resInc = {dname: incognito.dname, avatar: incognito.avatar};
const resRand = {dname: random.dname, avatar: random.avatar};

const randStr = '2367abef';

let targets, oui;
let loaded = false;



// loading in constructor is too slow
// when targets are changed, a reload needs to happen
// via targets action
export function reloadTargets(){
    oui = store.getState().appState.oui;
    targets = [...store.getState().appState.targets];
    targets.push(sysUp);
    loaded = true;
}



export default class Mac {
    constructor(mac) {
        this.mac = mac;
        if (!loaded) reloadTargets();
    }

    get dname(){
        let target = targets.find(t => t['macHex'] === this.mac);
        if (target) return target.dname;
        if (randStr.includes(this.mac[1])) {
            return resRand.dname;
        }
        return resInc.dname;
    }

    get avatar(){
        let target = targets.find(t => t['macHex'] === this.mac);
        if (target) return target.avatar;
        if (randStr.includes(this.mac[1])) {
            return resRand.avatar;
        }
        return resInc.avatar;
    }

    get manuf(){
        const m = oui[this.mac.substr(0, 6)];
        if (m) return m;
        if (this.mac.substr(0,6) === 'daa119'){
            return 'Randomized Android'
        }
        // 92:68:C3 would be Motorola - not significant enough at this time
        if (randStr.includes(this.mac[1])) {
            return 'Randomized mac';
        }
        return '';
    }
}