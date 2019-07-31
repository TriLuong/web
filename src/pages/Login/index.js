// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import InputGroup from 'components/common/form/GroupInput';
import logo from 'assets/images/login/logo.svg';
import injectSaga from 'utils/injectSaga';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './styles.scss';
import ModalResetPassword, {
  ModalConfirmEmail,
  ModalSetNewPassword,
} from 'components/modal/ResetPassword';
import { requestLogin, requestResetPassword, requestSetPassword } from './actions';
import saga from './saga';
import { makeGetToken } from './selectors';

type Props = {
  doRequestLogin: () => {},
  doRequestResetPassword: void => {},
  doRequestSetPassword: void => {},
  token: string,
  history: any,
};
class LoginPage extends Component<Props, any> {
  state = {
    modalResetPassworIsOpen: false,
    modalConfirmEmailIsOpen: false,
    modalSetPasswordIsOpen: false,
  };

  componentDidMount() {
    const {
      token,
      history,
      match: { params },
    } = this.props;
    if (token) {
      history.replace('/');
    }
    if (params.token) {
      this.token = params.token;
      this.setState({ modalSetPasswordIsOpen: true });
    }
  }

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
    const { doRequestResetPassword } = this.props;
    doRequestResetPassword({
      ...values,
      cb: () => {
        this.toggleModalResetPassword();
        this.toggleModalConfirmEmail();
      },
    });
  };

  onSetPassword = values => {
    const { doRequestSetPassword } = this.props;
    const { newPassword, reNewPassword } = values;
    if (newPassword === reNewPassword) {
      doRequestSetPassword({
        password: newPassword,
        token: this.token,
        cb: () => {
          this.toggleModalSetPassword();
        },
      });
    }
  };

  handleChange = (evt, setFieldValue) => {
    const value = evt.target.value;
    const name = evt.target.name;
    setFieldValue(name, value);

    if (name === 'username') {
      setFieldValue('password', '');
    }
  };

  onSubmit = values => {
    const { doRequestLogin } = this.props;
    doRequestLogin(values);
  };

  render() {
    const { modalResetPassworIsOpen, modalConfirmEmailIsOpen, modalSetPasswordIsOpen } = this.state;
    return (
      <div className="page-login">
        <div className="page-login__content">
          <div className="page-login__inner">
            <div className="login-page__logo">
              <img src={logo} alt="Design Cafe" />
            </div>
            <h1>Hello there</h1>
            <p className="text-subheader">Please login to your account.</p>
            <Formik
              initialValues={{ username: '', password: '' }}
              onSubmit={this.onSubmit}
              validationSchema={Yup.object().shape({
                username: Yup.string()
                  .email('Invalid email address')
                  .required('Required'),
                password: Yup.string().required('Required'),
              })}
            >
              {({ handleSubmit, values, isValid, setFieldValue, touched, errors }) => (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <InputGroup
                      type="email"
                      name="username"
                      label="Email address"
                      value={values.username}
                      onChange={evt => this.handleChange(evt, setFieldValue)}
                    />
                    {errors.username && touched.username && (
                      <div className="invalid-feedback d-block">{errors.username}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <InputGroup
                      type="password"
                      name="password"
                      label="Password"
                      value={values.password}
                      onChange={evt => this.handleChange(evt, setFieldValue)}
                    />
                  </div>
                  <div className="list-button">
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={this.toggleModalResetPassword}
                    >
                      Reset Password
                    </button>
                    <button type="submit" className="btn btn-primary btn-login" disabled={!isValid}>
                      LOGIN
                    </button>
                  </div>
                </form>
              )}
            </Formik>
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
  doRequestResetPassword: evt => dispatch(requestResetPassword(evt)),
  doRequestSetPassword: evt => dispatch(requestSetPassword(evt)),
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
