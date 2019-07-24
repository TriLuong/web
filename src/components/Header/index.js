import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  FormGroup,
} from 'reactstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import images from '../../assets';
import './Header.scss';
import { doEditProfile } from '../../redux/actions';
// import store from '../../redux/store';

class Header extends Component {
  state = {};

  showMenu = () => {
    const { isShow } = this.state;
    this.setState({ isShow: !isShow });
    // console.log(this.state);
    // console.log(store.getState());
    // console.log(this.props);
  };

  toggleEditProfile = state => {
    this.setState({
      modalEditProfile: !state.modalEditProfile,
    });
  };

  toggleChangePassword = state => {
    this.setState({
      modalChangePassword: !state.modalChangePassword,
    });
  };

  handleOnChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state);
  };

  update = event => {
    event.preventDefault();
    /* eslint react/destructuring-assignment: 0 react/no-access-state-in-setstate: 0  */
    this.setState({ modalEditProfile: !this.state.modalEditProfile });
    /* eslint react/prop-types: 0 react/destructuring-assignment: 0 */
    this.props.requestEditProFile(this.state);
    // console.log(this.state);
  };

  modalEditProfile = () => (
    /* eslint react/prop-types: 0 react/destructuring-assignment: 0 */
    <Modal isOpen={this.state.modalEditProfile} toggle={this.toggleEditProfile}>
      <ModalHeader toggle={this.toggletoggleEditProfile}>
        Edit Profile
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Input
              placeholder="Firstname"
              name="firstName"
              onChange={this.handleOnChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              placeholder="Lastname"
              name="lastName"
              onChange={this.handleOnChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              placeholder="Email"
              name="email"
              onChange={this.handleOnChange}
            />
          </FormGroup>
          <Button color="primary" onClick={this.update}>
            Update
          </Button>
        </Form>
      </ModalBody>
      <ModalFooter />
    </Modal>
  );

  modalChangePassword = () => (
    /* eslint react/prop-types: 0 react/destructuring-assignment: 0 */
    <Modal
      isOpen={this.state.modalChangePassword}
      toggle={this.toggleChangePassword}
    >
      <ModalHeader toggle={this.toggleChangePassword}>Edit Profile</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Input
              placeholder="Enter Old Password"
              name="oldPassword"
              type="password"
              onChange={this.handleOnChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              placeholder="Enter New Password"
              name="newPassword"
              type="password"
              onChange={this.handleOnChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              placeholder="Re-enter New Password"
              name="preNewPassowrd"
              type="password"
              onChange={this.handleOnChange}
            />
          </FormGroup>
          <Button color="primary" onClick={this.update}>
            CHANGE PASSWORD
          </Button>
        </Form>
      </ModalBody>
      <ModalFooter />
    </Modal>
  );

  render() {
    return (
      <div className="header">
        <div className="headerLeft">
          <img src={images.logo} alt="logo" />
          <h3>
            <strong>DESIGN</strong>
            CAFE
          </h3>
        </div>
        <div className="headerRight">
          <div className="userMenu">
            <button
              className="btn btn-secondary"
              onClick={this.showMenu}
              type="button"
            >
              AD
            </button>
            <div className={`menuDropdown ${this.state.isShow ? 'show' : ''}`}>
              <div className="menuGroup menuGroupUser">
                <h3>AD</h3>
                <p>{this.props.email}</p>
                <hr />
                <a
                  className="dropdown-item"
                  href="#/"
                  onClick={this.toggleEditProfile}
                >
                  Edit Profile
                </a>
                {this.modalEditProfile()}
                <a className="dropdown-item" href="#/" onClick={this.toggle}>
                  Change Password
                </a>
                {this.modalChangePassword()}
                <a className="dropdown-item" href="#/">
                  Logout
                </a>
              </div>
              <div className="menuGroup menuGroupManage">
                <a className="dropdown-item" href="#/">
                  Super Admin Dashboard
                </a>
                <a className="dropdown-item" href="#/">
                  Sales Dashboard
                </a>
                <a className="dropdown-item" href="#/">
                  Designer Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  firstName: state.userInfoReducer.payload.firstName,
  lastName: state.userInfoReducer.payload.lastName,
  email: state.userInfoReducer.payload.email,
});

const mapDispatchToProps = dispatch => ({
  requestEditProFile: evt => dispatch(doEditProfile(evt)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Header);
