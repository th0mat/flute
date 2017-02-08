import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from "../reducers";

//const middleware = applyMiddleware(thunk);
const middleware = applyMiddleware(thunk, logger());

export default function configureStore(){
  return createStore(reducer, middleware);
}
