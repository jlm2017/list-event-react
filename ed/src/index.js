import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'

import App from './app/App';
import './index.css';
import apiReducer from './api/reducers';

const reducer = combineReducers({
  api: apiReducer
});

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, loggerMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
