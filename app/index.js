import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import configureStore from './store/configureStore';
import {syncHistoryWithStore} from 'react-router-redux';
import {ipcRenderer} from 'electron';
import * as _ from 'lodash';
import './magicFlute.global.css';

import LoaderPage from './containers/loader';
import BouncerPage from './containers/bouncer';
import DashboardPage from './containers/dashboard';
import ScanPage from './containers/scan';
import LogsPage from './containers/logs';
import AboutPage from './containers/about';
import MonitorPage from './containers/monitor';
import HistoryPage from './containers/history';
import ProfilePage from './containers/profile';
import ProfilesPage from './containers/profiles';
import TimeRangePage from './containers/histories';
import ConfigPage from './containers/config';
import TestPage from './containers/test'

import {updateActivityLog} from './utils/updateActivityLog';
import Notifier from './utils/notifier';
import {updateInternetStatus} from './utils/connectionHandling';
import * as actions from './actions/appState';
import * as logSys from './utils/logSysOnOff';
import trimDb from './utils/trimDb';
import {fetchMozartMsg} from './utils/fetchMozartMsg';
import {mfuidFileHandler, registerMfuid} from './utils/mfuidHandler';
import {FocusStyleManager} from "@blueprintjs/core";

FocusStyleManager.onlyShowFocusOnTabs();

const remote = require('electron').remote;
const win = remote.getCurrentWindow();
const logger = remote.getGlobal('sharedObj').logger;


export const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store); // history could be used to listen to nav changes



// process.on('uncaughtException', (e) => {
//      logger.error("*** uncaught renderer process exception: ", e);
//      // todo: should this always lead to exit?
//  })


process.on('warning', (w) => {
    logger.warn(`*** process warning: ${w.name} - ${w.message}`);
})

process.on('unhandledRejection', (reason, p) => {
    logger.error("*** unhandled renderer process rejection at: Promise:", p, "reason:", reason);
});


// rss - resident set size: code segment + stack + heap
setInterval(() => {
    let m = process.memoryUsage();
    logger.info(`*** renderer memory usage - rss: ${m.rss}, heapUsed: ${m.heapUsed}`)
}, 1000 * 3600)

// store.dispatch(actions.loadUserConfig());
store.dispatch(actions.loadTargets());
store.dispatch(actions.loadOui());
store.dispatch(actions.loadImgBank());
store.dispatch({type: "ADD_NOTIFIER", payload: new Notifier()});  // notifier obj, not yet turned on

/// pulled in from loader
let userConfig = store.getState().appState.userConfig;
if (userConfig.autoOnPapageno) logSys.turnLogSysOn();
store.dispatch({type: "SET_LOG_SYS_STATUS", payload: logSys.getLogSysPid() != 0});
store.dispatch({type: "SET_NOTIFIER_SYS", payload: userConfig.autoOnSysNotifications});
store.dispatch({type: "SET_NOTIFIER_EMAIL", payload: userConfig.autoOnEmailNotifications});


trimDb.call(this, parseInt(userConfig.retentionDays));
setInterval(trimDb.bind(this, parseInt(userConfig.retentionDays)), 1000 * 60 * 60 * 24);


setTimeout(updateActivityLog, 3000);

//// turn on notifier if required but wait until targets are loaded
if (userConfig.autoOnSysNotifications || userConfig.autoOnEmailNotifications) {
    let notifier = store.getState().appState.notifier;
    setTimeout(notifier.turnOn.bind(notifier), 5000
    );
}


//// create .mfuid if required and register

mfuidFileHandler();  // create .mfuid if not exist

// in case registration first tried by mfuidFileHandler() failed
let registerHandle = setInterval(() => {
    if (store.getState().appState.userConfig.mfuidRegistered == false) {
        registerMfuid()
    } else {
        clearInterval(registerHandle);
    }
}, 60000)


//// get updates from flengine

fetchMozartMsg();


win.on("move", _.debounce(storeWindowSize, 2000));
win.on("resize", _.debounce(storeWindowSize, 2000));

const htmlPath = remote.getGlobal('sharedObj').appDir + 'app.html';

const Layout = React.createClass({
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
});


render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path={htmlPath} component={Layout}>
                <IndexRoute component={LoaderPage}/>
                <Route path="/" component={DashboardPage}/>
                <Route path="/loader" component={LoaderPage}/>
                <Route path="/bouncer/:destination/:duration" component={BouncerPage}/>
                <Route path="/dashboard" component={DashboardPage}/>
                <Route path="/about" component={AboutPage}/>
                <Route path="/scan" component={ScanPage}/>
                <Route path="/logs" component={LogsPage}/>
                <Route path="/monitor" component={MonitorPage}/>
                <Route path="/config" component={ConfigPage}/>
                <Route path="/history" component={TimeRangePage}/>
                <Route path="/test" component={TestPage}/>
                <Route path="/profiles" component={ProfilesPage}/>
                <Route path="/history/:mac" component={HistoryPage}/>
                <Route path="/profile/:mac" component={ProfilePage}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('flRoot')
);

updateInternetStatus();
setInterval(updateInternetStatus, 60000);

//testInternet();

function storeWindowSize(e) {
    let userConfig = store.getState().appState.userConfig;
    userConfig.windowParams = win.getBounds();
    store.dispatch(actions.saveUserConfig(userConfig));
}

