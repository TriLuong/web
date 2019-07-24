import React, { Component } from 'react';
import logo from 'assets/images/login/logo.svg';
import InputGroup from 'components/common/form/GroupInput';
import './styles.scss';

class LoginPage extends Component {
  state = {};
  render() {
    return (
      <div className="page-login">
        <div className="page-login__content">
          <div className="page-login__inner">
            <div className="login-page__logo">
              <img src={logo} alt="Design Cafe" />
            </div>
            <h1>Hello there</h1>
            <p className="text-subheader">Please login to your account.</p>
            <form method="get" action="/dashboard">
              <div className="form-group">
                <InputGroup name="userName" label="Email address" />
              </div>
              <div className="form-group">
                <InputGroup type="password" name="userPass" label="Password" />
              </div>
              <div className="list-button">
                <button type="button" class="btn btn-link">
                  Reset Password
                </button>
                <button type="submit" class="btn btn-primary btn-login">
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="page-login__bg" />
      </div>
    );
  }
}

export default LoginPage;
