import uuid from 'uuid';

const DISPLAY_MESSAGE = "ed/app/message/display";
const REMOVE_MESSAGE = "ed/app/message/remove";

export function display_message({content, level = "info", duration = 10}) {
  return {
    type: DISPLAY_MESSAGE,
    id: uuid(),
    content,
    level,
    duration
  }
}

export function remove_message(id) {
  return {
    type: REMOVE_MESSAGE,
    id
  }
}

const initialState = {
  messages: []
};

export default function uiReducer(state = initialState, action) {
  switch(action.type) {
    case DISPLAY_MESSAGE:
      return Object.assign({}, state, {messages: [state.messages, {
        id: action.id, content: action.content, level: action.level
      }]});
    case REMOVE_MESSAGE:
      return Object.assign({}, state, {messages: state.messages.filter(({id}) => id !== action.id)});
    default:
      return state;
  }
}
