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
import Login from 'pages/Login';
import ManageUser from 'pages/ManageUser';
import ManageLead from 'pages/ManageLead';
import LeadDetail from 'pages/LeadDetail';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

const App = () => (
  <LayoutBlank>
    <Helmet titleTemplate="%s - DesignCafe" defaultTitle="DesignCafe">
      <meta name="description" content="DesignCafe" />
    </Helmet>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/user" component={ManageUser} />
      <Route path="/lead" component={ManageLead} />
      <Route path="/lead-detail" component={LeadDetail} />
      {/* <Route path="" component={NotFoundPage} /> */}
    </Switch>
  </LayoutBlank>
);

const withReducer = injectReducer({ key: 'rootReducer', reducer });

export default compose(
  withReducer,
)(App);
