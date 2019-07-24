import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
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
    if (value) {
      this.setState({
        isSelect: true,
      });
    } else {
      this.setState({
        isSelect: false,
      });
    }
    console.log(this.state);
  };

  handleOnSubmit = e => {
    e.preventDefault();
    console.log(this.state);
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
                <div className={`form-custom ${this.state.isSelect ? 'form-custom hasValue' : ''}`}>
                  <input
                    name="username"
                    type="text"
                    id="username"
                    onChange={this.handleOnChange}
                    className="form-control"
                  />
                  {/* eslint jsx-a11y/label-has-associated-control: 0 jsx-a11y/label-has-for: 0 */}
                  <label htmlFor="Email address">Email address</label>
                </div>
              </div>
              <div className="form-group">
                <div className={`form-custom ${this.state.isSelect ? 'form-custom hasValue' : ''}`}>
                  <input
                    name="password"
                    type="password"
                    id="password"
                    onChange={this.handleOnChange}
                    className="form-control"
                  />
                  {/* eslint jsx-a11y/label-has-associated-control: 0 jsx-a11y/label-has-for: 0 */}
                  <label htmlFor="Password">Password</label>
                </div>
              </div>
              <div className="list-button">
                <button type="button" className="btn btn-link" onClick={this.handleOnclick}>
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
