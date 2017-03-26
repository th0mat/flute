import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {hashHistory} from 'react-router';
import {routerMiddleware, push} from 'react-router-redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import {remote} from 'electron';

import * as appState from '../actions/appState';

const logger = remote.getGlobal('sharedObj').logger;

const actionCreators = {
  ...appState,
  push,
};

logger.info("*** redux configured via configureStore.development");

const filter = (getState, action) => {
    return action.type !== 'SCAN_DATA' && action.type !== 'MONITOR_DATA'
}

const reduxLogger = createLogger({
  level: 'info',
  collapsed: true,
    predicate: filter
});


// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
        actionCreators,
    }) :
    compose;

const router = routerMiddleware(hashHistory);

const enhancer = composeEnhancers(
    applyMiddleware(thunk, router, reduxLogger)
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);


  if (module.hot) {
    module.hot.accept('../reducers', () =>
        store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  return store;
}
