import React from 'react';
import {Field, reduxForm} from 'redux-form';
import Datetime from 'react-datetime';
import classNames from 'classnames';

import 'react-datetime/css/react-datetime.css';

function FormRow({children}) {
  // props.children.length should be 1, 2, 3, 4 or 6
  if (Array.isArray(children)) {
    const colWidth = 12 / children.length;
    const colClass = `col-md-${colWidth}`;

    return <div className="row">
      {
        children.map((field) => (
            <div className={colClass}>
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

const HelpText = ({children}) => (
  <span className="help-block">{children}</span>
);

const renderDatetimePicker = ({input, placeholder, defaultValue, label, meta: {touched, error, warning}}) => (
  <div className="form-group">
    <label>{label}</label>
    <Datetime {...input} />
    {touched && ((error && <HelpText>{error}</HelpText>) || (warning && <HelpText>{warning}</HelpText>))}
  </div>
);

const renderInput = ({input, label, type, meta: {touched, error, warning}}) => (
  <div className={classNames({'form-group': true, 'has-error': !!error})}>
    <label for={input.name}>{label}</label>
    <input {...input} placeholder={label} type={type} id={input.name} className="form-control"/>
    {touched && ((error && <HelpText>{error}</HelpText>) || (warning && <HelpText>{warning}</HelpText>))}
  </div>
);


function EventFormView(props) {
  const {handleSubmit} = props;
  return <form onSubmit={handleSubmit}>
    <fieldset>
      <FormRow>
        <Field name="name" component={renderInput} label="Titre de l'événement"/>
      </FormRow>
      <FormRow>
        <Field name="startDate" component={renderDatetimePicker} label="Début"/>
        <Field name="endDate" component={renderDatetimePicker} label="Fin"/>
      </FormRow>
      <FormRow>
        <Field name="timezone" component={renderInput} label="Fuseau horaire"/>
        <Field name="capacity" component={renderInput} label="Capacité maximum"/>
      </FormRow>
    </fieldset>
  </form>
}

const EventForm = reduxForm({
  form: 'eventEditor'
})(EventFormView);


class EventEditor extends React.Component {

  render() {
    return <div className="container">
      <EventForm />
    </div>
  }
}

export default EventEditor
