import {takeLatest, take, fork, put } from 'redux-saga/effects'

import {fetchEntity} from '../api/sagas'
import {FETCH_ENTITY_SUCCESS, FETCH_ENTITY_ERROR} from '../api/actions'

import {ITEM_REQUEST, requestItemSuccess, requestItemError} from './ducks'

function * scheduleFetch(action) {
  console.log("Scheduling fetch!");
  yield fork(fetchEntity, action.itemType, action.id);
  const result = yield take([FETCH_ENTITY_SUCCESS, FETCH_ENTITY_ERROR]);

  if (result.type === FETCH_ENTITY_SUCCESS) {
    yield put(requestItemSuccess(action.itemType, result.item));
  } else {
    yield put(requestItemError(action.itemType));
  }
}

export default function * editorSaga() {
  yield takeLatest(ITEM_REQUEST, scheduleFetch);
}
