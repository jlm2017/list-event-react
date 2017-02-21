import {ITEM_TYPES} from '../conf'

import {FETCH_LIST_SUCCESS} from './actions'

const initialState = {};
for (let itemType of ITEM_TYPES) {
  initialState[itemType.value] = {};
}

export default function apiReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_LIST_SUCCESS:
      const merged_items = Object.assign({}, state[action.itemType]);
      for(let item of action.items) {
        merged_items[item._id] = item;
      }
      return Object.assign({}, state, {[action.itemType]: merged_items});
    default:
      return state;
  }
}
