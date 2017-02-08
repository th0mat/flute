// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import appState from './appState';

const rootReducer = combineReducers({
  appState,
  routing
});

export default rootReducer;
