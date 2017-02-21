
export const FETCH_LIST_SUCCESS = "ed/api/list/success";
export const FETCH_LIST_ERROR = "ed/api/list/error";

export const NEED_ENTITY = "ed/api/need_entity";

export const CREATE_ENTITY = "ed/api/create_entity";
export const PATCH_ENTITY = "ed/api/patch_entity";

export const ENTITIES_UPDATED = "ed/api/fetched";


export function fetch_list_success (items, itemType, options) {
  return {
    type: FETCH_LIST_SUCCESS,
    itemType,
    options,
    items
  };
}

export function fetch_list_error (error, itemType, options) {
  return {
    type: FETCH_LIST_ERROR,
    itemType,
    options,
    error
  };
}
