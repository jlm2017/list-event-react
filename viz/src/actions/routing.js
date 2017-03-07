import 'whatwg-fetch'

import {HISTORY_HANDLER} from '../conf'

// TODO: this set up is not entirely satisfying. maybe use something like Redux actions?

export function searchFor({itemType, zipcode, page}){
  const search = HISTORY_HANDLER.getCurrentLocation().search;

  if (zipcode) {
    if (page) {
      HISTORY_HANDLER.push(`/${itemType}/recherche/${zipcode}/${page}${search}`);
    } else {
      HISTORY_HANDLER.push(`/${itemType}/recherche/${zipcode}${search}`);
    }
  } else {
    HISTORY_HANDLER.push(`/${itemType}/${search}`)
  }
}

export function showDetails({itemType, id}) {
  HISTORY_HANDLER.push(`/${itemType}/details/${id}${HISTORY_HANDLER.getCurrentLocation().search}`);
}

export function goBack() {
  HISTORY_HANDLER.goBack();
}
