
export const LIST_REQUEST = "ed/list/request";
export const LIST_REQUEST_ERROR = "ed/list/request/error";
export const LIST_REQUEST_SUCCESS = "ed/list/request/success";
export const LIST_REQUEST_LONG = "ed/list/request/long";


export function list_request(itemType) {
  return {
    type: LIST_REQUEST,
    itemType
  };
}

export function list_request_success(itemType, items) {
  return {
    type: LIST_REQUEST_SUCCESS,
    itemType,
    items
  }
}

export function list_request_error(itemType) {
  return {
    type: LIST_REQUEST_ERROR,
    itemType
  }
}

export function list_request_long(itemType) {
  return {
    type: LIST_REQUEST_LONG,
    itemType
  }
}
