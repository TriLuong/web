import React, { Component } from 'react';
import images from '../../assets';
import './Login.scss';

class Login extends Component {
  state = {};

  handleOnChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    localStorage.setItem('userInfo', JSON.stringify(this.state));
    console.log(this.state);
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

export default Login;
