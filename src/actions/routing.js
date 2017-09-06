import 'whatwg-fetch'

// TODO: this set up is not entirely satisfying. maybe use something like Redux actions?

export function searchFor({itemType, zipcode, page}){
  const search = this.props.location.search;

  if (zipcode) {
    if (page) {
      this.props.history.push(`/${itemType}/recherche/${zipcode}/${page}${search}`);
    } else {
      this.props.history.push(`/${itemType}/recherche/${zipcode}${search}`);
    }
  } else {
    this.props.history.push(`/${itemType}/${search}`)
  }
}

export function showDetails({itemType, id}) {
  this.props.history.push(`/${itemType}/details/${id}${this.props.location.search}`);
}

export function goBack(history) {
  history.goBack();
}
