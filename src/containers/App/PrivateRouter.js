import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import RouterNames from './RouterNames';

/* eslint react/prop-types: 0 */
const PrivateRouter = ({ component: Component, ...rest }) => {
  const isAuthen = JSON.parse(localStorage.getItem('userInfo'));
  console.log(isAuthen);
  return (
    <Route
      {...rest}
      render={props => (isAuthen ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: RouterNames.login.path }} />
      ))
      }
    />
  );
};

export default PrivateRouter;
