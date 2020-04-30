import React, { Component } from 'react';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import * as actions from './store/actions/index';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Logout from './containers/Auth/Logout/Logout';
import { withRouter } from "react-router";

// Lazy loaded component
const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

// Lazy loaded component
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

// Lazy loaded component
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <React.Fragment>
        <Route path='/auth' component={asyncAuth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/'/>
      </React.Fragment>
    );

    if (this.props.isAuthenticate) {
      routes = (
        <React.Fragment>
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
          <Route path='/logout' component={Logout} />
          <Route path='/auth' component={asyncAuth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/'/>
        </React.Fragment>
      );
    }
    return (
      <div>
          <Layout>
            <Switch>
              {routes}
            </Switch>
          </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticate: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App)); 
 