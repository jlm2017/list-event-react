'use strict';

import React, { Component } from 'react';
import './App.css';
import FormNoZipcode from './FormNoZipcode.js'
import EventList from './EventList.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: this.getQueryParameterByName('zipcode'),
      embedEventType: this.getQueryParameterByName('event_type') || 'groups,evenements_locaux,melenchon',
      embedTags: (this.getQueryParameterByName('tags') || '').split(','),
    };
  }

  getQueryParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  render() {
    if (this.state.zipcode === null) {
      return(
        <FormNoZipcode embedeventtype={this.state.embedEventType} embedTags={this.state.embedTags}/>
      );
    }

    return (
      <div className='App'>
        <ul>
          <li>{this.state.zipcode}</li>
          <li>{this.state.embedEventType}</li>
          <li>{this.state.embedTags.join('/')}</li>
        </ul>
        <p>test du composant</p>
        <EventList zipcode={this.state.zipcode} embedeventtype={this.state.embedEventType} embedTags={this.state.embedTags}/>
      </div>
    );
  }
}

export default App;
