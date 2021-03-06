import {remote} from 'electron';


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
    scanData: new Map(),
    scanSort: "traffic",
    scanSecInterval: null,
    scanSecs: 0,
    activityLog: {lastLog: 0, activities: []},
    notifier: {notifierInterval: null}, // needed to turn it off
    notifyBySys: false,
    notifyByEmail: false,
    monitorData: [],
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
            // to enable onQuitStay control from main process
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

        case 'SCAN_DATA': {
            return {...state, scanData: action.payload}
        }

        case 'SCAN_SEC_INCR': {
            return {...state, scanSecs: state.scanSecs + 1}
        }

        case 'SCAN_SEC_RESET': {
            return {...state, scanSecs: 0}
        }

        case 'SCAN_SEC_INTERVAL': {
            return {...state, scanSecInterval: action.payload}
        }

        case 'SCAN_SORT': {
            return {...state, scanSort: action.payload}
        }

        case 'MONITOR_DATA': {
            return {...state, monitorData: action.payload}
        }

        default:
            return state;
    }
}
