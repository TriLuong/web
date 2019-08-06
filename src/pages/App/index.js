/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { LayoutBlank } from 'layouts';
import PrivateRoute from 'components/privateRoute';
import Login from 'pages/Login';
import injectReducer from 'utils/injectReducer';
import Loader from 'pages/Loader';
import PermissionRoute from './PermissionRoute';
import reducer from './reducer';

const App = () => (
  <LayoutBlank>
    <Helmet titleTemplate="%s - DesignCafe" defaultTitle="DesignCafe">
      <meta name="description" content="DesignCafe" />
    </Helmet>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/password-verify/:token" component={Login} />
      <PrivateRoute exact path="" component={PermissionRoute} />
    </Switch>
    <Loader />
  </LayoutBlank>
);

const withReducer = injectReducer({ key: 'rootReducer', reducer });

export default compose(withReducer)(App);
