import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeMirror from 'react-codemirror';

import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css';

import './MarkdownEditor.css';

export default function MarkdownEditor(input) {
  const {value, onChange, onFocus, onBlur, name} = input;

  const onFocusChange = (focus) => (focus ? onFocus() : onBlur());

  const options = {
    mode: 'markdown',
    lineWrapping: true,
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <CodeMirror value={value} onChange={onChange} onFocusChange={onFocusChange} path={name}
                    options={options} preserveScrollPosition={true}/>
      </div>
      <div className="col-md-6">
        <div className="panel panel-default previsualisation">
          <div className="panel-heading">Prévisualisation</div>
          <div className="panel-body">
            <ReactMarkdown source={value}/>
          </div>
        </div>
      </div>
    </div>
  );
}
