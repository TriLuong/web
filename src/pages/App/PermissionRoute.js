import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Route, Switch } from 'react-router-dom';
import ManageUser from 'pages/ManageUser';
import ManageLead from 'pages/ManageLead';
import LeadDetail from 'pages/LeadDetail';
import { makeGetUser } from './selectors';
/* eslint-disable */

/* ADMIN can access all pages, not depend on "role" in permisstionList below  */
const permisstionList = [
  {
    path: '/',
    component: ManageUser,
    role: 'admin',
  },
  {
    path: '/users',
    component: ManageUser,
    role: 'admin',
  },
  {
    path: '/leads',
    component: ManageLead,
    role: 'sale',
  },
  {
    path: '/lead-detail',
    component: LeadDetail,
    role: 'sale',
  },
];

const SectionRoute = ({ component, path, ...rest }) => (
  <Route path={path} component={component} {...rest} />
);

class PermissionRoute extends PureComponent {
  render() {
    const { user } = this.props;
    let roleRouteArr = [];

    if (user.role === 'admin') {
      roleRouteArr = permisstionList;
    } else {
      roleRouteArr = permisstionList.filter(route => route.role === user.role);
    }

    return (
      <Switch>
        {roleRouteArr.map((route, index) => {
          if (index === 0) {
            return <SectionRoute exact {...route} key={index} />;
          } else {
            return <SectionRoute {...route} key={index} />;
          }
        })}
      </Switch>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeGetUser(),
});

export default connect(mapStateToProps)(PermissionRoute);
