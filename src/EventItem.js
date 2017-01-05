import React, { Component } from 'react';

class EventItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: false,
    };
  }

  clickInfo(){
    this.setState(prevState => ({info: !prevState.info}));
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-8">
          <h3> <a href={`http://jlm2017.fr/${this.props.eventItem.path}`} target="_blank">{this.props.eventItem.name}</a></h3>
          {this.props.eventItem.location && this.props.eventItem.location.name &&
            <div>Lieu(&nbsp;): {this.props.eventItem.location.name}</div>
          }
          {this.state.info &&
            <div>
              {this.props.eventItem.location && this.props.eventItem.location.address &&
                <div>
                  <br />
                  <h4>
                    Adresse(&nbsp;):
                  </h4>
                  <a href={`http://maps.google.com/?q=${this.props.eventItem.location.address}`} target="_blank">{this.props.eventItem.location.address}</a>
                </div>
              }
              <br />
              <h4>
                Contact(&nbsp;):
              </h4>
              <div><strong>Nom de l'initiatrice ou de l'initiateur(&nbsp;):</strong> {this.props.eventItem.contact.name}</div>
              {this.props.eventItem.contact.email && <div><strong>Email(&nbsp;):</strong> {this.props.eventItem.contact.email} </div> }
              {this.props.eventItem.contact.phone && <div><strong>Téléphone(&nbsp;):</strong> 0{this.props.eventItem.contact.phone} </div> }
            </div>
          }
        </div>
        <div className="col-xs-12 col-sm-4">
          <p>
            <a className="btn btn-primary custom-btn" onClick={()=>this.clickInfo()}>{this.state.info ? 'moins d\'info' : 'plus d\'info'}</a>
          </p>
        </div>
      </div>
    );
  }
}


export default EventItem;
