import {combineReducers} from 'redux';

import * as actions from './actions';
import {ITEM_TYPES} from '../conf'

const REQUEST_STATUS_NONE = "none";
const REQUEST_STATUS_PROGRESS = "progress";
const REQUEST_STATUS_LONG = "long";
const REQUEST_STATUS_SUCCESS = "success";
const REQUEST_STATUS_ERROR = "error";

const initialState = {
  lastRequestStatus: REQUEST_STATUS_NONE,
  lastUpdated: null,
};

function commonlistReducer(state = initialState, action) {
  switch(action.type) {
    case actions.LIST_REQUEST:
      return Object.assign({}, state, {lastRequestStatus: REQUEST_STATUS_PROGRESS});
    case actions.LIST_REQUEST_SUCCESS:
      return Object.assign({}, state, {lastRequestStatus: REQUEST_STATUS_SUCCESS});
    case actions.LIST_REQUEST_ERROR:
      return Object.assign({}, state, {requestStatus: REQUEST_STATUS_ERROR});
    default:
      return state;
  }
}

const reducerMaps = {};
for (let itemType of ITEM_TYPES) {
  reducerMaps[itemType.apiName] = commonlistReducer;
}

const listReducer = combineReducers(reducerMaps);
export default listReducer;