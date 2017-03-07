import {takeLatest, take, fork, put } from 'redux-saga/effects'

import {fetchList} from '../api/sagas'
import {FETCH_LIST_SUCCESS, FETCH_LIST_ERROR} from '../api/actions'

import {LIST_REQUEST, list_request_success, list_request_error} from './actions'

function * scheduleFetch(action) {
  console.log("Scheduling fetch!");
  yield fork(fetchList, action.itemType);
  const result = yield take([FETCH_LIST_ERROR, FETCH_LIST_SUCCESS]);

  if (result.type === FETCH_LIST_SUCCESS) {
    const items = result.items.map((item) => item._id);
    yield put(list_request_success(action.itemType, items));
  } else {
    yield put(list_request_error(action.itemType));
  }
}

export default function * listSaga() {
  yield takeLatest(LIST_REQUEST, scheduleFetch);
}
