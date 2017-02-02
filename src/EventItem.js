import React, { Component } from 'react';
import {Link} from 'react-router'

class EventItem extends Component {
  clickInfo(){
    this.props.infoClick(this.props.eventItem);
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-8">
          <h3>{this.props.eventItem.name}</h3>
          {this.props.eventItem.location && this.props.eventItem.location.name &&
            <div>Lieu&nbsp;: {this.props.eventItem.location.name}</div>
          }
        </div>
        <div className="col-xs-12 col-sm-4">
          <p>
            <a className="btn btn-primary custom-btn" onClick={()=>this.clickInfo()}>plus d'info</a>
          </p>
        </div>
      </div>
    );
  }
}


export default EventItem;
