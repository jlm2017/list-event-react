import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';
import moment from 'moment';

import App from './app/App';
import './index.css';
import apiReducer from './api/reducers';
import listReducer from './list/reducers';
import listSaga from './list/sagas';
import editorReducer from './editor/ducks';
import editorSaga from './editor/sagas';

moment.locale('fr');

const reducer = combineReducers({
  api: apiReducer,
  list: listReducer,
  editor: editorReducer,
  form: formReducer
});

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, loggerMiddleware)
);

sagaMiddleware.run(listSaga);
sagaMiddleware.run(editorSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
