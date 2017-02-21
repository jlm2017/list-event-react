const EDITOR_REQUEST_NONE = 'ed/editor/request/none';
const EDITOR_REQUEST_STARTED = 'ed/editor/request/started';
const EDITOR_REQUEST_LONG = 'ed/editor/request/long';
const EDITOR_REQUEST_SUCCESS = 'ed/editor/request/success';
const EDITOR_REQUEST_ERROR = 'ed/editor/request/error';

const initialState = {
  cache: null,
  current: null,
request: null,
};

function createReducer(itemType) {
  return function commonEditorReducer(state = initialState, action) {
    if(action.itemType !== itemType) { return state; }

    switch (action.type) {
      default:
        return state;
    }
  };
}

