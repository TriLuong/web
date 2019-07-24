import React, { PureComponent } from 'react';
import logo from 'assets/images/login/logo.svg';
import './styles.scss';

class Header extends PureComponent {
  constructor() {
    super();

    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({
      showMenu: !this.state.showMenu,
    });
  }

  render() {
    return (
      <div className="header">
        <nav className="navbar">
          <a className="navbar-logo" href="/dashboard">
            <img src={logo} alt="Design Cafe" />
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
                  ? 'dropdown-user dropdown-menu dropdown-menu-right show'
                  : 'dropdown-user dropdown-menu'
              }
            >
              <h5 className="dropdown-user__name">Name Goes Here</h5>
              <p className="dropdown-user__email">email@designcafe.com</p>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="#">
                Edit Profile
              </a>
              <a className="dropdown-item" href="#">
                Change Password
              </a>
              <a className="dropdown-item" href="#">
                Logout
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
