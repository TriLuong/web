import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RouterNames from './RouterNames';
import PrivateRouter from './PrivateRouter';
import Login from '../Login';
import ManageUser from '../ManageUser';

const myRouter = () => (
  <Switch>
    <Route exact path={RouterNames.login.path} component={Login} />
    <PrivateRouter path={RouterNames.manageUser.path} component={ManageUser} />
  </Switch>
);

export default myRouter;
