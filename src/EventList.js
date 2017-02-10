import React, { Component } from 'react';
import 'whatwg-fetch';

import EventItem from './EventItem.js';
import {searchFor, showDetails} from './actions'
import {Loading, Error} from './utils'

// TODO: set default value for prop page
class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeEvent: '',
      error: null,
      zipcode: this.props.params.zipcode,
      initialized: false,
      requestError: false,
      listEventJson: null,
      resource: '',
    };

    this.infoClick = this.infoClick.bind(this);
    this.clickBack = this.clickBack.bind(this);
  }

  infoClick(value) {
    showDetails({itemType: this.props.params.itemType, id: value._id, search: this.props.location.search});
  }

  clickBack() {
    this.setState({value: null});
  }

  getUrl() {
    //on recupère sur api-adresse.data.gouv.fr les coordonnées du code postal passé en parramétre d'url
    // TODO: AJAX handling should be refactored into functions
    fetch('https://api-adresse.data.gouv.fr/search/?q='+ this.state.zipcode + '&postcode=' + this.props.params.zipcode)
    .then(response => {
      return response.json();
    }).then(json => {
      //on obtient un object json, si il est vide, on s'arrette la
      if (json.features.length === 0) {
        this.setState({error: 'Mauvais code postal, veuillez réessayer!'});
        return;
      }
      //sinon on extrait les coordonées pour les insérées dans la requette urlZoomApi
      var coordinates = json.features[0].geometry.coordinates;
      var urlZoomApi;

      // TODO: embedTags are no longer correctly handled: make sure they are
      let tags = [];
      if ('tags' in this.props.location.query) {
        tags = this.props.location.query.tags.split(',');
      }
      console.log(tags);

      // TODO: refactor this AJAX part to make it easier to follow
      //en fonction du type d'événement et des tags que l'on recherche on créé notre urlZoomApi
      if (this.props.params.itemType === 'groupes') {
        this.setState({resource: 'groups'});
        urlZoomApi = 'https://api.jlm2017.fr/groups?where={"coordinates":{"$near":{"$geometry":{"type":"Point","coordinates":[' + coordinates[0] + ',' + coordinates[1] + ']}, "$maxDistance": 10000}}';
        if (tags.length > 0)
          urlZoomApi += ',"tags": {"$elemMatch": {"$in": ' + JSON.stringify(tags) + '} }';
        urlZoomApi += '}';
      }
      else {
        this.setState({resource: 'events'});
        urlZoomApi = 'https://api.jlm2017.fr/events?where={"agenda": "evenements_locaux" ,"coordinates":{"$near":{"$geometry":{"type":"Point","coordinates":[' + coordinates[0] + ',' + coordinates[1] + ']}, "$maxDistance": 10000}}';
        if (tags.length > 0)
          urlZoomApi += ',"tags": {"$elemMatch": {"$in": ' + JSON.stringify(tags) + '} }';
        urlZoomApi += '}';
      }

      console.log(urlZoomApi);
      //une fois l'urlZoomApi obtenue, on lance getJson pour obtenir le JSON des événements qui nous intéréssent
      this.getJson(urlZoomApi);
    }).catch(() => {
      this.setState({error: 'Erreur serveur, veuillez réessayer plus tard! api'});
      //message d'erreur a coder dans l'application
    });
  }

  getJson(url) {
    //on execute la requette obtenue a la fin de getUrl
    fetch(url)
      .then(response => {
        return response.json();
      }).then(json => {
      //on assigne l" JSON obenu au composant et on declare que la phase d'initialisation est terminée
      this.setState({initialized: true, listEventJson: json});
    }).catch(() => {
      this.setState({error: 'Erreur serveur, veuillez réessayer plus tard!'});
      //message d'erreur a coder dans l'application
    });
  }

  componentDidMount() {
    this.getUrl();
  }

  componentDidUpdate() {
    // TODO: part of this should probably be in lifecycle method "willReceiveProps" instead of this one
    //si le zipcode enregistré dans le state est differant de celui de props on fait une nouvelle requette a l'api.
    if (this.props.params.zipcode !== this.state.zipcode || this.props.params.itemType !== this.state.typeEvent) {
      //on reaffect le nouveau zipcode au state et on remmet la propriété initialized a false.
      this.setState({zipcode: this.props.params.zipcode, initialized: false, error: null, value: null, typeEvent:this.props.params.itemType});
      this.getUrl();
    }
  }

  prevItem() {
    searchFor({
      itemType: this.props.params.itemType,
      zipcode: this.props.params.zipcode,
      page: ((+this.props.params.page) || 1) - 1
    });
  }

  nextItem() {
    searchFor({
      itemType: this.props.params.itemType,
      zipcode: this.props.params.zipcode,
      page: ((+this.props.params.page) || 1) + 1
    });
  }

  render() {
    //si error n'est pas null, on l'affiche
    if (this.state.error != null) {
      return <Error message={this.state.error} />;
    }

    //tant que la phase d'initialisation n'est pas terminée on affiche loading
    if (this.state.initialized === false) {
      return <Loading />;
    }

    if (this.state.listEventJson._items.length === 0) {
      return (
        <p className="text-center">
          Pas d'événement dans les environs du code postal renseigné
        </p>
      );
    }

    // une fois la pase d'initialisation terminée on affiche la liste des événements obtenue
    // TODO: this critical part is complicated to follow: refactor
    const indexNumber = this.props.params.page ? (+this.props.params.page) - 1 : 0;
    const listItems = this.state.listEventJson._items.slice((6 * indexNumber), ((6 * indexNumber) + 5)).map(eventItem => {
      var result = <div key={eventItem._id}><EventItem itemType={this.props.params.itemType} eventItem={eventItem} infoClick={this.infoClick}></EventItem> {eventItem !== this.state.listEventJson._items.slice((6 * this.state.index), ((6 * this.state.index) + 5))[this.state.listEventJson._items.slice((6 * this.state.index), ((6 * this.state.index) + 5)).length - 1] && <hr />}</div>;
      return (result);
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-2 text-center vertical-center">
            {indexNumber > 0 &&
              <div className="clickable-btn" onClick={()=>this.prevItem()}>
                  <img src={require('../img/prev.png')} alt="precedent"></img>
              </div>
            }
          </div>
          <div className="col-xs-8">
            {listItems}
            {this.state.listEventJson._items.length > 5 &&
              <p className="text-center">
                <small>Page&nbsp;: {indexNumber + 1} / {Math.floor(this.state.listEventJson._items.length / 6) + 1}</small>
              </p>
            }
          </div>
          <div className="col-xs-2 text-center vertical-center">
            {((6 * (indexNumber)) + 5) < this.state.listEventJson._items.length &&
              <div className="clickable-btn" onClick={()=>this.nextItem()}>
                <img src={require('../img/next.png')} alt="suivant"></img>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default EventList;
