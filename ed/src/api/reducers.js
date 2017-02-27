import {ITEM_TYPES} from '../conf'

import {FETCH_LIST_SUCCESS, FETCH_ENTITY_SUCCESS} from './actions'

const initialState = {};
for (let itemType of ITEM_TYPES) {
  initialState[itemType.value] = {};
}

export default function apiReducer(state = initialState, action) {
  let merged_items;
  switch(action.type) {
    case FETCH_LIST_SUCCESS:
      merged_items = Object.assign({}, state[action.itemType]);
      for(let item of action.items) {
        merged_items[item._id] = item;
      }
      return Object.assign({}, state, {[action.itemType]: merged_items});
    case FETCH_ENTITY_SUCCESS:
      merged_items = Object.assign({}, state[action.itemType]);
      merged_items[action.item._id] = action.item;
      return Object.assign({}, state, {[action.itemType]: merged_items});
    default:
      return state;
  }
}
