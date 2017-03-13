
import {remote} from 'electron';
import {store} from '../index';



const incognito = remote.getGlobal('sharedObj').sysConfig.incognito;
const random = remote.getGlobal('sharedObj').sysConfig.random;
const sysUp = remote.getGlobal('sharedObj').sysConfig.sysUp;
const resInc = {dname: incognito.dname, avatar: incognito.avatar};
const resRand = {dname: random.dname, avatar: random.avatar};
const randStr = '2367abef';

let oui, targets;

let loaded = false;

//
export function reload(){
    oui = store.getState().appState.oui;
    targets = store.getState().appState.targets;
    targets.push(sysUp);
    loaded = true;
}


export default class Mac {
    constructor(mac) {
        this.mac = mac;
        // this.targets = store.getState().appState.targets;
        // this.targets.push(sysUp);
        if (!loaded) reload();
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
        if (randStr.includes(this.mac[1])) {
            return 'Randomized mac';
        }
        return '';
    }



}