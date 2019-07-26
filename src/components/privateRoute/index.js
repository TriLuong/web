import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeGetToken } from 'pages/Login/selectors';

const PrivateRoute = ({ component: Component, token, ...rest }) => (
  <Route
    {...rest}
    render={props => (token ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location },
        }}
      />
    ))
    }
  />
);
const mapStateToProps = createStructuredSelector({
  token: makeGetToken() || '',
});

export default connect(mapStateToProps)(PrivateRoute);
