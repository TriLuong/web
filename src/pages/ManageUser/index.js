import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Header from 'components/common/header';
import IconSearch from 'components/common/icon/IconSearch';
import SelectField from 'components/common/form/Select';
import { ModalUser } from 'components/modal';
import './styles.scss';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { getUsers, addUser, updateUser } from './actions';
import { USER_FILTER } from './constants';
import { getFetchingState, getUsersState } from './selectors';
import DatatablePage from './DatatablePage';

class DashBoard extends Component {
  state = {
    modalIsOpen: false,
  };

  componentDidMount() {
    this.gotoPage(1);
  }

  toggleModal = ({ isEdit } = {}) => {
    if (!isEdit) {
      this.userEdit = null;
    }
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen,
    }));
  };

  gotoPage = page => {
    const { doGetUsers } = this.props;
    doGetUsers({ page });
  };

  onAddUser = values => {
    const { doAddUser, doUpdateUser } = this.props;
    if (this.userEdit) {
      doUpdateUser({
        form: { data: values },
        cb: status => {
          if (status) {
            this.toggleModal();
          }
        },
      });
      return null;
    }
    doAddUser({
      form: { data: values },
      cb: status => {
        if (status) {
          this.toggleModal();
        }
      },
    });
  };

  onEdit = user => {
    this.userEdit = user;
    this.toggleModal({ isEdit: true });
  };

  render() {
    const { user, dataUsers } = this.props;
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
                <button type="button" className="btn btn-primary" onClick={this.toggleModal}>
                  ADD NEW
                </button>
                <ModalUser
                  title={this.userEdit ? 'Edit User' : 'Add New User'}
                  isOpen={modalIsOpen}
                  toggle={this.toggleModal}
                  onSubmit={this.onAddUser}
                  user={this.userEdit}
                />
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
  isFetching: getFetchingState(store),
  dataUsers: getUsersState(store),
});

const mapDispatchToProps = dispatch => ({
  doGetUsers: evt => dispatch(getUsers(evt)),
  doAddUser: evt => dispatch(addUser(evt)),
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
