import React, { Component } from 'react';

class EventDisplay extends Component {
  backClick(){
    this.props.backClick();
  }

  render() {
    var regex = /(<([^>]+)>)/ig;
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
        <p>{this.props.value.location.address}</p>
        <a href={`http://maps.google.com/?q=${this.props.value.location.address}`} target="_blank">
          Carte et itinéraires
        </a>
        <hr />
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
