import React from 'react';
import {connect} from 'react-redux';
import Spinner from 'react-spinkit';
import {Link} from 'react-router';

import {ITEM_TYPES_MAP} from '../conf';

import {list_request} from './actions';
import * as reducers from './reducers';

function Header(props) {
  const {itemLabelPlural, lastSuccess} = props;
  return <h2>Voir mes {itemLabelPlural} <small>(dernière mise à jour {lastSuccess.format("HH:mm")})</small></h2>
}

function RefreshButton(props) {
  const {fetchList} = props;

  return (
    <div style={{position: 'absolute', top: 0, right: 0}}>
      <button onClick={fetchList}>Rafraîchir</button>
    </div>
  );
}

function ListItem(props) {
  const {item, itemType, query} = props;
  return (
    <li>
      <h3><Link to={{pathname: `/${itemType}/${item._id}`, query}}>{item.name}</Link></h3>
      {item.location && item.location.name && <div>Lieu&nbsp;: {item.location.name}</div>}

    </li>
  );
}

class List extends React.Component {

  componentDidMount() {
    /*
     When mounting, start a new request if no request has ever been started or the previous request
     encountered an error
     */
    if ([reducers.REQUEST_STATUS_NONE, reducers.REQUEST_STATUS_ERROR].includes(this.props.lastRequestStatus)) {
      this.props.fetchList();
    }
  }

  componentDidUpdate() {
    /*
     when updating the component, a new request is started only if no request has been started before
     This situation should not happen
     */
    if (this.props.lastRequestStatus === reducers.REQUEST_STATUS_NONE) {
      this.props.fetchList()
    }
  }

  render() {

    const {itemType, items, lastSuccess, fetchList, query} = this.props;
    const {labelPlural, label} = ITEM_TYPES_MAP[itemType];

    if (this.props.lastRequestStatus === reducers.REQUEST_STATUS_NONE) {
      return <Spinner spinnerName='three-bounce' noFadeIn />;
    }
    if(this.props.lastRequestStatus === reducers.REQUEST_STATUS_PROGRESS) {
      return <Spinner spinnerName='three-bounce' noFadeIn />;
    }

    return (
      <div style={{position: 'relative'}}>
        <Header itemLabelPlural={labelPlural} lastSuccess={lastSuccess} />
        <RefreshButton fetchList={fetchList} />
        {
          items
            ? <ul>
              { items.map((item) => <ListItem key={item._id} item={item} query={query} itemType={itemType} />) }
            </ul>
            : <p>Vous n'avez pas de {label}</p>
        }
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const itemType = props.params.itemType;
  const allEntities = state.api[itemType];
  const {lastRequestStatus, lastSuccess, items} = state.list[itemType];

  const items_obj = items.map((id) => allEntities[id]);

  return {
    itemType,
    items: items_obj,
    lastRequestStatus,
    lastSuccess,
    query: props.location.query
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    fetchList: () => dispatch(list_request(props.params.itemType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
