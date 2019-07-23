import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup } from 'reactstrap';
import images from '../../assets';
import './Header.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isShow: false, modal: false, firstName: '', lastName: '', email: 'admin@designcafe.com' };
  }

  showMenu = () => {
    const { isShow } = this.state;
    this.setState({ isShow: !isShow });
    console.log(this.state);
    // console.log(this.props);
  };

  toggle = state => {
    this.setState({
      modal: !state.modal,
    });
  };

  handleOnChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state);
  };

  update = event => {
    event.preventDefault();
    const { modal } = this.state;
    this.setState({ modal: !modal });
    // console.log(this.state);
  };

  modalEditProfile = modal => (
    <Modal isOpen={modal} toggle={this.toggle}>
      <ModalHeader toggle={this.toggle}>Edit Profile</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Input placeholder="Firstname" name="firstName" onChange={this.handleOnChange} />
          </FormGroup>
          <FormGroup>
            <Input placeholder="Lastname" name="lastName" onChange={this.handleOnChange} />
          </FormGroup>
          <FormGroup>
            <Input placeholder="Email" name="email" onChange={this.handleOnChange} />
          </FormGroup>
          <Button color="primary" onClick={this.update}>
            Update
          </Button>
        </Form>
      </ModalBody>
      <ModalFooter />
    </Modal>
  );

  render() {
    const { email, modal, isShow } = this.state;
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
            <button className="btn btn-secondary" onClick={this.showMenu} type="button">
              AD
            </button>
            <div className={`menuDropdown ${isShow ? 'show' : ''}`}>
              <div className="menuGroup menuGroupUser">
                <h3>AD</h3>
                <p>{email}</p>
                <hr />
                <a className="dropdown-item" href="#/" onClick={this.toggle}>
                  Edit Profile
                </a>
                {this.modalEditProfile(modal)}
                <a className="dropdown-item" href="#/">
                  Change Password
                </a>
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

export default Header;
