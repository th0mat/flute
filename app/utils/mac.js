
import {remote} from 'electron';
import {store} from '../index';



const incognito = remote.getGlobal('sharedObj').sysConfig.incognito;
const random = remote.getGlobal('sharedObj').sysConfig.random;
const resInc = {dname: incognito.dname, avatar: incognito.avatar};
const resRand = {dname: random.dname, avatar: random.avatar};
const randStr = '2367abef';




export default class Mac {
    constructor(mac) {
        this.mac = mac;
        this.targets = store.getState().appState.targets;
        this.oui = store.getState().appState.oui;
    }

    get dname(){
        let target = this.targets.find(t => t['macHex'] === this.mac);
        if (target) return target.dname;
        if (randStr.includes(this.mac[1])) {
            return resRand.dname;
        }
        return resInc.dname;
    }

    get avatar(){
        let target = this.targets.find(t => t['macHex'] === this.mac);
        if (target) return target.avatar;
        if (randStr.includes(this.mac[1])) {
            return resRand.avatar;
        }
        return resInc.avatar;
    }

    get manuf(){
        const oui = this.oui[this.mac.substr(0, 6)];
        if (oui) return oui;
        if (this.mac.substr(0,6) === 'daa119'){
            return 'Randomized Android'
        }
        if (randStr.includes(this.mac[1])) {
            return 'Randomized mac';
        }
        return '';
    }



}