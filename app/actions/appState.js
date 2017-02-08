import {readFilePromise, writeFilePromise} from '../utils/promisify';
import fs from 'fs';
import {store} from '../index';
import {remote} from 'electron';

const logger = remote.getGlobal('sharedObj').logger;


export function loadUserConfig() {
    const configPath = store.getState().appState.userDir + 'userConfig.json';
    return function (dispatch) {
        readFilePromise(configPath)
            .then((data) => {
            return dispatch({
                    type: "USER_CONFIG_LOADED", payload: JSON.parse(data)
                });
            })
            .catch((err) => {
                logger.error('*** loading of config file failed: ', err);
            })
    }
}


export function saveUserConfig(configObj) {
    const configPath = store.getState().appState.userDir + 'userConfig.json';
    return function (dispatch) {
        writeFilePromise(configPath, configObj)
            .then((data)=>dispatch(
                {type: "USER_CONFIG_LOADED", payload: configObj}
            ))
            .catch((err) => {
                logger.error('*** saving of config file failed: ', err);
            })
    }
}


export function loadTargets() {
    return function (dispatch) {
        const targetsPath = store.getState().appState.userDir + 'targets.json'
        readFilePromise(targetsPath)
            .then((data)=>dispatch({
                type: "TARGETS_LOADED", payload: JSON.parse(data)
            })).catch((err) => {
            logger.error('*** loading of targets failed: ', err);
        })
    }
}

export function loadOui() {
    return function (dispatch) {
        const ouiPath = store.getState().appState.appDir + '/config/oui.json';
        readFilePromise(ouiPath).then((data)=>dispatch(
            {type: "OUI_LOADED", payload: JSON.parse(data)}
        )).catch((err) => {
            logger.error('*** loading of oui failed: ', err);
        })
    }
}

export function postTargetChanges(targets) {
    const targetsPath = store.getState().appState.userDir + 'targets.json';
    return function (dispatch) {
        writeFilePromise(targetsPath, targets).then((data)=>dispatch(
            {type: "TARGETS_LOADED", payload: targets}
        )).catch((err) => {
            logger.error('*** updating of targets failed: ', err);
        })
    }
}

export function uploadProfileImage(file, index, targets) {
    const userDir = store.getState().appState.userDir;
    return function (dispatch) {
        const imgPath = userDir + 'img/' + file.name;
        try {
            fs.writeFileSync(imgPath, fs.readFileSync(file.path));
            dispatch({type: "PROFILE_IMG_SAVED"});
            targets[index].avatar = 'img/' + file.name;
            dispatch(postTargetChanges(targets))
        } catch (e) {
            logger.error('*** upload of profile img failed: ', e);
        }
    }
}


export function loadImgBank() {
    return function (dispatch) {
        const imgBankDir = store.getState().appState.userDir + 'img';
        fs.readdir(imgBankDir, (err, result)=> {
            if (err) {
                logger.error('*** loading img bank failed: ' + err);
                return;
            }
            dispatch({type: 'IMG_BANK_LOADED', payload: result});

        });
    }
}


