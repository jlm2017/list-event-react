import {call, put} from 'redux-saga/effects';

import {ITEM_TYPES_MAP} from '../conf'

import {fetchItems} from './lib';
import {fetch_list_success, fetch_list_error} from './actions'


export function * fetchList(itemType, options) {
  try {
    const items = yield call(fetchItems, ITEM_TYPES_MAP[itemType].apiName, options);

    yield put(fetch_list_success(items, itemType, options))
  } catch(err) {
    yield put(fetch_list_error(err, itemType, options));
  }
}
