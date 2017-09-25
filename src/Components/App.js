import React from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import {CallbackHandler} from './Authenticate'

import UI from './UI'

export default function App(props) {
  return (
    /**
     * Right now, we use hashHistory to allow compatibility with github pages.
     * browserHistory would be prettier and more standard, but requires specific
     * configuration of the web server, which cannot be done with gh-pages.
     */
    <HashRouter>
      <Switch>
        <Route exact path="/oauth_callback" component={CallbackHandler} />
        <Route path="/:itemType" component={UI} />
        <Route exact path="/" render={() => <Redirect to="/groupes/" />} />
      </Switch>
    </HashRouter>
  );
}
