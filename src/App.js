import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { withRouter } from "react-router";

class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <React.Fragment>
        <Route path='/auth' component={Auth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/'/>
      </React.Fragment>
    );

    if (this.props.isAuthenticate) {
      routes = (
        <React.Fragment>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/logout' component={Logout} />
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
 