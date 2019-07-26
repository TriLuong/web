import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import logo from 'assets/images/login/logo.svg';
import { makeGetUser } from 'pages/App/selectors';
import { requestLogout } from 'pages/Login/actions';
import { createStructuredSelector } from 'reselect';
import './styles.scss';

class Header extends PureComponent {
  constructor() {
    super();

    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
  }

  showMenu = event => {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  };

  closeMenu = () => {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  };

  logout = () => {
    const { doRequestLogout } = this.props;
    doRequestLogout();
  };

  render() {
    const { user } = this.props;
    const userInfo = user || {};
    return (
      <div className="header">
        <nav className="navbar">
          <a className="navbar-logo" href="/dashboard">
            <img src={logo} alt="Design Cafe" style={{ width: '37px' }} />
            <span className="navbar-brand">
              <strong>DESIGN</strong>
              CAFE
            </span>
          </a>
          <div className="dropdown">
            <button className="avatar" onClick={this.showMenu}>
              AD
            </button>
            <div
              className={
                this.state.showMenu
                  ? 'dropdown-menu--user dropdown-menu dropdown-menu-right show'
                  : 'dropdown-menu--user dropdown-menu'
              }
            >
              <div className="dropdown-user">
                <h5 className="dropdown-user__name">{`${userInfo.firstName} ${userInfo.lastName}`}</h5>
                <p className="dropdown-user__email">{userInfo.email}</p>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">
                  Edit Profile
                </a>
                <a className="dropdown-item" href="#">
                  Change Password
                </a>
                <div role="button" className="dropdown-item" onClick={this.logout}>
                  Logout
                </div>
              </div>
              <div className="dropdown-user dropdown-user--role">
                <a className="dropdown-item" href="#">
                  Super Admin Dashboard
                </a>
                <a className="dropdown-item" href="#">
                  Sales Dashboard
                </a>
                <a className="dropdown-item" href="#">
                  Designer Dashboard
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  user: makeGetUser(),
});

const mapDispatchToProps = dispatch => ({
  doRequestLogout: evt => dispatch(requestLogout(evt)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
