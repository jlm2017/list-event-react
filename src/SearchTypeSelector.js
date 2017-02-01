import React, {Component} from 'react';

function SearchTypeRadio(props) {
  return <div className="radio col-xs-6">
    <label className="radio-inline">
      <input type="radio" value={props.itemValue} onChange={props.onChange}
             checked={props.selected}/>
      &nbsp;{props.itemLabel}
    </label>
  </div>
}

/** React component used to select the kind of items one wants to search: events or groups */
class SearchTypeSelector extends Component {
  /*
   * Create a SearchTypeSelector
   * @param {Object} props - The react properties of this component
   */

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return <div className="row">
      <form className="form-inline col-responsive">
        {
          this.props.itemTypes.map((item) => (
            <SearchTypeRadio itemValue={item.value} itemLabel={item.label} onChange={this.handleChange}
                             selected={this.props.itemType === item.value} key={item.value} />
          ))
        }
      </form>
    </div>
  }
}

export default SearchTypeSelector;
