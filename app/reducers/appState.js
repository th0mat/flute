import {remote} from 'electron';

//let globalUserConfig = remote.getGlobal('sharedObj').userConfig;


const initial = {
    appDir: remote.getGlobal('sharedObj').appDir,
    userDir: remote.getGlobal('sharedObj').userDir,
    userConfig: remote.getGlobal('sharedObj').userConfig,
    logSysUp: false,
    monitorCp: null,
    internetOn: null,
    targets: [],
    imageBank: [],
    oui: {},
    rangeTraffic: {fromDt: "", toDt: "", data: [], filterManu: "", filterMac: "", page: 1},
    scanTraffic: {data: new Map(), filterManu: "", filterMac: "", scanOn: false},
    activityLog: {lastLog: 0, activities: []},
    notifier: {notifierId: null}, // needed to turn it off
    notifyBySys: false,
    notifyByEmail: false,
    pendingMail: [],
    mozartMsg: null // {dashboardTip: null}
};


export default function appState(state = initial, action) {
    switch (action.type) {

        case 'SET_LOG_SYS_STATUS':
            return {...state, logSysUp: action.payload};

        case 'UPDATE_INTERNET_STATUS':
            return {...state, internetOn: action.payload};

        case 'UPDATE_MOZART_MSG':
            return {...state, mozartMsg: action.payload};

        case 'PROFILE_IMG_SAVED':
            return state;

        case 'TARGETS_LOADED':
            return {...state, targets: action.payload};

        case 'USER_CONFIG_LOADED': {
            remote.getGlobal('sharedObj').userConfig = action.payload;
            return {...state, userConfig: action.payload};
        }

        case 'SET_NOTIFIER_SYS':
            return {...state, notifyBySys: action.payload};

        case 'SET_NOTIFIER_EMAIL':
            return {...state, notifyByEmail: action.payload};

        case 'ACTIVITY_LOG_LOADED': {
            return {...state, activityLog: action.payload};
        }

        case "IMG_BANK_LOADED": {
            return {...state, imageBank: action.payload};
        }

        case "TRAFFIC_RANGE_DATA": {
            return {...state, rangeTraffic: action.payload};
        }

        case "TRAFFIC_SCAN_DATA": {
            return {...state, scanTraffic: action.payload};
        }

        case 'OUI_LOADED': {
            return {...state, oui: action.payload};
        }

        case 'ADD_NOTIFIER': {
            return {...state, notifier: action.payload};
        }

        case 'SET_MONITOR_CP': {
            return {...state, monitorCp: action.payload}
        }

        case 'UPDATE_PENDING_MAIL': {
            return {...state, pendingMail: action.payload};
        }

        default:
            return state;
    }
}
