import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import Spinner from 'react-spinkit';
import {requestItem, enterEditor, leaveEditor, EDITOR_REQUEST_NONE} from './ducks';
import {renderInput, renderCountrySelector, renderDatetimePicker, renderMarkdownEditor} from './widgets/fields';

import 'react-datetime/css/react-datetime.css';


// Pour le traitement des dates
function formatDate(utcdatestring) {
  return new Date(utcdatestring);
}
function normalizeDate(date) {
  return date.toDate().toUTCString();
}


function FormRow({children}) {
  // props.children.length should be 1, 2, 3, 4 or 6
  if (Array.isArray(children)) {
    const colWidth = 12 / children.length;
    const colClass = `col-md-${colWidth}`;

    return <div className="row">
      {
        children.map((field, i) => (
            <div className={colClass} key={i}>
              {field}
            </div>
          )
        )
      }
    </div>;
  } else {
    return children;
  }
}


function EventFormView(props) {
  const {handleSubmit} = props;
  return <form onSubmit={handleSubmit}>
    <fieldset>
      <FormRow>
        <Field name="name" component={renderInput} label="Titre de l'événement"/>
      </FormRow>
      <FormRow>
        <Field name="startTime" component={renderDatetimePicker} format={formatDate} normalize={normalizeDate}
               label="Début"/>
        <Field name="endTime" component={renderDatetimePicker} format={formatDate} normalize={normalizeDate}
               label="Fin"/>
      </FormRow>
      <FormRow>
        <Field name="timezone" component={renderInput} label="Fuseau horaire"/>
        <Field name="capacity" component={renderInput} label="Capacité maximum"/>
      </FormRow>
    </fieldset>
    <fieldset>
      <legend>Informations de contact</legend>
      <FormRow>
        <Field name="contact.name" component={renderInput} label="Nom" />
      </FormRow>
      <FormRow>
        <Field name="contact.email" component={renderInput} label="Email" />
        <Field name="contact.phone" component={renderInput} label="Téléphone" />
      </FormRow>
    </fieldset>
    <fieldset>
      <legend>Lieu</legend>
      <FormRow>
        <Field name="location.name" component={renderInput} label="Nom du lieu" />
      </FormRow>
      <FormRow>
        <Field name="location.country_code" component={renderCountrySelector} label="Pays" />
      </FormRow>
      <FormRow>
        <Field name="location.address1" component={renderInput} label="Adresse" />
      </FormRow>
      <FormRow>
        <Field name="location.address2" component={renderInput} label="Adresse 2" />
      </FormRow>
      <FormRow>
        <Field name="location.zip" component={renderInput} label="Code postal" />
        <Field name="location.city" component={renderInput} label="Ville" />
      </FormRow>
      <FormRow>
        <Field name="description" component={renderMarkdownEditor} label="Description" />
      </FormRow>
    </fieldset>
    <input className="submit-button btn btn-primary" name="commit" value="Sauvegarder" type="submit" />
  </form>
}


const EventForm = reduxForm({
  form: 'eventEditor'
})(EventFormView);


class EventEditor extends React.Component {

  dispatchAll() {
    console.log("Let's update baby");
    if (this.props.item === null && this.props.request === EDITOR_REQUEST_NONE) {
      this.props.requestItem();
    }
    if (!this.props.entered && this.props.item !== null) {
      this.props.enterEditor(this.props.item);
    }
  }

  componentDidMount() {
    this.dispatchAll();
  }

  componentDidUpdate() {
    this.dispatchAll();
  }

  componentWillUnmount() {
    this.props.leaveEditor();
  }

  render() {
    if (this.props.entered) {
      return <div className="container">
        <EventForm initialValues={this.props.initial}/>
      </div>
    } else {
      return <Spinner spinnerName='three-bounce' noFadeIn/>;
    }
  }
}

function mapStateToProps(state, props) {
  const {itemType, id} = props.params;
  const {initial, request, entered} = state.editor[itemType];
  const item = state.api[itemType][id] || null;
  return {
    itemType,
    id,
    item,
    initial,
    request,
    entered
  }
}

function mapDispatchToProps(dispatch, props) {
  const {itemType, id} = props.params;

  return {
    requestItem: () => dispatch(requestItem(itemType, id)),
    enterEditor: (item) => dispatch(enterEditor(itemType, item)),
    leaveEditor: () => dispatch(leaveEditor(itemType))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EventEditor);
