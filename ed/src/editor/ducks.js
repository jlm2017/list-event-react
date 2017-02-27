import deepEqual from 'deep-equal';
import {combineReducers} from 'redux';

import {ITEM_TYPES} from '../conf';

const EDITOR_ENTER = "ed/editor/ENTER";
const EDITOR_LEAVE = "ed/editor/LEAVE";
export const ITEM_REQUEST = "ed/editor/REQUEST";
const ITEM_REQUEST_SUCCESS = "ed/editor/REQUEST/SUCCESS";
const ITEM_REQUEST_ERROR = "ed/editor/REQUEST/ERROR";

export function requestItemSuccess(itemType, item) {
  return {
    type: ITEM_REQUEST_SUCCESS,
    itemType,
  };
}

export function requestItemError(itemType) {
  return {
    type: ITEM_REQUEST_ERROR,
    itemType,
  };
}

export function enterEditor(itemType, item) {
  return {
    type: EDITOR_ENTER,
    itemType,
    item
  }
}

export function leaveEditor(itemType) {
  return {
    type: EDITOR_LEAVE,
    itemType
  };
}

export function requestItem(itemType, id) {
  return {
    type: ITEM_REQUEST,
    itemType,
    id
  }
}

export const EDITOR_REQUEST_NONE = 'ed/editor/request/none';
const EDITOR_REQUEST_STARTED = 'ed/editor/request/started';
const EDITOR_REQUEST_SUCCESS = 'ed/editor/request/success';
const EDITOR_REQUEST_ERROR = 'ed/editor/request/error';

const initialState = {
  initial: null,
  request: EDITOR_REQUEST_NONE,
  entered: false,
};

function createReducer(itemType) {
  return function commonEditorReducer(state = initialState, action) {
    if (action.itemType !== itemType) {
      return state;
    }

    switch (action.type) {
      case ITEM_REQUEST:
        return Object.assign({}, state, {request: EDITOR_REQUEST_STARTED});
      case ITEM_REQUEST_SUCCESS:
        return Object.assign({}, state, {request: EDITOR_REQUEST_SUCCESS});
      case ITEM_REQUEST_ERROR:
        return Object.assign({}, state, {request: EDITOR_REQUEST_ERROR});
      case EDITOR_ENTER:
        if (deepEqual(state.item, action.item)) {
          return state;
        } else {
          return Object.assign({}, state, {initial: action.item, entered: true})
        }
      case EDITOR_LEAVE:
        return Object.assign({}, state, {initial: null, request: EDITOR_REQUEST_NONE, entered: false});
      default:
        return state;
    }
  };
}

const reducerMaps = {
  'people': createReducer('people')
};
for (let itemType of ITEM_TYPES) {
  reducerMaps[itemType.value] = createReducer(itemType.value);
}

const editorReducer = combineReducers(reducerMaps);
export default editorReducer;
