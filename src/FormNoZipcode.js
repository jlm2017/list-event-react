'use strict';

import React, { Component } from 'react';
import EventList from './EventList.js'


class FormNoZipcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      zipcode: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState({zipcode: this.state.value});
    event.preventDefault();
  }

  render() {
    if (this.state.zipcode != null) {
      return (
       <EventList zipcode={this.state.zipcode} embedeventtype={this.props.embedeventtype} embedTags={this.props.embedTags}/>
      );
    }
    return (
     <form onSubmit={this.handleSubmit}>
       <label>
         Name:
         <input type="text" value={this.state.value} onChange={this.handleChange} />
       </label>
       <input type="submit" value="Submit" />
     </form>
    );
  }
}

export default FormNoZipcode;
