
export const LIST_REQUEST = "ed/list/request";
export const LIST_REQUEST_ERROR = "ed/list/request/error";
export const LIST_REQUEST_SUCCESS = "ed/list/request/success";
export const LIST_REQUEST_LONG = "ed/list/request/long";


export function list_request(itemType, options) {
  return {
    type: LIST_REQUEST,
    itemType,
    options: options
  };
}

export function list_request_success(itemType) {
  return {
    type: LIST_REQUEST_SUCCESS,
    itemType
  }
}
