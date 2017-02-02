import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRedirect} from 'react-router'

// TODO: review names of components
import App from './App'
import EventList from './EventList'
import EventDisplay from './EventDisplay.js'
import './index.css'
import {HISTORY_HANDLER} from './consts'


function Wrapper(props) {
  return <div>
    {props.children}
  </div>
}

// TODO: add 404 component

document.title = 'JLM 2017';
ReactDOM.render(
  <Router history={HISTORY_HANDLER}>
    <Route path="/" component={Wrapper}>
      <IndexRedirect to="/groupes" />
      <Route path=":itemType" component={App} >
        <Route path="recherche/:zipcode(/:page)" component={EventList} />
        <Route path="details/:id" component={EventDisplay} />
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
