
export const FETCH_LIST_SUCCESS = "ed/api/list/success";
export const FETCH_LIST_ERROR = "ed/api/list/error";

export const FETCH_ENTITY_SUCCESS = "ed/api/entity/success";
export const FETCH_ENTITY_ERROR = "ed/api/entity/error";

export const PATCH_ENTITY_SUCCESS = "ed/api/patch/success";
export const PATCH_ENTITY_ERROR = "ed/api/patch/error";

export const CREATE_ENTITY = "ed/api/create_entity";
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

export function fetch_entity_success (item, itemType, options) {
  return {
    type: FETCH_ENTITY_SUCCESS,
    itemType,
    options,
    item
  };
}

export function fetch_entity_error (error, itemType, options) {
  return {
    type: FETCH_ENTITY_ERROR,
    itemType,
    options,
    error
  };
}

export function patch_entity_success (response, itemType, patch, options) {
  return {
    type: PATCH_ENTITY_SUCCESS,
    itemType,
    options,
    response
  };
}

export function patch_entity_error (error, itemType, patch, options) {
  return {
    type: PATCH_ENTITY_ERROR,
    itemType,
    options,
    error
  };
}

