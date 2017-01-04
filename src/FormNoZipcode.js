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
      <div className="container">
        <h4 className="text-center">
          Recherche des groupes d'appuis autour de chez vous
        </h4>
        <div className="raw">
          <form className="col-xs-offset-3 col-xs-8" onSubmit={this.handleSubmit}>
            <label>
              Code postale:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Rechercher" />
          </form>
        </div>
      </div>
    );
  }
}

export default FormNoZipcode;
