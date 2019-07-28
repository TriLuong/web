import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Header from 'components/common/header';
import IconSearch from 'components/common/icon/IconSearch';
import IconCancel from 'components/common/icon/IconCancel';
import SelectField from 'components/common/form/Select';
import InputGroup from 'components/common/form/GroupInput';
import GroupSelectField from 'components/common/form/GroupSelect';
import './styles.scss';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { getUsers, addUsers, updateUser } from './actions';
import { USER_FILTER, TYPE_DESIGNER, USER_TYPE, USER_BRANCH } from './constants';
import { getUsersState } from './selectors';
import DatatablePage from './DatatablePage';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: '0',
    width: '80%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 70px 0 rgba(0, 0, 0, 0.09)',
    backgroundColor: '#f9f9f9',
  },
};

type Props = {
  doGetUsers: () => {},
  doAddUsers: () => {},
  doUpdateUser: () => {},
  dataUsers: {},
};
class DashBoard extends Component<Props> {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.gotoPage(1);
  }

  gotoPage = page => {
    const { doGetUsers } = this.props;
    doGetUsers({ page });
  };

  handleOnChange = event => {
    const { name, value } = event;
    const { addUser } = this.state;
    this.setState({ addUser: { ...addUser, [name]: value } });
  };

  handleOnClick = () => {
    const { doAddUsers, doUpdateUser } = this.props;
    const { addUser } = this.state;
    if (this.userEdit) {
      doUpdateUser({
        form: { data: { ...this.userEdit, ...addUser } },
        cb: status => {
          if (status) {
            this.closeModal();
            this.userEdit = null;
          }
        },
      });
    } else {
      doAddUsers({
        form: { data: addUser },
        cb: status => {
          if (status) {
            this.closeModal();
          }
        },
      });
    }
  };

  onEdit = user => {
    this.openModal();
    this.userEdit = user;
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { dataUsers } = this.props;
    const { modalIsOpen } = this.state;
    return (
      <div className="document">
        <Header />
        <div className="container">
          <div className="top-control">
            <h1 className="top-control__header">Manage Users</h1>
            <div className="btn-toolbar ml-auto" role="toolbar" aria-label="Toolbar with button groups">
              <div className="top-control__search mr-2">
                <input type="text" placeholder="Search" className="form-control" />
                <IconSearch className="top-control__search__icon" />
              </div>
              <SelectField className="mr-2" options={USER_FILTER} placeholder="All Users" />
              <div className="btn-group mr-2" role="group" aria-label="Second group">
                <button type="button" className="btn btn-primary">
                  BULK UPLOAD
                </button>
              </div>
              <div className="btn-group" role="group" aria-label="Third group">
                <button type="button" className="btn btn-primary" onClick={this.openModal}>
                  ADD NEW
                </button>
                <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                  ariaHideApp={false}
                >
                  <div className="modal-user">
                    <div className="modal-header">
                      <h3 className="modal-title">Add New User</h3>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={this.closeModal}
                      >
                        <IconCancel />
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <InputGroup name="firstName" label="First Name" onChange={this.handleOnChange} />
                        </div>
                        <div className="form-group col-md-6">
                          <InputGroup name="lastName" label="Last Name" onChange={this.handleOnChange} />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <InputGroup name="email" label="Email Address" onChange={this.handleOnChange} />
                        </div>
                        <div className="form-group col-md-6">
                          <GroupSelectField
                            name="branch"
                            label="branch"
                            options={USER_BRANCH}
                            onChange={this.handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <GroupSelectField
                            name="role"
                            options={USER_TYPE}
                            label="User Type"
                            onChange={this.handleOnChange}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <GroupSelectField
                            name="typeDesigner"
                            label="Type of Designer"
                            options={TYPE_DESIGNER}
                            onChange={this.handleOnChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer border-0 justify-content-center">
                      <button type="button" className="btn btn-primary" onClick={this.handleOnClick}>
                        ADD USER
                      </button>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
          <DatatablePage data={dataUsers} gotoPage={this.gotoPage} onEdit={this.onEdit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  dataUsers: getUsersState(store),
});

const mapDispatchToProps = dispatch => ({
  doGetUsers: evt => dispatch(getUsers(evt)),
  doAddUsers: evt => dispatch(addUsers(evt)),
  doUpdateUser: evt => dispatch(updateUser(evt)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'manageUserReducer', reducer });
const withSaga = injectSaga({ key: 'manageUserSaga', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DashBoard);
