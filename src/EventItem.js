'use strict';

import React, { Component } from 'react';

class EventItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: false,
    };
  }

  render() {
    return (
      <div>
        <h4 > <a href={`http://jlm2017.fr/${this.props.eventItem.path}`}>{this.props.eventItem.name}</a></h4>
        <div>adresse: {this.props.eventItem.name}</div>
      </div>
    );
  }
}


export default EventItem;
