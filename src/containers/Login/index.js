import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import images from '../../assets';
import './Login.scss';
import store from '../../redux/store';
import { doSignIn } from '../../redux/actions';

class Login extends Component {
  state = {};

  handleOnChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    /* eslint react/prop-types: 0 react/destructuring-assignment: 0 */
    this.props.requestLogin(this.state);
    console.log(this.state, store.getState());
  };

  render() {
    return (
      <div className="container-fluid login">
        <div className="row">
          <div className="col-md-6 loginLeft">
            <div className="loginContent">
              <div className="loginHeader">
                <div className="logo">
                  <img src={images.logo} alt="logo" />
                </div>
                <div className="loginTitle">
                  <h1>Hello there</h1>
                  <p>Please login to your account</p>
                </div>
              </div>
              <div className="loginInput">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input
                      placeholder="Email Address"
                      className="form-control inputText"
                      onChange={this.handleOnChange}
                      type="text"
                      name="username"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      placeholder="Password"
                      className="form-control inputText"
                      onChange={this.handleOnChange}
                      type="password"
                      name="password"
                    />
                  </div>
                  <div className="loginControl">
                    <a href="https://github.com">Reset password</a>
                    <button className="btn btn-primary" type="submit">
                      LOGIN
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6 loginRight">
            <img src={images.loginBG} alt="loginBG" />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  requestLogin: evt => dispatch(doSignIn(evt)),
});

const mapStateToProps = () => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Login);
