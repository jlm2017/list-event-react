import ClientOAuth2 from 'client-oauth2'
import Cookies from 'universal-cookie';
import React, {Component} from 'react'
import {withRouter} from 'react-router'

import {OAUTH, API_ENDPOINT} from '../conf'

const cookies = new Cookies();
const auth = new ClientOAuth2(Object.assign(OAUTH, {
  redirectUri: `${window.location.protocol}//${window.location.host}/#/oauth_callback`,
  scopes: ['view_profile'],
}));


export class CallbackHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    var user = await auth.code.getToken(window.location.href);
    cookies.set('accessToken', user.accessToken);

    if (cookies.get('authRedirect')) {
      window.location.href = cookies.get('authRedirect');
    }
  }

  render() {
    return null;
  }
}

export default withRouter(class Authenticate extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.componentDidMount = this.componentDidMount.bind(this)
    this.authenticate = this.authenticate.bind(this);
  }

  async componentDidMount() {
    const accessToken = cookies.get('accessToken');

    if (accessToken) {
      var res = await fetch(`${API_ENDPOINT}/people/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (res.status === 200) {
        this.setState({authenticated: true, user: await res.json()});
        cookies.set('userEmail', this.state.user.email);
        return;
      }
    }

    return this.setState({authenticated: false});
  }

  async authenticate() {
    cookies.set('authRedirect', window.location.href);
    window.location = auth.code.getUri();
  }

  render() {
    if (this.state.authenticated) {
      return this.props.children;
    }

    if (this.state.authenticated === false) {
      return (
        <button className="btn btn-primary" onClick={this.authenticate}>Connexion</button>
      );
    }

    return null;
  }
});
