import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import InputGroup from 'components/common/form/GroupInput';
import logo from 'assets/images/login/logo.svg';
import './styles.scss';
import injectSaga from 'utils/injectSaga';
import { requestLogin } from './actions';
import saga from './saga';

class LoginPage extends Component {
  state = { isSelect: false };

  handleOnChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    /* eslint  react/destructuring-assignment: 0 react/prop-types: 0 */
    this.props.requestLogin(this.state);
  };

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
            <form onSubmit={this.handleOnSubmit}>
              <div className="form-group">
                <InputGroup
                  type="email"
                  name="username"
                  label="Email address"
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="form-group">
                <InputGroup
                  type="password"
                  name="password"
                  label="Password"
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="list-button">
                <button type="button" className="btn btn-link">
                  Reset Password
                </button>
                <button type="submit" className="btn btn-primary btn-login">
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
const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  requestLogin: evt => dispatch(requestLogin(evt)),
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
