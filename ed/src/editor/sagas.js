import {takeLatest, take, fork, put, call } from 'redux-saga/effects'
import { SubmissionError } from 'redux-form';

import isPojo from 'is-pojo';
import deepEqual from 'deep-equal';

import {fetchEntity, patchEntity} from '../api/sagas'
import {FETCH_ENTITY_SUCCESS, FETCH_ENTITY_ERROR, PATCH_ENTITY_SUCCESS, PATCH_ENTITY_ERROR} from '../api/actions'

import {ITEM_REQUEST, ITEM_PATCH_REQUEST, requestItemSuccess, requestItemError} from './ducks'

function getDifferences(base, changes) {
  const res = {};

  for (let key of Object.keys(changes)) {
    if(isPojo(base[key])) {
      if (!deepEqual(base[key], changes[key])) {
        res[key] = getDifferences(base[key], changes[key])
      }
    } else {
      if(base[key] !== changes[key]) {
        res[key] = changes[key];
      }
    }
  }

  return res;
}


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


function * schedulePatch({itemType, id, initial, data, defer, options}) {
  const {resolve, reject} = defer;
  const patch = getDifferences(initial, data);

  const [result] = yield [
    take([PATCH_ENTITY_SUCCESS, PATCH_ENTITY_ERROR]),
    fork(patchEntity, itemType, id, patch, {...options, etag: initial._etag})
  ];

  if (result.type === PATCH_ENTITY_SUCCESS) {
    yield call(resolve, result.payload);
  } else {
    yield call(reject, result.payload);
  }
}

export default function * editorSaga() {
  yield takeLatest(ITEM_REQUEST, scheduleFetch);
  yield takeLatest(ITEM_PATCH_REQUEST, schedulePatch);
}
