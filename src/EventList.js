import React, { Component } from 'react';
import 'whatwg-fetch';
import EventItem from './EventItem.js';


class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      zipcode: this.props.zipcode,
      initialized: false,
      requestError: false,
      listEventJson: null,
      value: null,
      index: 0,
    };

    this.infoClick = this.infoClick.bind(this);
  }

  infoClick(value) {
    this.setState({value: value});
  }

  clickBack() {
    this.setState({value: null});
  }

  getUrl() {
    //on recupère sur api-adresse.data.gouv.fr les coordonnées du code postal passé en parramétre d'url
    fetch('https://api-adresse.data.gouv.fr/search/?q='+ this.state.zipcode + '&postcode=' + this.props.zipcode)
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
      //en fonction du type d'événement et des tags que l'on recherche on créé notre urlZoomApi
      if (this.props.embedeventtype.split(',')[0] === 'groups'){
        urlZoomApi = 'https://api.jlm2017.fr/groups?where={"coordinates":{"$near":{"$geometry":{"type":"Point","coordinates":['+coordinates[0]+','+coordinates[1]+']}, "$maxDistance": 10000}}';
        if (this.props.embedTags[0] !== '')
          urlZoomApi += ',"tags": {"$elemMatch": {"$in": ' + JSON.stringify(this.props.embedTags) + '} }';
        urlZoomApi += '}';
      }
      else {
        urlZoomApi = 'https://api.jlm2017.fr/events?where={"agenda": "' + this.props.embedeventtype.split(',')[0] + '" ,"coordinates":{"$near":{"$geometry":{"type":"Point","coordinates":['+coordinates[0]+','+coordinates[1]+']}, "$maxDistance": 10000}}';
        if (this.props.embedTags[0] !== '')
          urlZoomApi += ',"tags": {"$elemMatch": {"$in": ' + JSON.stringify(this.props.embedTags) + '} }';
        urlZoomApi += '}';
      }
      //une fois l'urlZoomApi obtenue, on lance getJson pour obtenir le JSON des événements qui nous intéréssent
      this.getJson(urlZoomApi);
    }).catch(() => {
      this.setState({error: 'Erreur serveur, veuillez réessayer plus tard!'});
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
    }).catch(() => {
      this.setState({error: 'Erreur serveur, veuillez réessayer plus tard!'});
      //message d'erreur a coder dans l'application
    });
  }

  componentDidMount() {
    this.getUrl();
  }

  componentDidUpdate() {
    //si le zipcode enregistré dans le state est differant de celui de props on fait une nouvelle requette a l'api.
    if (this.props.zipcode !== this.state.zipcode) {
      //on reaffect le nouveau zipcode au state et on remmet la propriété initialized a false.
      this.setState({zipcode: this.props.zipcode, initialized: false, error: null, value: null});
      this.getUrl();
    }
  }

  prevItem() {
    this.setState({index: this.state.index - 1});
  }

  nextItem() {
    this.setState({index: this.state.index + 1});
  }

  render() {
    if (this.state.value !== null) {
      return (
        <div>
          <div className="row">
            <h3 className="col-xs-10"> <a href={`http://jlm2017.fr/${this.state.value.path}`} target="_blank">{this.state.value.name}</a></h3>
            <a className="col-xs-2 btn btn-primary custom-btn" onClick={()=>this.clickBack()}>Retour</a>
          </div>
          <hr />
          {this.state.value.description &&
            <div>
              <div className="intro">{this.state.value.description}</div>
              <hr />
            </div>
          }
          <h5>Adresse&nbsp;:</h5>
          <h6>{this.state.value.location.name}</h6>
          <p>{this.state.value.location.address}</p>
          <a href={`http://maps.google.com/?q=${this.state.value.location.address}`} target="_blank">
            Carte et itinéraires
          </a>
          <hr />
          <h5>
            Contact&nbsp;:
          </h5>
          <div><strong>Nom de l'initiatrice ou de l'initiateur&nbsp;:</strong> {this.state.value.contact.name}</div>
          {this.state.value.contact.email && <div><strong>Email&nbsp;:</strong> {this.state.value.contact.email} </div> }
          {this.state.value.contact.phone && <div><strong>Téléphone&nbsp;:</strong> 0{this.state.value.contact.phone} </div> }
          <hr />
          <h4>
            Nombre de participants&nbsp;: {this.state.value.participants}
          </h4>
        </div>
      );
    }
    //si error n'est pas null, on l'affiche
    if (this.state.error != null) {
      return (
        <h4 className="text-center">{this.state.error}</h4>
      );
    }

    //tant que la phase d'initialisation n'est pas terminée on affiche loading
    if (this.state.initialized === false) {
      return (
        <p className="text-center">
          Chargement
        </p>
      );
    }

    if (this.state.listEventJson._items.length === 0) {
      return (
        <p className="text-center">
          Pas d'événement dans les environs du code postal renseigné
        </p>
      );
    }

    // une fois la pase d'initialisation terminée on affiche la liste des événements obtenue
    const listItems = this.state.listEventJson._items.slice((6 * this.state.index), ((6 * this.state.index) + 5)).map(eventItem => {
      var result = <div key={eventItem._id}><EventItem eventItem={eventItem} infoClick={this.infoClick}></EventItem> {eventItem !== this.state.listEventJson._items.slice((6 * this.state.index), ((6 * this.state.index) + 5))[this.state.listEventJson._items.slice((6 * this.state.index), ((6 * this.state.index) + 5)).length - 1] && <hr />}</div>;
      return (result);
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-2 text-center vertical-center">
            {this.state.index > 0 &&
              <div className="clicable-btn" onClick={()=>this.prevItem()}>
                  <img src={require('../img/prev.png')} alt="precedent"></img>
              </div>
            }
          </div>
          <div className="col-xs-8">
            {listItems}
            {this.state.listEventJson._items.length > 5 &&
              <p className="text-center">
                <small>Page&nbsp;: {this.state.index + 1} / {Math.floor(this.state.listEventJson._items.length / 6) + 1}</small>
              </p>
            }
          </div>
          <div className="col-xs-2 text-center vertical-center">
            {((6 * (this.state.index)) + 5) < this.state.listEventJson._items.length &&
              <div className="clicable-btn" onClick={()=>this.nextItem()}>
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
