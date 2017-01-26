import React, { Component } from 'react';

var moment = require('moment');

class EventDisplay extends Component {
  backClick(){
    this.props.backClick();
  }

  render() {
    var regex = /(<([^>]+)>)/ig;
    var startTimeFormated = moment(this.props.value.startTime).locale('fr');
    var endTimeFormated = moment(this.props.value.endTime).locale('fr');
    console.log(this.props.value.startTime);
    console.log(startTimeFormated.format('LLLL'));
    console.log(this.props.value.endTime);
    console.log(endTimeFormated.format('LLLL'));
    return (
      <div className="container">
        <div className="row">
          <h3 className="col-xs-10"> <a href={`http://jlm2017.fr/${this.props.value.path}`} target="_blank">{this.props.value.name}</a></h3>
          <a className="col-xs-2 btn btn-primary custom-btn" onClick={()=>this.backClick()}>Retour</a>
        </div>
        <hr />
        {this.props.value.description &&
          <div>
            <div className="intro" >{this.props.value.description.replace(regex, '')}</div>
            <hr />
          </div>
        }
        <h5>Adresse&nbsp;:</h5>
        <h6>{this.props.value.location.name}</h6>
        <p className="col-xs-6">{this.props.value.location.address}</p>
        <iframe className="col-xs-6" src={`https://jlm2017.github.io/map/?event_id=${this.props.value.id},${this.props.resource}&hide_panel=1&hide_address=1`} width="400" height="300" scrolling="no" frameBorder="0"></iframe>
        <hr />
        {this.props.value.agenda &&
          <div>
            <h5>Date&nbsp;:</h5>
            <div className="date" >L'événement se déroulera du {startTimeFormated.format('LLLL')} au {endTimeFormated.format('LLLL')}</div>
            <hr />
          </div>
        }
        <h5>
          Contact&nbsp;:
        </h5>
        <div><strong>Nom de l'initiatrice ou de l'initiateur&nbsp;:</strong> {this.props.value.contact.name}</div>
        {this.props.value.contact.email && <div><strong>Email&nbsp;:</strong> {this.props.value.contact.email} </div> }
        {this.props.value.contact.phone && <div><strong>Téléphone&nbsp;:</strong> 0{this.props.value.contact.phone} </div> }
        <hr />
        <h4>
          Nombre de participants&nbsp;: {this.props.value.participants}
        </h4>
      </div>
    );
  }
}

export default EventDisplay;
