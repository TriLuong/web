/* eslint import/no-cycle: 0 */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Header from 'components/common/header';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ScheduledMeeting from 'pages/ScheduledMeeting';
import ModalReschedule from 'components/modal/Designer/ModalReschedule';
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
};
class Designer extends Component<Props> {
  state = {
    isOpenReschedule: false,
    lead: {},
    filter: '',
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

  handleOnChangeRadioButton = ({ filter }) => {
    console.log(this.state);
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
      this.setState({ lead }, () => this.toggleReschedule());
    }
  };

  toggleReschedule = () => {
    this.setState(prexState => ({ isOpenReschedule: !prexState.isOpenReschedule }));
  };

  onSubmitReschedule = values => {
    const { doRescheduleLead } = this.props;
    const { lead } = this.state;
    doRescheduleLead({ data: { ...lead, ...values } });
    this.toggleReschedule();
    // console.log('onSubmit', { data: { ...values } });
  };

  render() {
    const { leadsScheduled } = this.props;
    const { params, isOpenReschedule, lead } = this.state;
    return (
      <div className="document">
        <Header />
        <div className="container">
          <ScheduledMeeting
            data={leadsScheduled}
            handleOnChangeRadioButton={this.handleOnChangeRadioButton}
            onSort={this.onSort}
            gotoPage={this.gotoPage}
            onSearch={this.onSearch}
            onClick={this.onClick}
            params={params}
          />
        </div>
        <ModalReschedule
          title="Reschedule Meeting"
          isOpen={isOpenReschedule}
          toggle={this.toggleReschedule}
          onSubmit={this.onSubmitReschedule}
          lead={lead}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  isFetching: getFetchingState(store),
  leadsScheduled: getLeadsScheduledState(store),
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
)(Designer);
