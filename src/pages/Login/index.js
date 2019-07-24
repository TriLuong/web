import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from 'assets/images/login/logo.svg';
import InputGroup from 'components/common/form/GroupInput';
import './styles.scss';

import { requestLogin } from './actions';
import authReducer from 'pages/App/reducer';
import { getUser } from './selector';
const initialState = { authReducer };

class LoginPage extends Component {
  state = {};
  handleOnclick = event => {
    console.log(this.props);
    console.info(this.props.user);
    // this.props.requestLogin('fasdf');
  };
  componentDidMount() {
    console.info(this.props);
    console.info(this.props.user);
  }
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
                <button
                  type="button"
                  class="btn btn-link"
                  onClick={this.handleOnclick}
                >
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

// const mapDispatchToProps = dispatch => ({
//   requestLogin: e => dispatch(requestLogin(e)),
// });

const mapStateToProps = store => ({
  user: store => store.get('rootReducer').get('user'),
});
export default connect(
  mapStateToProps
  // mapDispatchToProps
)(LoginPage);
