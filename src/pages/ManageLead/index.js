import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Header from 'components/common/header';
import IconSearch from 'components/common/icon/IconSearch';
import SelectField from 'components/common/form/Select';
import RadioButton from 'components/common/form/RadioButton';
import Checking from 'components/common/checking';
import ModalDesignerAvailable from 'components/modal/ManageLead/ModalDesignerAvailable';
import Notification from 'components/common/notification';
import { getBranches } from 'pages/ManageUser/actions';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { getLeads, deleteLead, getLeadByID } from './actions';
import { getLeadsState, getFetchingState, getBranchesState, getLeadState } from './selectors';
import DatatablePage from './DatatablePage';

import { LEADS_FILTER, RADIO_QUALIFIELD, RADIO_BROADCAST } from './constants';
import './styles.scss';

type Props = {
  doGetLeads: () => {},
  doDeleteLead: () => {},
  doGetBranches: () => {},
  doGetLeadByID: () => {},
  dataLeads: {
    leads: {},
    page: Number,
  },
};
class SalesPage extends Component<Props> {
  constructor() {
    super();
    this.state = {
      isChecking: true,
      isOpenCheckDesigner: false,
      isDesignerAvailable: false,
      lead: {},
      params: {
        typeLead: 'qualifiedLeads',
        filterLead: 'all',
      },
    };
  }

  componentDidMount() {
    const { doGetBranches } = this.props;
    this.gotoPage(1);
    doGetBranches();
  }

  gotoPage = page => {
    const { doGetLeads } = this.props;
    const { params } = this.state;
    doGetLeads({ ...params, page });
  };

  handleOnChangeRadioButton = ({ value }) => {
    // console.log('handleOnChangeRadioButton', value);
    const { params } = this.state;
    const newParams = { ...params, filterLead: value };
    const { doGetLeads } = this.props;
    this.setState({ params: newParams });
    doGetLeads({ ...newParams });
  };

  handleOnChangeSelectField = event => {
    const { value } = event;
    const { params } = this.state;
    const { doGetLeads, dataLeads } = this.props;
    const newParams = { ...params, typeLead: value, filterLead: 'all' };
    this.setState({ params: newParams });
    doGetLeads({ ...newParams, page: dataLeads.page });
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

  onSubmitCheckDesigner = () => {
    this.toggleCheckDesigner();
    this.toggleDesignerAvailable();
  };

  /* eslint react/prop-types: 0 */
  onSchedule = (typeAction, lead) => {
    const { doGetLeadByID, dataLeads } = this.props;
    const leadFind = dataLeads.leads.find(item => item.id === lead.id);
    doGetLeadByID(leadFind);
    // console.log('leadFind', leadFind);
    if (typeAction === 'broadcast') {
      this.toggleCheckDesigner();
      this.setState({ lead });
    } else {
      console.info('onSchedule', typeAction, lead);
    }
  };

  handleDeleteLead = lead => {
    const { doDeleteLead } = this.props;
    const { params } = this.state;
    doDeleteLead({ lead, ...params });
  };

  onClick = ({ actionLead, lead }) => {
    if (actionLead === 'deleteLead') {
      this.handleDeleteLead(lead);
    }
  };

  render() {
    const { lead, params, isOpenCheckDesigner, isDesignerAvailable } = this.state;
    const { dataLeads } = this.props;

    return (
      <div className="document">
        <Header />
        <div className="container">
          <div className="top-control">
            <h1 className="top-control__header">Manage Leads</h1>
            <RadioButton
              className="ml-auto"
              classNameRadio="ml-5"
              id="radioButton"
              options={params.typeLead === 'qualifiedLeads' ? RADIO_QUALIFIELD : RADIO_BROADCAST}
              onChange={this.handleOnChangeRadioButton}
              selectedOption={params.filterLead}
            />
            <div
              className="btn-toolbar ml-5"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <SelectField
                className="mr-2"
                options={LEADS_FILTER}
                placeholder="Qualified Leads"
                onChange={this.handleOnChangeSelectField}
              />
              <div className="top-control__search">
                <input type="text" placeholder="Search" className="form-control" />
                <IconSearch className="top-control__search__icon" />
              </div>
            </div>
          </div>
          <Notification isOpen={isOpenCheckDesigner}>
            <Checking isChecking={isOpenCheckDesigner} />
          </Notification>

          <ModalDesignerAvailable
            user={lead}
            title="Designer Available"
            isOpen={isDesignerAvailable}
            toggle={this.toggleDesignerAvailable}
            onSubmit={this.onSubmitDesignerAvailable}
          />
          <DatatablePage
            data={dataLeads}
            gotoPage={this.gotoPage}
            params={params}
            typeLead={params.typeLead}
            onSchedule={this.onSchedule}
            onClick={this.onClick}
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
  lead: getLeadState(store),
});

const mapDispatchToProps = dispatch => ({
  doGetLeads: evt => dispatch(getLeads(evt)),
  doDeleteLead: evt => dispatch(deleteLead(evt)),
  doGetBranches: evt => dispatch(getBranches(evt)),
  doGetLeadByID: evt => dispatch(getLeadByID(evt)),
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
