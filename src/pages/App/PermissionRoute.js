/* eslint import/no-cycle: 0 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Route, Switch } from 'react-router-dom';
import ManageUser from 'pages/ManageUser';
import ManageLead from 'pages/ManageLead';
import LeadDetail from 'pages/LeadDetail';
import Designer from 'pages/Designer';
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
    path: '/lead-detail/:id',
    component: LeadDetail,
    role: 'sale',
  },
  {
    path: '/designer',
    component: Designer,
    role: 'designer',
  },
];

const SectionRoute = ({ component, path, ...rest }) => (
  <Route path={path} component={component} {...rest} />
);

class PermissionRoute extends PureComponent {
  roleRoutes = role => {
    if (role === 'admin') {
      return permisstionList;
    } else {
      return permisstionList.filter(route => route.role === role);
    }
  };

  render() {
    const { user } = this.props;
    let roleRouteArr = this.roleRoutes(user.role);

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
