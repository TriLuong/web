/* eslint import/no-cycle: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Header from 'components/common/header';
import BreadCrumb from 'components/LeadDetail/breadcrumb';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import moment from 'moment';
import ModalChangeDateTime from 'components/modal/Designer/ModalChangeDateTime';
import ModalChangeBranch from 'components/modal/Designer/ModalChangeBranch';
import { getBranchesState } from 'pages/App/selectors';
import { reScheduleLead } from 'pages/ManageDesigner/actions';
import saga from './saga';
import reducer from './reducer';
import { getLeadById } from './actions';
import { getFetchingState, getLeadByIdState } from './selectors';

type Props = {
  doGetLeadById: () => {},
  doRescheduleLead: () => {},
  branches: [],
  lead: {
    Owner: {
      name: String,
    },
    Phone: String,
    Email: String,
    Street: String,
    City: String,
    State: String,
    Country: String,
    Zip_Code: Number,
    budget: {
      type: string,
      amount: Number,
    },
    service: [],
    serviceOption: String,
    branch: {
      name: String,
    },
    Meeting_Date_and_Time: String,
  },
  match: {
    params: {
      id: String,
    },
  },
};

class MeetingInfo extends Component<Props> {
  state = {
    isInitial: false,
    isOpenChangeBranch: false,
    isOpenChangeDateTime: false,
  };

  componentDidMount() {
    const { doGetLeadById, match } = this.props;
    doGetLeadById({ id: match.params.id });
  }

  shouldComponentUpdate(nexProps, nextState) {
    // console.log(nextState.isInitial);
    if (!nextState.isInitial && nexProps.lead && !nexProps.isFetching) {
      // console.log('should 1', nexProps.lead);
      this.setState({ lead: nexProps.lead, isInitial: true });
      return false;
    }
    return true;
  }

  onReschedule = () => {
    const { doGetLeadById, match } = this.props;
    doGetLeadById({ id: match.params.id });
    this.toggleChangeDateTime();
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
    console.log('onSubmitReschedule', lead);
    doRescheduleLead({ data: { ...values, ...lead } });
    this.setState({ isOpenChangeDateTime: false, isOpenChangeBranch: false });
  };

  render() {
    const { branches } = this.props;
    const { isOpenChangeBranch, isOpenChangeDateTime, lead } = this.state;
    // console.log(this.props);
    if (!lead || !lead.Owner) {
      return null;
    }
    // console.log(lead);
    return (
      <div className="document">
        <Header activeMenuDesigner="true" onActiveTabChange={this.onActiveTabChange} />
        <BreadCrumb breadcrumbFirst="Scheduled" pathName="/designer" lead={lead}>
          <button type="button" className="btn btn-primary">
            VIEW PROFILE
          </button>
          <button type="button" className="btn btn-primary" onClick={this.onReschedule}>
            RESCHEDULE
          </button>
        </BreadCrumb>
        <div className="container">
          <h2 className="page-title">Meeting Info</h2>
          <div className="form-row form-row-detail">
            <div className="form-group col-md-6">
              <div className="form-title">Contact Info</div>
              <div className="content-Meeting">
                <p>{lead.Owner.name}</p>
                <p>{`${lead.Phone}  ${lead.Email ? `• ${lead.Email}` : ''} `}</p>
                <p>
                  {`${lead.Street || ''} ${lead.City ? `, ${lead.City},` : ''} ${
                    lead.State ? `${lead.State},` : ''
                  } ${lead.Country ? `${lead.Country}` : ''} ${
                    lead.Zip_Code ? `${lead.Zip_Code}` : ''
                  }`}
                </p>
              </div>

              <div className="form-title">Budget</div>
              <div className="content-Meeting">
                <p>{lead.budget !== null ? lead.budget.type : 'Not available'}</p>
                <p>{lead.budget !== null ? lead.budget.amount : null}</p>
              </div>
              <div className="form-title">Services Required</div>
              <div className="content-Meeting">
                <p>{lead.service ? lead.service : 'Not required'}</p>
                <p>{lead.serviceOption ? lead.serviceOption : null}</p>
              </div>
              <div className="form-title">Experience Center</div>
              <div className="content-Meeting">
                <p>{lead.branch.name}</p>
              </div>
              <div className="form-title">Meeting Availability</div>
              <div className="content-Meeting">
                <p>
                  {`${lead.Meeting_Date_and_Time.split('T')[0]} • ${moment(
                    lead.Meeting_Date_and_Time.split('T')[1],
                    'hh:mm',
                  ).format('h:mm A')}`}
                </p>
              </div>
            </div>
            <div className="form-group col-md-6">MEETING TIME DIAGRAM</div>
          </div>
        </div>
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
  lead: getLeadByIdState(store),
  branches: getBranchesState(store),
});

const mapDispatchToProps = dispatch => ({
  doGetLeadById: evt => dispatch(getLeadById(evt)),
  doRescheduleLead: evt => dispatch(reScheduleLead(evt)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'meetingInfoReducer', reducer });
const withSaga = injectSaga({ key: 'meetingInfoSaga', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MeetingInfo);
