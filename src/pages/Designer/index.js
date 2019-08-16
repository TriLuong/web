/* eslint import/no-cycle: 0 */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Header from 'components/common/header';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ScheduledMeeting from 'pages/ScheduledMeeting';
import { getLeadsScheduled } from './actions';
import { getFetchingState, getLeadsScheduledState } from './selectors';
import saga from './saga';
import reducer from './reducers';
import './styles.scss';

type Props = {
  doGetLeadsScheduled: () => {},
  leadsScheduled: [],
  isFetching: Boolean,
};
class Designer extends Component<Props> {
  state = {
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

  render() {
    const { leadsScheduled } = this.props;
    const { params } = this.state;
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
            params={params}
          />
        </div>
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
