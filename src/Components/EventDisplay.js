import React, {Component} from 'react'
import Cookies from 'universal-cookie'
import moment from 'moment'
import sanitizeHtml from 'sanitize-html'
import qs from 'query-string'

import {fetchItem} from '../actions/api'
import {ITEM_TYPES_MAP} from '../conf'
import {Loading, Error} from '../utils'
import {goBack} from '../actions/routing'
import {NetworkError, EntityNotFoundError, BadDataError} from '../errors'
import Authenticate from './Authenticate'

const cookies = new Cookies();

function EventMap(props) {
  return <iframe title="Carte" className="col-xs-6" style={{float: "right"}}
                 src={`https://jlm2017.github.io/map/?event_id=${props.id},${props.resource}&hide_panel=1&hide_address=1`}
                 width="400" height="300" scrolling="no" frameBorder="0"></iframe>;
}


function EventDisplay(props) {

  const startTimeFormated = moment(props.value.start_time).locale('fr');
  const endTimeFormated = moment(props.value.end_time).locale('fr');

  let resource = ITEM_TYPES_MAP[props.itemType].apiName;
  let showBackButton = !props.hideBack;

  // TODO: reorganize/refactor HTML code here. Use subcomponents? or templates?
  // I have the feeling the two cases of events/groups should be handled differently
  return (
    <div className="container">
      <div className="row">
        <h3 className="col-xs-10">{props.value.name}</h3>
        {showBackButton && <a className="col-xs-2 btn btn-primary custom-btn" onClick={goBack}>Retour</a>}
      </div>
      <hr />
      <EventMap id={props.value.id} resource={resource}/>
      {props.value.description &&
      <div>
        <div className="intro" dangerouslySetInnerHTML={{__html:sanitizeHtml(props.value.description)}} />
        <hr />
      </div>
      }
      <h5>Adresse&nbsp;:</h5>
      <h6>{props.value.location.name}</h6>
      <p className="col-xs-6">{props.value.location.address}</p>

      <hr />
      {props.value.calendar &&
      <div>
        <h5>Date&nbsp;:</h5>
        <div className="date">L'événement se déroulera du {startTimeFormated.format('LLLL') + ' '}
          au {endTimeFormated.format('LLLL')}.</div>
        <hr />
      </div>
      }
      <h5>
        Contact&nbsp;:
      </h5>
      <div><strong>Nom de l'initiatrice ou de l'initiateur&nbsp;:</strong> {props.value.contact.name}</div>
      {props.value.contact.email && <div><strong>Email&nbsp;:</strong> {props.value.contact.email} </div> }
      {props.value.contact.phone &&
      <div><strong>Téléphone&nbsp;:</strong> 0{props.value.contact.phone} </div> }
      <hr />
      {props.value.calendar &&
      <h4>
        Nombre de participants&nbsp;: {props.value.participants}
      </h4>
      }
      <Authenticate>
        <div>{props.value.is_organizer &&
          <p>
            <a class="btn btn-primary" href={`http://f-i.jlm2017.fr/users/event_pages/${props.value.id}/edit`}>
              Modifier l'événement
            </a>
          </p>
        }
        <p><small>Connecté comme {cookies.get('userEmail')}.</small></p>
      </div>
      </Authenticate>
    </div>
  );
}

class EventDisplayContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      error: null
    }
  }

  componentDidMount() {
    const showCreating = 'show_creating' in qs.parse(this.props.location.search);
    let apiName = ITEM_TYPES_MAP[this.props.match.params.itemType].apiName;
    fetchItem(apiName, this.props.match.params.id)
      .then((item) => {
        this.setState({error: null, value: item});
      })
      .catch((err) => {
        let errorMessage;
        if (err instanceof NetworkError) {
          errorMessage = 'Erreur de connexion. Assurez-vous d\'être bien connecté.';
        } else if (err instanceof BadDataError) {
          errorMessage = 'Un problème de communication avec le serveur a été rencontré. Réessayez plus tard.';
        } else if (err instanceof EntityNotFoundError) {
          const demonstrativeForm = ITEM_TYPES_MAP[this.props.params.itemType].demonstrativeForm;
          const formulation = showCreating ?
            "est en cours de création. Attendez quelques minutes pour voir cette page apparaître." :
            "n'existe pas.";
          errorMessage = `${demonstrativeForm} ${formulation}`;
        } else {
          errorMessage = 'Une erreur inconnue a été rencontrée. Réessayez plus tard.'
        }

        this.setState({error: errorMessage, value: null});
      });
  }

  render() {
    let hideBack = 'cacher-menu' in qs.parse(this.props.location.search);

    if (this.state.error) {
      return <Error message={this.state.error}/>
    }
    else if (this.state.value) {
      return <EventDisplay value={this.state.value} itemType={this.props.match.params.itemType}
                           hideBack={hideBack}/>
    } else {
      return <Loading />
    }
  }
}

export default EventDisplayContainer;
