import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import './App.css';
import UI from './UI'
import Welcome from './Welcome'
import List from '../list/List';
import EventEditor from '../editor/EventEditor';

function App(props) {
  return (
    <Router history={hashHistory}>
      <Route component={UI} path="/">
        <IndexRoute component={Welcome} />
        <Route component={EventEditor} path="/evenements/:id" />
        <Route component={List} path="/:itemType" />
      </Route>
    </Router>
  );
}

export default App;
