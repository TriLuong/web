import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Header from 'components/common/header';
import IconSearch from 'components/common/icon/IconSearch';
import SelectField from 'components/common/form/Select';
import { ModalUser, ModalBulkUpload } from 'components/modal';
import './styles.scss';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { getUsers, addUser, updateUser, requestBulkUpload, requestDeleteUser } from './actions';
import { USER_FILTER } from './constants';
import { getFetchingState, getUsersState } from './selectors';

import DatatablePage from './DatatablePage';

type Props = {
  dataUsers: {},
  doGetUsers: () => {},
  doAddUser: () => {},
  doUpdateUser: () => {},
  doRequestBulkUpload: () => {},
  doRequestDeleteUser: () => {},
  isFetching: Boolean,
};
class DashBoard extends Component<Props> {
  state = {
    modalIsOpen: false,
    modalBulkUpload: false,
    params: {
      orderBy: null,
      orderType: null,
      role: null,
      type: null,
      keyword: null,
    },
  };

  constructor(props) {
    super(props);
    this.pointer = {};
  }

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

  toggleModalBulkUpload = () => {
    this.setState(prevState => ({
      modalBulkUpload: !prevState.modalBulkUpload,
    }));
  };

  gotoPage = page => {
    const { doGetUsers } = this.props;
    const { params } = this.state;
    doGetUsers({ ...params, page });
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
    } else {
      doAddUser({
        form: { data: values },
        cb: status => {
          if (status) {
            this.toggleModal();
          }
        },
      });
    }
    return null;
  };

  onBulkUpload = values => {
    const file = values.file;
    if (!file) return null;
    const { doRequestBulkUpload } = this.props;
    const formData = new FormData();
    formData.append('file', file);
    doRequestBulkUpload({
      form: formData,
      cb: () => {
        this.gotoPage(1);
        this.toggleModalBulkUpload();
      },
    });
    return null;
  };

  onEdit = user => {
    this.userEdit = user;
    this.toggleModal({ isEdit: true });
  };

  /* Sorting */
  onSort = sort => {
    const { doGetUsers } = this.props;
    const { params } = this.state;
    const orderType = params.orderType;
    let neworderType = '';
    if (orderType === null) {
      neworderType = 'asc';
    } else if (orderType === 'asc') {
      neworderType = 'desc';
    } else {
      neworderType = 'asc';
    }
    const newPrams = { ...params, orderType: neworderType, orderBy: sort.orderBy };
    this.setState({ params: newPrams });
    doGetUsers(newPrams);
  };

  /* Select Field */
  handleOnChangeSelectField = event => {
    const { doGetUsers } = this.props;
    const { params } = this.state;
    const { value } = event;
    let newParams = '';
    if (value === 'all') {
      newParams = { ...params, role: null, type: null };
    } else {
      const decodeValue = decodeURI(value)
        .replace(/"/g, '""')
        .replace(/&/g, '","')
        .replace(/=/g, '":"');
      const parseValue = JSON.parse(`{"${decodeValue}"}`);

      newParams = { ...params, role: parseValue.role, type: parseValue.type };
    }
    this.setState({ params: newParams });
    doGetUsers(newParams);
  };

  doSearch = evt => {
    const { doGetUsers, isFetching } = this.props;
    if (isFetching) {
      return null;
    }
    const searchText = evt.target.value;
    const { params } = this.state;
    const newPrams = { ...params, keyword: searchText };
    this.setState({ params: newPrams });
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      doGetUsers(newPrams);
    }, 500);
    return null;
  };

  onClickItem = id => {
    const { doRequestDeleteUser } = this.props;
    doRequestDeleteUser({
      id,
      cb: () => {
        const { doGetUsers } = this.props;
        const { params } = this.state;
        doGetUsers({ ...params });
      },
    });
  };

  render() {
    const { dataUsers } = this.props;
    const {
      modalIsOpen,
      modalBulkUpload,
      params: { keyword },
    } = this.state;
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
                  value={keyword || ''}
                  onChange={this.doSearch}
                />
                <IconSearch className="top-control__search__icon" />
              </div>
              <SelectField
                className="mr-2"
                options={USER_FILTER}
                placeholder={null}
                onChange={this.handleOnChangeSelectField}
                defaultValue={USER_FILTER[0]}
              />
              <div className="btn-group mr-2" role="group" aria-label="Second group">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.toggleModalBulkUpload}
                >
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
                <ModalBulkUpload
                  isOpen={modalBulkUpload}
                  toggle={this.toggleModalBulkUpload}
                  onSubmit={this.onBulkUpload}
                  user={this.userEdit}
                />
              </div>
            </div>
          </div>
          <DatatablePage
            data={dataUsers}
            gotoPage={this.gotoPage}
            onEdit={this.onEdit}
            onSort={this.onSort}
            onClickItem={this.onClickItem}
          />
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
  doRequestBulkUpload: evt => dispatch(requestBulkUpload(evt)),
  doRequestDeleteUser: evt => dispatch(requestDeleteUser(evt)),
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
