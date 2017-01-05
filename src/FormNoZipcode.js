import React, { Component } from 'react';
import EventList from './EventList.js'


class FormNoZipcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.zipcode || '',
      zipcode: this.props.zipcode || null,
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
    return (
      <div className="container">
        <h4 className="text-center">
          Recherche des groupes d'appuis autour de chez vous
        </h4>
        <div className="row">
          <div className="col-responsive">
            <form className="form-group" onSubmit={this.handleSubmit}>
              <div className="input-group">
                <input className="form-control" type="text" value={this.state.value} placeholder="Code postal" onChange={this.handleChange} />
                <div className="input-group-btn">
                  <button className="btn btn-danger" type="button">Rechercher</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {this.state.zipcode != null &&
          <div className="row">
            <hr/>
            <br/>
            <EventList zipcode={this.state.zipcode} embedeventtype={this.props.embedeventtype} embedTags={this.props.embedTags}/>
          </div>
        }
      </div>
    );
  }
}

export default FormNoZipcode;
