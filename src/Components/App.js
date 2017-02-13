import React from 'react'
import {Router, Route, IndexRedirect} from 'react-router'

import {HISTORY_HANDLER} from '../conf'
import UI from './UI'
import SearchResults from './SearchResults'
import EventDisplay from './EventDisplay.js'

function Wrapper(props) {
  return <div>
    {props.children}
  </div>
}

export default function App(props) {
  return <Router history={HISTORY_HANDLER}>
    <Route path="/" component={Wrapper}>
      <IndexRedirect to="/groupes"/>
      <Route path=":itemType" component={UI}>
        <Route path="recherche/:zipcode(/:page)" component={SearchResults}/>
        <Route path="details/:id" component={EventDisplay}/>
      </Route>
    </Route>
  </Router>;
}
