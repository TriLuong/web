import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import RouterNames from './RouterNames';
import PrivateRouter from './PrivateRouter';
import Login from '../Login';
import ManageUser from '../ManageUser';
import history from '../../utils/history';

const myRouter = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path={RouterNames.login.path} component={Login} />
      <PrivateRouter
        path={RouterNames.manageUser.path}
        component={ManageUser}
      />
    </Switch>
  </ConnectedRouter>
);

export default myRouter;
