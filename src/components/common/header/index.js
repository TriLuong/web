import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import logo from 'assets/images/login/logo.svg';
import { makeGetUser } from 'pages/App/selectors';
import { requestLogout } from 'pages/Login/actions';
import { createStructuredSelector } from 'reselect';
import './styles.scss';
import { ModalEditProfile, ModalChangePassword } from 'components/modal';
import { editProfile, changePassword } from 'pages/ManageUser/actions';

/* eslint jsx-a11y/anchor-is-valid: 0 */
type Props = {
  user: {},
  doEditProfile: () => {},
  doChangePassword: () => {},
  doRequestLogout: () => {},
};
class Header extends PureComponent<Props> {
  constructor() {
    super();

    this.state = {
      showMenu: false,
      modalIsOpenEditProfile: false,
      modalIsOpenChangePassword: false,
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

  toggleModalEditProfile = () => {
    this.setState(prevState => ({
      modalIsOpenEditProfile: !prevState.modalIsOpenEditProfile,
    }));
  };

  toggleModalChangePassword = () => {
    this.setState(prevState => ({
      modalIsOpenChangePassword: !prevState.modalIsOpenChangePassword,
    }));
  };

  onSubmitEditProfile = values => {
    const { doEditProfile } = this.props;
    doEditProfile({
      form: { data: values },
      cb: status => {
        if (status) {
          this.toggleModalEditProfile();
        }
      },
    });
  };

  onSubmitChangePassword = values => {
    // console.info('onSubmitChangePassword', values);
    const { doChangePassword } = this.props;
    if (
      values.oldPassword !== values.reNewPassword
      && values.newPassword === values.reNewPassword
    ) {
      doChangePassword({
        form: { password: values.oldPassword, newPassword: values.newPassword },
        cb: status => {
          if (status) {
            this.toggleModalChangePassword();
          }
        },
      });
    }
  };

  render() {
    const { user } = this.props;
    const { showMenu, modalIsOpenEditProfile, modalIsOpenChangePassword } = this.state;
    const userInfo = user || {};
    const { role } = userInfo;
    return (
      <div className="header fixed-top">
        <nav className="navbar">
          <a className="navbar-logo" href="/">
            <img src={logo} alt="Design Cafe" style={{ width: '37px' }} />
            <span className="navbar-brand">
              <strong>DESIGN</strong>
              CAFE
            </span>
          </a>
          <div className="dropdown">
            <button className="avatar" onClick={this.showMenu} type="button">
              AD
            </button>
            <div
              className={
                showMenu
                  ? 'dropdown-menu--user dropdown-menu dropdown-menu-right show'
                  : 'dropdown-menu--user dropdown-menu'
              }
            >
              <div className="dropdown-user">
                <h5 className="dropdown-user__name">{`${userInfo.firstName} ${userInfo.lastName}`}</h5>
                <p className="dropdown-user__email">{userInfo.email}</p>
                <div className="dropdown-divider" />
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={this.toggleModalEditProfile}
                >
                  Edit Profile
                </button>
                <ModalEditProfile
                  title="Edit Profile"
                  isOpen={modalIsOpenEditProfile}
                  toggle={this.toggleModalEditProfile}
                  onSubmit={this.onSubmitEditProfile}
                  user={userInfo}
                />
                <button
                  className="dropdown-item"
                  onClick={this.toggleModalChangePassword}
                  type="button"
                >
                  Change Password
                </button>
                <ModalChangePassword
                  title="Change Password"
                  isOpen={modalIsOpenChangePassword}
                  toggle={this.toggleModalChangePassword}
                  onSubmit={this.onSubmitChangePassword}
                  user={userInfo}
                />
                <button className="dropdown-item" onClick={this.logout} type="button">
                  Logout
                </button>
              </div>
              {role === 'admin' && (
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
              )}
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
  doEditProfile: evt => dispatch(editProfile(evt)),
  doChangePassword: evt => dispatch(changePassword(evt)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
