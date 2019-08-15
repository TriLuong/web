/* eslint import/no-cycle: 0 */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import Header from 'components/common/header';
import IconSearch from 'components/common/icon/IconSearch';
import SelectField from 'components/common/form/Select';
import RadioButton from 'components/common/form/RadioButton';
import Checking from 'components/common/checking';
import ModalDesignerAvailable from 'components/modal/ManageLead/ModalDesignerAvailable';
import ModalAssignDesigner from 'components/modal/ModalAssignDesigner';
import Notification from 'components/common/notification';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getBranchesState } from 'pages/App/selectors';
import reducer from './reducer';
import saga from './saga';
import { getLeads, deleteLead } from './actions';
import { getLeadsState, getFetchingState } from './selectors';
import DatatablePage from './DatatablePage';

import { LEADS_FILTER, RADIO_QUALIFIELD, RADIO_BROADCAST } from './constants';
import './styles.scss';

type Props = {
  doGetLeads: () => {},
  doDeleteLead: () => {},
  dataLeads: {
    leads: {},
    page: Number,
  },
};
class SalesPage extends Component<Props> {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isChecking: true,
      isOpenCheckDesigner: false,
      isDesignerAvailable: false,
      isOpenAssignDesigner: false,
      lead: {},
      params: {
        status: null,
        // filter: 'all',
        orderBy: null,
        orderType: null,
        keyword: null,
      },
      filter: '',
      typeLead: LEADS_FILTER[0],
    };
  }

  componentDidMount() {
    // console.log('manageLead', this.props);
    const { doGetLeads, location } = this.props;
    if (!location.state) {
      this.gotoPage(1);
    } else {
      doGetLeads({ ...location.state.params, ...location.state.filter, page: location.state.page });
      this.setState({
        params: location.state.params,
        filter: location.state.filter,
        typeLead: location.state.typeLead,
      });
    }
  }

  gotoPage = page => {
    const { doGetLeads } = this.props;
    const { params, filter } = this.state;
    doGetLeads({ ...params, page, ...filter });
    // doGetLeads({ page });
  };

  handleOnChangeRadioButton = ({ value }) => {
    // console.log('handleOnChangeRadioButton', value);
    const { dataLeads } = this.props;
    const { params } = this.state;
    // let newParams = {};
    let newFilter = null;
    // console.log(value);
    if (!value) {
      newFilter = '';
    } else if (value === 'noDate') {
      newFilter = { noDate: true };
    } else if (value === 'unSchedule') {
      newFilter = { meetingStatus: null };
    } else {
      newFilter = { meetingStatus: value };
    }
    // newParams = { ...params, ...filter };
    // console.log(newParams);
    const { doGetLeads } = this.props;
    // this.setState({ params: newParams, filter });
    this.setState({ filter: value });
    doGetLeads({ ...params, ...newFilter, page: dataLeads.page });
  };

  handleOnChangeSelectField = event => {
    const { value } = event;
    const { params } = this.state;
    const { doGetLeads } = this.props;
    const newParams = { ...params, status: value };
    this.setState({ params: newParams, filter: '', typeLead: event });
    doGetLeads({ ...newParams, page: 1 });
    // console.log('handleOnChangeRadioButton', value, this.state);
  };

  toggleCheckDesigner = () => {
    this.setState(prevstate => ({ isOpenCheckDesigner: !prevstate.isOpenCheckDesigner }));
    const { isChecking } = this.state;
    if (isChecking) {
      this.setState({ isChecking: false });
      setTimeout(() => {
        this.onSubmitCheckDesigner();
        this.setState({ isChecking: true });
      }, 2000);
    }
  };

  toggleDesignerAvailable = () => {
    this.setState(prevstate => ({ isDesignerAvailable: !prevstate.isDesignerAvailable }));
  };

  toggleAssignDesigner = () => {
    this.setState(prevstate => ({ isOpenAssignDesigner: !prevstate.isOpenAssignDesigner }));
  };

  onSubmitCheckDesigner = () => {
    this.toggleCheckDesigner();
    this.toggleDesignerAvailable();
  };

  onOpenNotification = () => {
    this.setState(
      prevState => ({ isOpen: !prevState.isOpen }),
      () => {
        const { isOpen } = this.state;
        if (isOpen) {
          NotificationManager.success('', 'Lead successfully broadcasted.', 1500);
          setTimeout(() => {
            this.setState(prevState => ({ isOpen: !prevState.isOpen }));
          }, 1500);
        }
      },
    );
  };

  onSubmitAssignDesigner = values => {
    // this.toggleAssignDesigner();
    console.log('onSubmitAssignDesigner', values);
    // this.onOpenNotification();
  };

  /* eslint react/prop-types: 0 */
  onSchedule = (typeAction, lead) => {
    // console.log('leadFind', leadFind);
    const { history, dataLeads } = this.props;
    const { params, filter, typeLead } = this.state;
    if (typeAction === 'broadcast') {
      this.toggleCheckDesigner();
    } else if (typeAction === 'assignDesigner') {
      this.toggleAssignDesigner();
    } else if (typeAction === 'schedule') {
      history.push({
        pathname: `/lead-detail/${lead.id}`,
        state: { params, filter, typeLead, page: dataLeads.page },
      });
    }
  };

  handleDeleteLead = ({ id }) => {
    const { doDeleteLead } = this.props;
    doDeleteLead({
      id,
      cb: () => {
        this.gotoPage(1);
      },
    });
  };

  onClick = ({ actionLead, lead }) => {
    const { history } = this.props;
    const { params, filter, typeLead } = this.state;
    if (actionLead === 'deleteLead') {
      this.handleDeleteLead(lead);
    } else if (actionLead === 'assignDiffBranch') {
      history.push({
        pathname: `/lead-detail/${lead.id}`,
        state: { params, filter, typeLead },
      });
    }
  };

  /* Sorting */
  onSort = sort => {
    const { doGetLeads } = this.props;
    const { params } = this.state;
    const orderType = params.orderType;
    let newOrderType = '';
    if (orderType === null) {
      newOrderType = 'asc';
    } else if (orderType === 'asc') {
      newOrderType = 'desc';
    } else {
      newOrderType = 'asc';
    }
    const newPrams = { ...params, orderType: newOrderType, orderBy: sort.orderBy };
    this.setState({ params: newPrams });
    doGetLeads(newPrams);
  };

  onSearch = event => {
    const { doGetLeads, isFetching } = this.props;
    if (isFetching) {
      return null;
    }
    const { params, filter } = this.state;
    const searchText = event.target.value;
    const newParams = { ...params, ...filter, keyword: searchText };
    this.setState({ params: newParams });
    setTimeout(() => doGetLeads(newParams), 500);
    return null;
  };

  render() {
    const {
      lead,
      params,
      isOpenCheckDesigner,
      isDesignerAvailable,
      isOpenAssignDesigner,
      isOpen,
      filter,
      typeLead,
    } = this.state;
    const { dataLeads, branches } = this.props;

    return (
      <div className="document">
        <Header />
        <div className="container">
          <div className="top-control">
            <h1 className="top-control__header">Manage Leads</h1>
            <RadioButton
              className="ml-auto"
              classNameRadio="ml-5"
              options={!params.status ? RADIO_QUALIFIELD : RADIO_BROADCAST}
              onChange={this.handleOnChangeRadioButton}
              selectedOption={filter}
            />
            <div
              className="btn-toolbar ml-5"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <SelectField
                className="mr-2"
                options={LEADS_FILTER}
                value={typeLead}
                placeholder="Qualified Leads"
                onChange={this.handleOnChangeSelectField}
              />
              <div className="top-control__search">
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                  value={params.keyword || ''}
                  onChange={this.onSearch}
                />
                <IconSearch className="top-control__search__icon" />
              </div>
            </div>
          </div>
          <Notification isOpen={isOpenCheckDesigner}>
            <Checking isChecking={isOpenCheckDesigner} />
          </Notification>

          <ModalDesignerAvailable
            user={lead}
            title="No Designers Availble"
            isOpen={isDesignerAvailable}
            toggle={this.toggleDesignerAvailable}
            onSubmit={this.onSubmitDesignerAvailable}
          />

          <ModalAssignDesigner
            title="Assign Designer"
            isOpen={isOpenAssignDesigner}
            toggle={this.toggleAssignDesigner}
            onSubmit={this.onSubmitAssignDesigner}
          />

          <Notification isOpen={isOpen}>
            <NotificationContainer />
          </Notification>
          <DatatablePage
            data={dataLeads}
            gotoPage={this.gotoPage}
            params={params}
            status={params.status}
            filter={params.filter}
            onSchedule={this.onSchedule}
            branches={branches}
            onClick={this.onClick}
            onSort={this.onSort}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  isFetching: getFetchingState(store),
  dataLeads: getLeadsState(store),
  branches: getBranchesState(store),
});

const mapDispatchToProps = dispatch => ({
  doGetLeads: evt => dispatch(getLeads(evt)),
  doDeleteLead: evt => dispatch(deleteLead(evt)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'manageLeadReducer', reducer });
const withSaga = injectSaga({ key: 'manageLeadSaga', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SalesPage);
