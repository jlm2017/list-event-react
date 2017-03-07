import React from 'react';
import classNames from 'classnames';
import Datetime from 'react-datetime';
import CountrySelector from './CountrySelector';
import MarkdownEditor from './MarkdownEditor';

const HelpText = ({children}) => (
  <span className="help-block">{children}</span>
);

const renderField = (field, className) => ({input, label, type, meta: {touched, error, warning}}) => (
  <div className={classNames({'form-group': true, 'has-error': !!error})}>
    <label htmlFor={input.name}>{label}</label>
    {
      React.createElement(
        field,
        {
          ...input,
          placeholder: label,
          type: type,
          id: input.name,
          className
        }
      )
    }
    {touched && ((error && <HelpText>{error}</HelpText>) || (warning && <HelpText>{warning}</HelpText>))}
  </div>
);

/*
Ces définitions ne sont pas seulement là pour faire joli.
 */
export const renderInput = renderField('input', 'form-control');
export const renderDatetimePicker = renderField(Datetime);
export const renderMarkdownEditor = renderField(MarkdownEditor, 'form-control');
export const renderCountrySelector = renderField(CountrySelector, 'form-control');
