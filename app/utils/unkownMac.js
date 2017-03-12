
import {remote} from 'electron';

const incognito = remote.getGlobal('sharedObj').sysConfig.incognito;
const random = remote.getGlobal('sharedObj').sysConfig.random;
const resInc = {dname: incognito.dname, avatar: incognito.avatar};
const resRand = {dname: random.dname, avatar: random.avatar};
const resErr = {dname: "invalide mac", avatar: incognito.avatar};
const randStr = '2367abef';




// takes mac as argument and returns object with dname and avatar
// to allow a different dname and avatar in case of randomized mac addresses
// expected mac format: abcdef123456

export default function unknownMac(mac){
    if (randStr.includes(mac[1])){
        return resRand;
    }
    return resInc
}





