/* eslint import/no-cycle: 0 */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Header from 'components/common/header';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ScheduledMeeting from 'pages/ScheduledMeeting';
import ModalChangeDateTime from 'components/modal/Designer/ModalChangeDateTime';
import ModalChangeBranch from 'components/modal/Designer/ModalChangeBranch';
import { getBranchesState } from 'pages/App/selectors';
import { getLeadsScheduled, reScheduleLead } from './actions';
import { getFetchingState, getLeadsScheduledState } from './selectors';
import saga from './saga';
import reducer from './reducers';
import './styles.scss';

type Props = {
  doGetLeadsScheduled: () => {},
  doRescheduleLead: () => {},
  leadsScheduled: [],
  isFetching: Boolean,
  history: {
    push: () => {},
  },
  branches: [],
};
class ManageDesigner extends Component<Props> {
  state = {
    isOpenChangeDateTime: false,
    isOpenChangeBranch: false,
    lead: {},
    filter: '',
    activeTab: '1',
    params: {
      status: 'broadcasted',
      orderBy: null,
      orderType: null,
      keyword: '',
    },
  };

  componentDidMount() {
    this.gotoPage(1);
  }

  gotoPage = page => {
    const { doGetLeadsScheduled } = this.props;
    const { params, filter } = this.state;
    doGetLeadsScheduled({ ...params, page, ...filter });
    // doGetLeads({ page });
  };

  onActiveTabChange = activeTab => {
    this.setState({ activeTab });
  };

  handleOnChangeRadioButton = ({ filter }) => {
    // console.log(this.state);
    this.setState({ filter });
  };

  /* Sorting */
  onSort = sort => {
    const { doGetLeadsScheduled } = this.props;
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
    doGetLeadsScheduled(newPrams);
  };

  onSearch = event => {
    const { doGetLeadsScheduled, isFetching } = this.props;
    if (isFetching) {
      return null;
    }
    const { params, filter } = this.state;
    const searchText = event.target.value;
    const newParams = { ...params, ...filter, keyword: searchText };
    this.setState({ params: newParams });
    setTimeout(() => doGetLeadsScheduled(newParams), 500);
    return null;
  };

  onClick = ({ actionLead, lead }) => {
    if (actionLead === 'reSchedule') {
      this.setState({ lead }, () => this.toggleChangeDateTime());
    }
  };

  onMeetingInfo = (typeAction, lead) => {
    const { history } = this.props;
    if (typeAction === 'meetingInfo') {
      this.setState({ lead });
      history.push({ pathname: `/meetingInfo/${lead.id}` });
    }
  };

  toggleChangeDateTime = () => {
    this.setState(prexState => ({ isOpenChangeDateTime: !prexState.isOpenChangeDateTime }));
  };

  toggleChangeBranch = () => {
    this.setState(prexState => ({ isOpenChangeBranch: !prexState.isOpenChangeBranch }));
  };

  onClickLinkTop = () => {
    this.toggleChangeDateTime();
    this.toggleChangeBranch();
  };

  onHandleChange = (name, value) => {
    const { lead } = this.state;
    let newValues;
    if (name === 'branch') {
      newValues = { ...lead, [name]: value, branchId: value.id };
    } else {
      newValues = { ...lead, [name]: value };
    }
    this.setState({ lead: newValues });
  };

  onSubmitReschedule = values => {
    const { doRescheduleLead } = this.props;
    const { lead } = this.state;
    doRescheduleLead({ data: { ...values, ...lead } });
    this.setState({ isOpenChangeDateTime: false, isOpenChangeBranch: false });
  };

  renderActiveTab = active => {
    const { params } = this.state;
    const { leadsScheduled } = this.props;
    switch (active) {
      case '1':
        return (
          <ScheduledMeeting
            data={leadsScheduled}
            handleOnChangeRadioButton={this.handleOnChangeRadioButton}
            onSort={this.onSort}
            gotoPage={this.gotoPage}
            onSearch={this.onSearch}
            onClick={this.onClick}
            onMeetingInfo={this.onMeetingInfo}
            params={params}
          />
        );
      case '2':
        return <div>{`TAB ${active}`}</div>;
      case '3':
        return <div>{`TAB ${active}`}</div>;
      case '4':
        return <div>{`TAB ${active}`}</div>;
      default:
        return (
          <ScheduledMeeting
            data={leadsScheduled}
            handleOnChangeRadioButton={this.handleOnChangeRadioButton}
            onSort={this.onSort}
            gotoPage={this.gotoPage}
            onSearch={this.onSearch}
            onClick={this.onClick}
            onMeetingInfo={this.onMeetingInfo}
            params={params}
          />
        );
    }
  };

  render() {
    const { branches } = this.props;
    const { isOpenChangeDateTime, isOpenChangeBranch, lead, activeTab } = this.state;
    return (
      <div className="document">
        <Header activeMenuDesigner="true" onActiveTabChange={this.onActiveTabChange} />
        <div className="container">{this.renderActiveTab(activeTab)}</div>
        <ModalChangeDateTime
          title="Reschedule Meeting"
          isOpen={isOpenChangeDateTime}
          toggle={this.toggleChangeDateTime}
          onSubmit={this.onSubmitReschedule}
          lead={lead}
          LinkTopTitle="Change Branch"
          onClickLinkTop={this.onClickLinkTop}
          onHandleChange={this.onHandleChange}
        />
        <ModalChangeBranch
          title="Change Branch Meeting"
          isOpen={isOpenChangeBranch}
          toggle={this.toggleChangeBranch}
          onSubmit={this.onSubmitReschedule}
          lead={lead}
          branches={branches}
          LinkTopTitle="Change Date/Time"
          onClickLinkTop={this.onClickLinkTop}
          onHandleChange={this.onHandleChange}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  isFetching: getFetchingState(store),
  leadsScheduled: getLeadsScheduledState(store),
  branches: getBranchesState(store),
});

const mapDispatchToProps = dispatch => ({
  doGetLeadsScheduled: evt => dispatch(getLeadsScheduled(evt)),
  doRescheduleLead: evt => dispatch(reScheduleLead(evt)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'leadsScheduledReducer', reducer });
const withSaga = injectSaga({ key: 'leadsScheduledSaga', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageDesigner);
