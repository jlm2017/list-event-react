import React, {Component} from 'react';

class FormNoZipcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.props.onChange(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="row">
        <div className="col-responsive">
          <form className="form-group" onSubmit={this.handleSubmit}>
            <div className="input-group">
              <input className="form-control" type="text" value={this.state.value} placeholder="Code postal"
                     onChange={this.handleChange}/>
              <div className="input-group-btn">
                <input className="btn btn-primary" type="submit" value="Rechercher"/>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default FormNoZipcode;
