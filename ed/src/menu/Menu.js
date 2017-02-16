import React from 'react';
import {Link} from 'react-router';

import logo from './logo-orange-bleu.png'

export default function Menu(props) {
  return (
    <nav className="navbar navbar-default navbar-static-top" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#menu-collapse">
            <span className="sr-only">Activer la navigation</span>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
          </button>

          <a className="navbar-brand" href="/"><img alt="Logo Jean-Luc Mélenchon" src={logo}/></a>

        </div>
        <div id="menu-collapse" className="collapse navbar-collapse">
          <ul id="menu-menu-principal" className="nav navbar-nav navbar-right">
            <li><Link to="/">Mes événements</Link></li>
            <li><Link to="/">Mes groupes</Link></li>
            <li><Link to="/">Mon profil</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}