'use strict';

import React, { Component } from 'react';

class Event extends Component {
  render() {
    return (
      <div>
        <div className="pull-right padding-right">
          <a className="btn btn-primary">plus d'info</a>
        </div>
        <h4>{this.props.event.name}</h4>
        <div>adresse: {this.props.event.name}</div>
        {/* <div>contact: {this.props.event.contact}</div> */}
      </div>
    );
  }
}


export default Event;
