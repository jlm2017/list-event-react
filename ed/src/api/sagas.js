import {call, put} from 'redux-saga/effects';

import {ITEM_TYPES_MAP} from '../conf'

import {fetchItems, fetchItem} from './lib';
import {fetch_list_success, fetch_list_error, fetch_entity_success, fetch_entity_error} from './actions'


export function * fetchList(itemType, options) {
  try {
    const items = yield call(fetchItems, ITEM_TYPES_MAP[itemType].apiName, options);

    yield put(fetch_list_success(items, itemType, options))
  } catch(err) {
    yield put(fetch_list_error(err, itemType, options));
  }
}

export function * fetchEntity(itemType, id, options) {
  try {
    const item = yield call(fetchItem, ITEM_TYPES_MAP[itemType].apiName, id, options);
    yield put(fetch_entity_success(item, itemType, options));
  } catch(err) {
    yield put(fetch_entity_error(err, itemType, options))
  }
}
