import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {Route} from 'react-router-dom'
import qs from 'query-string'


import './UI.css'
import FormNoZipcode from './FormNoZipcode.js'
import SearchTypeSelector from './SearchTypeSelector'
import {ITEM_TYPES, ITEM_TYPES_MAP} from '../conf'
import {searchFor} from '../actions/routing'
import SearchResults from './SearchResults'
import EventDisplay from './EventDisplay.js'


function TitleBar(props) {
  return (
    <h4 className="text-center">
      Recherche des {props.itemType} autour de chez vous
    </h4>
  );
}

class Ui extends Component {
  constructor(props) {
    super(props);

    this.zipcodeChange = this.zipcodeChange.bind(this);
    this.itemTypeChange = this.itemTypeChange.bind(this);
    this.searchFor = searchFor.bind(this);
  }

  zipcodeChange(zipcode) {
    this.searchFor({itemType: this.props.match.params.itemType, zipcode});
  }

  itemTypeChange(itemType) {
    this.searchFor({itemType, zipcode: this.props.match.params.zipcode});
  }

  render() {
    let item = ITEM_TYPES_MAP[this.props.match.params.itemType];
    // TODO: return 404 component if the itemType does not exist
    let displayTitle = item ? item.labelPlural : '';
    let showMenu = !('cacher-menu' in qs.parse(this.props.location.search));
    return (

      <div className="container">
        {showMenu &&
        <div>
          <TitleBar itemType={displayTitle}/>
          <FormNoZipcode onChange={this.zipcodeChange}/>
          <SearchTypeSelector itemType={this.props.match.params.itemType}
            itemTypes={ITEM_TYPES} onChange={this.itemTypeChange}/>
          <hr/>
        </div>
        }
        <div className="row">
          <Route path={`${this.props.match.path}/recherche/:zipcode/:page?`} component={SearchResults} />
          <Route path={`${this.props.match.path}/details/:id`} component={EventDisplay} />
        </div>
      </div>
    );
  }
}

export default withRouter(Ui);
