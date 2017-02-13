import React, {Component} from 'react';

import {searchFor, showDetails} from '../actions/routing'
import {Loading, Error} from '../utils'
import {NB_ITEMS_PER_PAGE, ITEM_TYPES_MAP} from '../conf'
import {fetchZipCodeCoordinates, fetchCloseItems} from '../actions/api'
import EventList from './EventList'
import {NetworkError, BadDataError, EntityNotFoundError} from '../errors'

function PageChangeButton(props) {
  const {action, image, role} = props;
  return (
    <div className="col-xs-2 text-center">
      <div className="clickable-btn" onClick={action}>
        <img src={image} alt={role}/>
      </div>
    </div>
  );
}

function EmptyColumn(props) {
  return <div className="col-xs-2"/>;
}

function SearchResults(props) {
  const {events, page, totalPages, onDetails, onPrevPage, onNextPage} = props;

  return (
    <div className="container">
      <div className="row vertical-center">
        {page > 1
          ? <PageChangeButton action={onPrevPage} image={require('../../img/prev.png')} role="Précédent"/>
          : <EmptyColumn/>
        }
        <EventList events={events} currentPage={page} totalPages={totalPages} onDetails={onDetails}/>
        {page < totalPages
          ? <PageChangeButton action={onNextPage} image={require('../../img/next.png')} role="Suivant"/>
          : <EmptyColumn/>
        }
      </div>
    </div>
  );

}


export default class SearchResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeEvent: '',
      error: null,
      zipcode: this.props.params.zipcode,
      initialized: false,
      requestError: false,
      items: null,
      resource: '',
    };

    this.eventInfo = this.eventInfo.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  eventInfo(value) {
    showDetails({itemType: this.props.params.itemType, id: value._id, search: this.props.location.search});
  }

  prevPage() {
    searchFor({
      itemType: this.props.params.itemType,
      zipcode: this.props.params.zipcode,
      page: ((+this.props.params.page) || 1) - 1
    });
  }

  nextPage() {
    searchFor({
      itemType: this.props.params.itemType,
      zipcode: this.props.params.zipcode,
      page: ((+this.props.params.page) || 1) + 1
    });
  }

  getUrl() {
    fetchZipCodeCoordinates(this.props.params.zipcode)
      .then((coordinates) => {
        const tags = 'tags' in this.props.location.query ? this.props.location.query.tags.split(',') : null;
        const tag_options = tags ? {tags: {"$elemMatch": {"$in": JSON.stringify(tags)}}} : {};
        const itemTypeConfig = ITEM_TYPES_MAP[this.props.params.itemType];

        return fetchCloseItems(
          itemTypeConfig.apiName,
          coordinates,
          {...itemTypeConfig.searchOptions, ...tag_options}
        )
      })
      .then((items) => {
        this.setState({initialized: true, items: items});
      })
      .catch((err) => {
        // catch both errors from fetchZipCodeCoordinates and errors from fetchCloseItems
        let errorMessage;
        if (err instanceof NetworkError) {
          errorMessage = 'Un problème de connexion est survenu. Vérifier que vous êtes bien connecté à Internet.';
        } else if (err instanceof BadDataError) {
          errorMessage = 'Un problème de communication avec le serveur a été rencontré. Réessayez plus tard.';
        } else if (err instanceof EntityNotFoundError) {
          // fetchCloseItems should never throw EntityNotFoundError, thus it should come from fetchZipCodeCoordinates
          errorMessage = 'Ce code postal n\'existe pas !';
        } else {
          errorMessage = 'Une erreur inconnue est survenue';
        }

        console.log(err);
        this.setState({error: errorMessage, items: null});
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
      this.setState({
        zipcode: this.props.params.zipcode,
        initialized: false,
        error: null,
        value: null,
        typeEvent: this.props.params.itemType
      });
      this.getUrl();
    }
  }

  render() {
    //si error n'est pas null, on l'affiche
    if (this.state.error != null) {
      return <Error message={this.state.error}/>;
    }

    //tant que la phase d'initialisation n'est pas terminée on affiche loading
    if (this.state.initialized === false) {
      return <Loading />;
    }

    if (this.state.items.length === 0) {
      return (
        <p className="text-center">
          Pas d'événement dans les environs du code postal renseigné
        </p>
      );
    }

    // une fois la pase d'initialisation terminée on affiche la liste des événements obtenue
    const page = this.props.params.page ? +this.props.params.page : 1;
    const all_events = this.state.items;

    const totalPages = Math.ceil(all_events.length / NB_ITEMS_PER_PAGE);
    const currentEvents = all_events.slice((page - 1) * NB_ITEMS_PER_PAGE, page * NB_ITEMS_PER_PAGE);

    return <SearchResults events={currentEvents} page={page} totalPages={totalPages}
                          onDetails={this.eventInfo} onPrevPage={this.prevPage} onNextPage={this.nextPage}/>;
  }
}
