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
import { loadState } from 'localStorage';
import Request from 'api/request';
import reducer from './reducer';
import saga from './saga';
import { getUsers } from './actions';
// import { getFetchingState, getUsersState } from './selectors';
import DatatablePage from './DatatablePage';


/* eslint react/destructuring-assignment: 0 arrow-parens: 0 */
const optionsUser = [
  { value: 'all', label: 'All Users' },
  { value: 'Name', label: 'Name' },
  { value: 'Branch', label: 'Branch' },
];
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

/* eslint react/prop-types: 0 */
class DashBoard extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    Request.getToken(loadState().token);
    this.props.getUsers();
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div className="document">
        <Header />
        <div className="container">
          <div className="top-control">
            <h1 className="top-control__header">Manage Users</h1>
            <div
              className="btn-toolbar ml-auto"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div className="top-control__search mr-2">
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                />
                <IconSearch className="top-control__search__icon" />
              </div>
              <SelectField
                className="mr-2"
                options={optionsUser}
                placeholder="All Users"
              />
              <div
                className="btn-group mr-2"
                role="group"
                aria-label="Second group"
              >
                <button type="button" className="btn btn-primary">
                  BULK UPLOAD
                </button>
              </div>
              <div className="btn-group" role="group" aria-label="Third group">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.openModal}
                >
                  ADD NEW
                </button>
                <Modal
                  isOpen={this.state.modalIsOpen}
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
                          <InputGroup
                            name="FirstName"
                            label="First Name"
                            onChange={this.handleOnChange}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <InputGroup
                            name="LastName"
                            label="Last Name"
                            onChange={this.handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <InputGroup
                            name="EmailAddress"
                            label="Email Address"
                            onChange={this.handleOnChange}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <GroupSelectField
                            label="Select Branch"
                            options={optionsUser}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <GroupSelectField
                            options={optionsUser}
                            label="User Type"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <GroupSelectField
                            label="Type of Designer"
                            options={optionsUser}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer border-0 justify-content-center">
                      <button
                        type="button"
                        className="btn btn-primary"
                        disabled
                      >
                        ADD USER
                      </button>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
          {this.props.isFetching ? null : (
            <DatatablePage data={this.props.users} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  isFetching: store.get('manageUserReducer').get('isFetching'),
  users: store.get('manageUserReducer').get('users'),
  // isFetching: getFetchingState(store),
  // users: getUsersState(store),
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers()),
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
