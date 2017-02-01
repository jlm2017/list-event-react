import React, {Component} from 'react'


import './App.css'
import FormNoZipcode from './FormNoZipcode.js'
import SearchTypeSelector from './SearchTypeSelector'
import {ITEM_TYPES} from './consts'
import {showQuery} from './actions'


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
    showQuery({itemType: this.props.params.itemType, zipcode, search: this.props.location.search});
  }

  itemTypeChange(itemType) {
    showQuery({itemType, zipcode: this.props.params.zipcode, search: this.props.location.search});
  }

  render() {
    let item = ITEM_TYPES.find((item) => (item.value === this.props.params.itemType));
    // TODO: return 404 component if the itemType does not exist
    let displayTitle = item ? item.label.toLowerCase() : "";
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
          <br/>
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
