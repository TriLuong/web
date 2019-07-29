// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import InputGroup from 'components/common/form/GroupInput';
import logo from 'assets/images/login/logo.svg';
import './styles.scss';
import injectSaga from 'utils/injectSaga';
import ModalResetPassword, { ModalConfirmEmail, ModalSetNewPassword } from 'components/modal/ResetPassword';
import { requestLogin } from './actions';
import saga from './saga';
import { makeGetToken } from './selectors';

type Props = {
  doRequestLogin: () => {},
  token: string,
  history: any,
};
class LoginPage extends Component<Props> {
  state = {
    isFilled: false,
    modalResetPassworIsOpen: false,
    modalConfirmEmailIsOpen: false,
    modalSetPasswordIsOpen: false,
  };

  componentDidMount() {
    const { token, history } = this.props;
    if (token) {
      history.replace('/');
    }
  }

  handleOnChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    const { username } = this.state;
    if (username) {
      this.setState({ isFilled: true });
    } else {
      this.setState({ isFilled: false });
    }
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const { doRequestLogin } = this.props;
    doRequestLogin(this.state);
  };

  toggleModalResetPassword = () => {
    this.setState(prevState => ({
      modalResetPassworIsOpen: !prevState.modalResetPassworIsOpen,
    }));
  };

  toggleModalConfirmEmail = () => {
    this.setState(prevState => ({
      modalConfirmEmailIsOpen: !prevState.modalConfirmEmailIsOpen,
    }));
  };

  toggleModalSetPassword = () => {
    this.setState(prevState => ({
      modalSetPasswordIsOpen: !prevState.modalSetPasswordIsOpen,
    }));
  };

  onResetPassword = values => {
    console.log('Reset Password', values);
    // Check Email ?
    this.toggleModalResetPassword();
    this.toggleModalConfirmEmail();
  };

  onConfirmEmail = values => {
    console.log('Confirm Email', values);
    // Confirm Email ?
    this.toggleModalConfirmEmail();
    this.toggleModalSetPassword();
  };

  onSetPassword = values => {
    console.log('Set New Password', values);
    // Update password
    if (values.newPassword === values.reNewPassword) {
      console.log('Set New Password SUCCESS!!!');
      this.toggleModalSetPassword();
    }
  };

  render() {
    const {
      isFilled,
      modalResetPassworIsOpen,
      modalConfirmEmailIsOpen,
      modalSetPasswordIsOpen,
    } = this.state;
    return (
      <div className="page-login">
        <div className="page-login__content">
          <div className="page-login__inner">
            <div className="login-page__logo">
              <img src={logo} alt="Design Cafe" />
            </div>
            <h1>Hello there</h1>
            <p className="text-subheader">Please login to your account.</p>
            <form onSubmit={this.handleOnSubmit}>
              <div className="form-group">
                <InputGroup
                  type="email"
                  name="username"
                  label="Email address"
                  required
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="form-group">
                <InputGroup type="password" name="password" label="Password" required onChange={this.handleOnChange} />
              </div>
              <div className="list-button">
                <button type="button" className="btn btn-link" onClick={this.toggleModalResetPassword}>
                  Reset Password
                </button>
                <button type="submit" className="btn btn-primary btn-login" disabled={!isFilled}>
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
        <ModalResetPassword
          title="Reset Password"
          isOpen={modalResetPassworIsOpen}
          toggle={this.toggleModalResetPassword}
          onSubmit={this.onResetPassword}
        />
        <ModalConfirmEmail
          title="Reset password"
          isOpen={modalConfirmEmailIsOpen}
          toggle={this.toggleModalConfirmEmail}
          onSubmit={this.onConfirmEmail}
        />
        <ModalSetNewPassword
          title="Set New Password"
          isOpen={modalSetPasswordIsOpen}
          toggle={this.toggleModalSetPassword}
          onSubmit={this.onSetPassword}
        />
        <div className="page-login__bg" />
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  token: makeGetToken() || '',
});

const mapDispatchToProps = dispatch => ({
  doRequestLogin: evt => dispatch(requestLogin(evt)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'auth', saga });

export default compose(
  withSaga,
  withConnect,
)(LoginPage);
