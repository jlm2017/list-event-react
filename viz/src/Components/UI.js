import React, {Component} from 'react'


import './UI.css'
import FormNoZipcode from './FormNoZipcode.js'
import SearchTypeSelector from './SearchTypeSelector'
import {ITEM_TYPES, ITEM_TYPES_MAP} from '../conf'
import {searchFor} from '../actions/routing'


function TitleBar(props) {
  return <h4 className="text-center">
    Recherche des {props.itemType} autour de chez vous
  </h4>;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.zipcodeChange = this.zipcodeChange.bind(this);
    this.itemTypeChange = this.itemTypeChange.bind(this);
  }

  zipcodeChange(zipcode) {
    searchFor({itemType: this.props.params.itemType, zipcode});
  }

  itemTypeChange(itemType) {
    searchFor({itemType, zipcode: this.props.params.zipcode});
  }

  render() {
    let item = ITEM_TYPES_MAP[this.props.params.itemType];
    // TODO: return 404 component if the itemType does not exist
    let displayTitle = item ? item.labelPlural : '';
    let showMenu = !('cacher-menu' in this.props.location.query);
    return (

      <div className="container">
        {showMenu &&
        <div>
          <TitleBar itemType={displayTitle}/>
          <FormNoZipcode onChange={this.zipcodeChange}/>
          <SearchTypeSelector itemType={this.props.params.itemType} itemTypes={ITEM_TYPES}
                              onChange={this.itemTypeChange}/>
          <hr/>
        </div>
        }
        <div className="row">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
