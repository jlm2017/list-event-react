import React, {Component} from 'react';
import moment from 'moment';

class EventItem extends Component {
  onDetails() {
    this.props.onDetails(this.props.event);
  }

  render() {
    return (
      <div className="row vertical-center">
        <div className="col-xs-12 col-sm-8">
          <h3>{this.props.event.name}</h3>
          {this.props.event.location && this.props.event.location.name &&
          <div>Lieu&nbsp;: {this.props.event.location.name}</div>
          }
          {this.props.event.start_time && <div>Date&nbsp;: {moment(this.props.event.start_time).locale('fr').format('LLLL')}</div>
          }
        </div>
        <div className="col-xs-12 col-sm-4 text-center">
          <a className="btn btn-primary custom-btn" onClick={() => this.onDetails()}>plus d'info</a>
        </div>
      </div>
    );
  }
}


export default EventItem;
