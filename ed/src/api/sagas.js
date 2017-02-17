import {call, put, takeEvery, takeLatest} from 'redux-sage/effects';
import {fetchItem} from './lib';

function * fetchEntity(entityType, id) {
  let entity;
  try {
    entity = yield fetchItem(entityType, id);
  } catch(err) {

  }
}