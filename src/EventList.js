'use strict';

import React, { Component } from 'react';
import 'whatwg-fetch';
import EventItem from './EventItem.js'


class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      listEventJson: null,
    };
  }

  getUrl() {
    //on recupère sur api-adresse.data.gouv.fr les coordonnées du code postale passé en parramétre d'url
    fetch('https://api-adresse.data.gouv.fr/search/?q='+ this.props.zipcode + '&postcode=' + this.props.zipcode)
    .then(response => {
      return response.json();
    }).then(json => {
      //on obtient un object json, si il est vide, on s'arrette la
      if (json.features.length == 0) return;
      //sinon on extrait les coordonées pour les insérées dans la requette urlZoomApi
      var coordinates = json.features[0].geometry.coordinates;
      var urlZoomApi;
      //en fonction du type d'événement et des tags que l'on recherche on créé notre urlZoomApi
      if (this.props.embedeventtype.split(',')[0] == 'groups'){
        urlZoomApi = 'https://api.jlm2017.fr/groups?where={"coordinates":{"$near":{"$geometry":{"type":"Point","coordinates":['+coordinates[0]+','+coordinates[1]+']}, "$maxDistance": 10000}}';
        if (this.props.embedTags != '')
          urlZoomApi += ',"tags": {"$elemMatch": {"$in": ' + JSON.stringify(this.props.embedTags) + '} }';
        urlZoomApi += '}';
      }
      else {
        urlZoomApi = 'https://api.jlm2017.fr/events?where={"agenda": "' + this.props.embedeventtype.split(',')[0] + '" ,"coordinates":{"$near":{"$geometry":{"type":"Point","coordinates":['+coordinates[0]+','+coordinates[1]+']}, "$maxDistance": 10000}}';
        if (this.props.embedTags != '')
          urlZoomApi += ',,"tags": {"$elemMatch": {"$in": ' + JSON.stringify(this.props.embedTags) + '} }';
        urlZoomApi += '}';
      }
      //une fois l'urlZoomApi obtenue, on lanche getJson pour obtenir le JSON des événements qui nous intéréssent
      this.getJson(urlZoomApi);
    }).catch(function(ex) {
      //message d'erreur a coder dans l'application
    });
  }

  getJson(url) {
    //on execute la requette obtenue a la fin de getUrl
    fetch(url)
    .then(response => {
      return response.json();
    }).then(json =>{
      //on assigne l" JSON obenu au composant et on declare que la phase d'initialisation est terminée
      this.setState({initialized: true, listEventJson: json});
    }).catch(function(ex) {
      //message d'erreur a coder dans l'application
    });
  }

  componentDidMount() {
    this.getUrl();
  }

  render() {
    //tant que la phase d'initialisation n'est pas terminée on affiche loading
    if (this.state.initialized === false) {
      return (
        <div> loading </div>
      );
    }
    // une fois la pase d'initialisation terminée on affiche la liste des événements obtenue
    const listItems = this.state.listEventJson._items.map(eventItem => {
      var result = <div><EventItem key={eventItem._id} eventItem={eventItem}></EventItem> {eventItem !== this.state.listEventJson._items[this.state.listEventJson._items.length - 1] && <hr />}</div>;
      return (result);
    });
    return (
      <div>
        {listItems}
      </div>
    );
  }
}

export default EventList;
