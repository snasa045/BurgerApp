import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';

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
const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

// Lazy loaded component
const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

// Lazy loaded component
const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const App = props => {
  useEffect(() => {
    props.onTryAutoSignup();
  }, []);

    let routes = (
      <React.Fragment>
        <Route path='/auth' render={(props) => <Auth {...props}/>}/>
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/'/>
      </React.Fragment>
    );

    if (props.isAuthenticate) {
      routes = (
        <React.Fragment>
          <Route path='/checkout' render={(props) => <Checkout {...props}/>}/>
          <Route path='/orders' render={(props) => <Orders {...props}/>}/>
          <Route path='/logout' component={Logout} />
          <Route path='/auth' render={(props) => <Auth {...props}/>}/>
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/'/>
        </React.Fragment>
      );
    }
    return (
      <div>
          <Layout>
            <Suspense fallback={<p>Loading...</p>}>
              <Switch>
                {routes}
              </Switch>
            </Suspense>
          </Layout>
      </div>
    );
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
 