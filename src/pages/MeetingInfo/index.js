/* eslint import/no-cycle: 0 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Header from 'components/common/header';
import BreadCrumb from 'components/LeadDetail/breadcrumb';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import moment from 'moment';
import saga from './saga';
import reducer from './reducer';
import { getLeadById } from './actions';
import { getFetchingState, getLeadByIdState } from './selectors';

type Props = {
  doGetLeadById: () => {},
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

class MeetingInfo extends PureComponent<Props> {
  componentDidMount() {
    const { doGetLeadById, match } = this.props;
    doGetLeadById({ id: match.params.id });
  }

  render() {
    const { lead } = this.props;
    // console.log(this.props);
    if (!lead || !lead.Owner) {
      return null;
    }
    return (
      <div className="document">
        <Header />
        <BreadCrumb breadcrumbFirst="Scheduled" pathName="/designer" lead={lead} />
        <div className="container">
          <h2 className="page-title">Meeting Info</h2>
          <div className="form-row form-row-detail">
            <div className="form-group col-md-6">
              <div className="form-title">Contact Info</div>
              <div className="content-Meeting">
                <p>{lead.Owner.name}</p>
                <p>{`${lead.Phone} • ${lead.Email} `}</p>
                <p>{`${lead.Street}, ${lead.City}, ${lead.State}, ${lead.Country} ${lead.Zip_Code} `}</p>
              </div>

              <div className="form-title">Budget</div>
              <div className="content-Meeting">
                <p>{lead.budget.type || 'Not available'}</p>
                <p>{lead.budget.amount || {}}</p>
              </div>
              <div className="form-title">Services Required</div>
              <div className="content-Meeting">
                <p>{lead.service.map((ser, index) => (index === 0 ? `${ser}` : `, ${ser}`))}</p>
                <p>{lead.serviceOption || {}}</p>
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
      </div>
    );
  }
}

const mapStateToProps = store => ({
  isFetching: getFetchingState(store),
  lead: getLeadByIdState(store),
});

const mapDispatchToProps = dispatch => ({
  doGetLeadById: evt => dispatch(getLeadById(evt)),
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
