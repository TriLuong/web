/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

/* eslint import/no-cycle: 0 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { LayoutBlank } from 'layouts';
import PrivateRoute from 'components/privateRoute';
import Login from 'pages/Login';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Loader from 'pages/Loader';
import PermissionRoute from './PermissionRoute';
import reducer from './reducer';
import saga from './saga';
import { getBranches } from './actions';
import { makeGetToken } from './selectors';

type Props = {
  token: String,
  doGetBranches: () => {},
};
class App extends React.PureComponent<Props> {
  componentDidMount() {
    const { token, doGetBranches } = this.props;
    if (token) {
      doGetBranches();
    }
  }

  render() {
    return (
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
  }
}

const withReducer = injectReducer({ key: 'rootReducer', reducer });
const withSaga = injectSaga({ key: 'rootSaga', saga });
const mapStateToProps = createStructuredSelector({
  token: makeGetToken() || '',
});

const mapDispatchToProps = dispatch => ({
  doGetBranches: evt => dispatch(getBranches(evt)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(App);
