import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Header from 'components/common/header';
import IconSearch from 'components/common/icon/IconSearch';
import SelectField from 'components/common/form/Select';
import RadioButton from 'components/common/form/RadioButton';
import ModalCheckDesigner from 'components/modal/ManageLead/ModalCheckDesigner';
import ModalDesignerAvailable from 'components/modal/ManageLead/ModalDesignerAvailable';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
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
  dataLeads: {},
};
class SalesPage extends Component<Props> {
  constructor() {
    super();
    this.state = {
      isChecking: true,
      isOpenCheckDesigner: false,
      isDesignerAvailable: false,
      params: {
        typeLead: 'qualifiedLeads',
        filterLead: 'all',
      },
    };
  }

  componentDidMount() {
    const { doGetLeads } = this.props;
    const { params } = this.state;
    doGetLeads({ ...params });
  }

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
    const { doGetLeads } = this.props;
    const newParams = { ...params, typeLead: value, filterLead: 'all' };
    this.setState({ params: newParams });
    doGetLeads({ ...newParams });
    // console.log('handleOnChangeRadioButton', value, this.state);
  };

  toggleCheckDesigner = () => {
    this.setState(prevstate => ({ isOpenCheckDesigner: !prevstate.isOpenCheckDesigner }));
    const { isChecking } = this.state;
    if (isChecking) {
      setTimeout(() => {
        this.setState({ isChecking: false }, () => {
          this.onSubmitCheckDesigner();
          this.setState({ isChecking: true });
        });
      }, 2000);
    }
  };

  toggleDesignerAvailable = () => {
    this.setState(prevstate => ({ isDesignerAvailable: !prevstate.isDesignerAvailable }));
  };

  onSubmitDesignerAvailable = () => {
    console.log('onSubmitDesignerAvailable');
    this.setState({ isSubmitDesignerAvailable: true });
  };

  onSubmitCheckDesigner = () => {
    this.toggleCheckDesigner();
    this.toggleDesignerAvailable();
  };

  onSchedule = status => {
    if (status === 'scheduled') {
      this.toggleCheckDesigner();
    } else {
      this.setState({ isSubmitDesignerAvailable: true });
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
    const {
      isChecking,
      params,
      isOpenCheckDesigner,
      isDesignerAvailable,
      isSubmitDesignerAvailable,
    } = this.state;
    const { dataLeads } = this.props;
    return isSubmitDesignerAvailable ? (
      <Redirect to="/lead-detail" />
    ) : (
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
          <ModalCheckDesigner
            isChecking={isChecking}
            onSubmit={this.onSubmitCheckDesigner}
            isOpen={isOpenCheckDesigner}
            toggle={this.toggleCheckDesigner}
          />
          <ModalDesignerAvailable
            title="Designer Available"
            isOpen={isDesignerAvailable}
            toggle={this.toggleDesignerAvailable}
            onSubmit={this.onSubmitDesignerAvailable}
          />
          <DatatablePage
            data={dataLeads}
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
