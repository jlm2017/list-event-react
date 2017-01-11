import React, { Component } from 'react';
import EventList from './EventList.js'


class FormNoZipcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.zipcode || '',
      zipcode: this.props.zipcode || null,
      typeEvent: this.props.embedeventtype.split(',')[0] || 'evenements_locaux'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.radioChange = this.radioChange.bind(this);
  }

  radioChange(changeEvent){
    this.setState({typeEvent: changeEvent.target.value});
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState({zipcode: this.state.value});
    event.preventDefault();
  }

  render() {
    var listValueRadio = ['evenements_locaux', 'groups'];
    var listLabelRadio = ['évévements locaux', 'groupes d\'appuis'];
    var displayTitle = listLabelRadio[listValueRadio.indexOf(this.state.typeEvent)];
    return (
      <div className="container">
        <h4 className="text-center">
          Recherche des {displayTitle} autour de chez vous
        </h4>
        <div className="row">
          <div className="col-responsive">
            <form className="form-group" onSubmit={this.handleSubmit}>
              <div className="input-group">
                <input className="form-control" type="text" value={this.state.value} placeholder="Code postal" onChange={this.handleChange} />
                <div className="input-group-btn">
                  <input className="btn btn-danger" type="submit" value="Rechercher"></input>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <form className="form-inline col-responsive">
            <div className="radio col-xs-6">
              <label className="radio-inline">
                <input type="radio" value="groups" onChange={this.radioChange} checked={(this.state.typeEvent === 'groups') ? true : false} />
                &nbsp;Groupes d'appuis
              </label>
            </div>
            <div className="radio col-xs-6">
              <label className="radio-inline">
                <input type="radio" value="evenements_locaux" onChange={this.radioChange} checked={(this.state.typeEvent === 'evenements_locaux') ? true : false}/>
                &nbsp;Événements locaux
              </label>
            </div>
          </form>
        </div>
        {this.state.zipcode != null &&
          <div className="row">
            <hr/>
            <br/>
            <EventList zipcode={this.state.zipcode} embedeventtype={this.state.typeEvent} embedTags={this.props.embedTags}/>
          </div>
        }
      </div>
    );
  }
}

export default FormNoZipcode;
