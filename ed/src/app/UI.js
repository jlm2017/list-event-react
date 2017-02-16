import React from 'react';

import Menu from '../menu/Menu';

export default function UI(props) {
  return <div>
    <Menu />
    <div className="content">
      {props.children}
    </div>
  </div>
}
