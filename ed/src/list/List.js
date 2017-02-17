import React from 'react';
import {connect} from 'react-redux';

import {ITEM_TYPES_MAP} from '../conf';

function Header(props) {
  const {itemLabelPlural} = props;
  return <h2>Voir mes {itemLabelPlural}</h2>
}

function ListItem(props) {
  const {item} = props;
  return (
    <li>
      <h3>{item.name}</h3>
      {item.location && item.location.name && <div>Lieu&nbsp;: {item.location.name}</div>}
    </li>
  );
}

export function List(props) {
  const {itemType, items} = props;
  const {labelPlural, label} = ITEM_TYPES_MAP[itemType];

  return (
    <div>
      <Header itemLabelPlural={labelPlural}/>
      {
        items
          ? <ul>
            { items.map((item) => <ListItem item={item}/>) }
          </ul>
          : <p>Vous n'avez pas de {label}</p>
      }
    </div>
  )
}


class ListContainer extends React.Component {

}


function mapStateToProps(state, props) {
  const itemType = props.params.itemType;
  const {requestStatus, requestId} = state.list[itemType];

  return {
    items: state[itemType]
  }
}

export default connect(mapStateToProps)(List);