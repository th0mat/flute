// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import {remote} from 'electron';

const logger = remote.getGlobal('sharedObj').logger;
const router = routerMiddleware(hashHistory);

logger.info("*** redux configured via configureStore.production");

const enhancer = applyMiddleware(thunk, router);

export default function configureStore(initialState: Object) {
  return createStore(rootReducer, initialState, enhancer);
}
