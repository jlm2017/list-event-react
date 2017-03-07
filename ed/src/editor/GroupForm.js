import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {renderInput, renderCountrySelector, renderMarkdownEditor} from './widgets/fields';

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


function GroupFormView(props) {
  const {handleSubmit} = props;
  return <form onSubmit={handleSubmit}>
    <fieldset>
      <FormRow>
        <Field name="name" component={renderInput} label="Nom du groupe d'appui"/>
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
      <legend>Lieu de réunion habituel</legend>
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
        <Field name="description" component={renderMarkdownEditor} label="Description, incluant un itinéraire" />
      </FormRow>
    </fieldset>
    <input className="submit-button btn btn-primary" name="commit" value="Sauvegarder" type="submit" />
  </form>
}


const GroupEditor = reduxForm({
  form: 'groupEditor'
})(GroupFormView);

export default GroupEditor;
