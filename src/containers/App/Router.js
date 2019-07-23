import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RouterNames from './RouterNames';
import Login from '../Login';
import ManageUser from '../ManageUser';

const myRouter = () => (
  <Switch>
    <Route exact path={RouterNames.login.path} component={Login} />
    <Route path={RouterNames.manageUser.path} component={ManageUser} />
  </Switch>
);

export default myRouter;
