import React from 'react';

import Menu from '../menu/Menu';

export default function UI(props) {
  const query = props.location && props.location.query;

  return <div>
    <Menu query={query} />
    <div className="content">
      {props.children}
    </div>
  </div>
}
