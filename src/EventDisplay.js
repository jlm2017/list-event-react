import React, {Component} from 'react'
import moment from 'moment'

import {ITEM_TYPES, API_ENDPOINT} from './consts'
import {Loading, Error} from './utils'
import {goBack, getJsonFrom} from './actions'


function getUrl(itemType, id) {
  let apiName = ITEM_TYPES.find((item) => (item.value === itemType)).apiName;
  return `${API_ENDPOINT}${apiName}/${id}`;
}

class EventDisplayPresentation extends Component {

  render() {
    var regex = /(<([^>]+)>)/ig;
    var startTimeFormated = moment(this.props.value.startTime).locale('fr');
    var endTimeFormated = moment(this.props.value.endTime).locale('fr');

    let resource = ITEM_TYPES.find((item) => (item.value === this.props.itemType)).apiName;
    let showBackButton = !this.props.hideBack;

    // TODO: reorganize/refactor HTML code here. Use subcomponents? or templates?
    // I have the feeling the two cases of events/groups should be handled differently
    return (
      <div className="container">
        <div className="row">
          <h3 className="col-xs-10">{this.props.value.name}</h3>
          {showBackButton && <a className="col-xs-2 btn btn-primary custom-btn" onClick={goBack}>Retour</a>}
        </div>
        <hr />
        {this.props.value.description &&
        <div>
          <div className="intro">{this.props.value.description.replace(regex, '')}</div>
          <hr />
        </div>
        }
        <h5>Adresse&nbsp;:</h5>
        <h6>{this.props.value.location.name}</h6>
        <p className="col-xs-6">{this.props.value.location.address}</p>

        {/* TODO: the map should be its own subcomponent */}
        <iframe className="col-xs-6"
                src={`https://jlm2017.github.io/map/?event_id=${this.props.value.id},${resource}&hide_panel=1&hide_address=1`}
                width="400" height="300" scrolling="no" frameBorder="0"></iframe>
        <hr />
        {this.props.value.agenda &&
        <div>
          <h5>Date&nbsp;:</h5>
          <div className="date">L'événement se déroulera du {startTimeFormated.format('LLLL')}
            au {endTimeFormated.format('LLLL')}</div>
          <hr />
        </div>
        }
        <h5>
          Contact&nbsp;:
        </h5>
        <div><strong>Nom de l'initiatrice ou de l'initiateur&nbsp;:</strong> {this.props.value.contact.name}</div>
        {this.props.value.contact.email && <div><strong>Email&nbsp;:</strong> {this.props.value.contact.email} </div> }
        {this.props.value.contact.phone &&
        <div><strong>Téléphone&nbsp;:</strong> 0{this.props.value.contact.phone} </div> }
        <hr />
        <h4>
          Nombre de participants&nbsp;: {this.props.value.participants}
        </h4>
      </div>
    );
  }
}

class EventDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      error: null
    }
  }

  componentDidMount() {
    const apiUrl = getUrl(this.props.params.itemType, this.props.params.id);
    getJsonFrom(apiUrl).then((json) => {

      if ('_error' in json) {
        // there has been an error in the request (most likely 404)
        // TODO: should return 404 component instead
        this.setState({error: "Cet élément n'existe pas."})
      } else {
        this.setState({error: null, value: json})
      }

    });
  }

  render() {
    let hideBack = 'cacher-menu' in this.props.location.query;

    if(this.state.error) {
      return <Error message={this.state.error} />
    }
    else if(this.state.value) {
      return <EventDisplayPresentation value={this.state.value} itemType={this.props.params.itemType}
                                       hideBack={hideBack} />
    } else {
      return <Loading />
    }
  }
}

export default EventDisplay;
