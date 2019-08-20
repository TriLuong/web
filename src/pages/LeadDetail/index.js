import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import { Formik } from 'formik';
import * as Yup from 'yup';
import 'react-dates/initialize';
import moment from 'moment';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Header from 'components/common/header';
import Footer from 'components/LeadDetail/footer';
import BreadCrumb from 'components/LeadDetail/breadcrumb';
import InputGroup from 'components/common/form/GroupInput';
import GroupSelectField from 'components/common/form/GroupSelect';
import IconHand from 'components/common/icon/IconHand';
import SelectDate from 'components/LeadDetail/time/SelectDate';
import SelectTime from 'components/LeadDetail/time/SelectTime';
import RadioButton from 'components/common/form/RadioButton';
import Notification from 'components/common/notification';
import { getBranchesState } from 'pages/App/selectors';
import { updateLead } from 'pages/ManageLead/actions';
import { getLeadById } from './actions';
import { getFetchingState, getLeadByIdState } from './selectors';
import reducer from './reducer';
/* eslint  import/no-cycle: 0 */
import saga from './saga';
import {
  CONTRIES_NAME,
  STATES_NAME,
  CITIES_NAME,
  getStatesOfCountry,
  getCitiesOfState,
  RADIO_DESIGNER,
} from './constant';

import 'pages/ManageLead/styles.scss';

type Props = {
  lead: {
    Full_Name: {},
  },
  branches: {},
};
class SalesDetail extends Component<Props> {
  constructor() {
    super();
    this.state = {
      params: {
        Full_Name: '',
        Email: '',
        budget: '',
        service: [],
        Meeting_Date_and_Time: '',
      },
      date: '',
      time: '',
      isInitDateTime: false,
      isOpen: false,
    };
  }

  /* eslint  react/prop-types: 0 */
  componentDidMount() {
    // console.log('leadDetail', this.props);
    const { doGetLeadById, match } = this.props;
    doGetLeadById({ id: match.params.id });
  }

  /* Init time date from lead,  */
  /* lead.Meeting_Date_and_Time === false => date=today, time=10:00  */
  shouldComponentUpdate(nextProps, nextState) {
    if (!nextState.isInitDateTime && !nextProps.isFetching) {
      // console.log('shouldComponentUpdate', nextState.isInitDateTime);
      let newDateTime = '';
      let date = '';
      let time = '';

      if (nextProps.lead.Meeting_Date_and_Time) {
        newDateTime = nextProps.lead.Meeting_Date_and_Time;
        date = newDateTime.split('T')[0];
        time = newDateTime.split('T')[1];
      } else {
        date = moment().format('YYYY-MM-DD');
        time = `${moment().format('H')}`;
        if (parseInt(time) < 10) {
          time = '10:00';
        } else {
          time = `${time}:00`;
        }
        newDateTime = `${date}T${time}`;
      }
      // console.log('newDateTime', newDateTime);
      const newParams = {
        ...nextState.params,
        ...nextProps.lead,
        Meeting_Date_and_Time: newDateTime,
      };
      this.setState(prevState => ({
        isInitDateTime: !prevState.isInitDateTime,
        params: newParams,
        date,
        time,
      }));
      return false;
    }
    // console.log('shouldComponentUpdate', nextState.isInitDateTime);

    return true;
  }

  /* Update Meeting_Date_and_Time to values when having any change on Field of Formik */
  /* date & time -> selected ==> Meeting_Date_and_Time = lead.Meeting_Date_and_Time */
  /* date & time -> not selected ==> Meeting_Date_and_Time = default (date: today, time: 10:00) */
  setMeetingDateTime = setFieldValue => {
    const { params } = this.state;
    setFieldValue('Meeting_Date_and_Time', params.Meeting_Date_and_Time);
  };

  /* This function handleOnChange for common component */
  onHandleChangeCommon = (event, setFieldValue) => {
    const { name, value } = event.target;
    const { params } = this.state;
    const newParams = { ...params, [name]: value };
    this.setState({ params: newParams });
    setFieldValue(name, value);
    this.setMeetingDateTime(setFieldValue);
  };

  /* eslint no-restricted-globals: 0 */
  onHandleChangePhone = (event, setFieldValue) => {
    const { name, value } = event.target;
    const { params } = this.state;
    this.setMeetingDateTime(setFieldValue);
    if (!isNaN(value) || value === '+') {
      const newParams = { ...params, [name]: value };
      this.setState({ params: newParams });
      setFieldValue(name, `${value}`);
    }
  };

  onHandleChangeName = (event, setFieldValue) => {
    const { name, value } = event.target;
    const { params } = this.state;
    const newOwnerName = { ...params.Owner, name: value };
    const newParams = { ...params, Owner: newOwnerName };
    this.setState({ params: newParams });
    setFieldValue(name, newOwnerName);
    this.setMeetingDateTime(setFieldValue);
  };

  onHandleChangeNameLead = (event, setFieldValue) => {
    const { name, value } = event.target;
    const { params } = this.state;
    const valueFirstName = name === 'First_Name' ? value : params.First_Name;
    const valueLastName = name === 'Last_Name' ? value : params.Last_Name;
    let newFullName = '';
    if (valueFirstName && valueLastName) {
      newFullName = `${valueFirstName} ${valueLastName}`;
    } else if (valueFirstName && !valueLastName) {
      newFullName = `${valueFirstName}`;
    } else if (valueLastName && !valueFirstName) {
      newFullName = `${valueLastName}`;
    } else {
      newFullName = '';
    }
    const newParams = { ...params, [name]: value, Full_Name: newFullName };
    this.setState({ params: newParams });
    setFieldValue(name, value);
    setFieldValue('Full_Name', newFullName);
    this.setMeetingDateTime(setFieldValue);
  };

  onDateChange = (dateValue, setFieldValue) => {
    const { params, time } = this.state;
    const newDate = dateValue.format('YYYY-MM-DD');

    const newDateTime = `${newDate}T${time}`;

    const newParams = { ...params, Meeting_Date_and_Time: newDateTime };
    this.setState({ params: newParams, date: newDate });
    setFieldValue('Meeting_Date_and_Time', newDateTime);
  };

  /* eslint radix: 0 */
  onTimeChange = (timeValue, setFieldValue) => {
    // console.log("onTimeChange",timeValue);
    const { params, date } = this.state;
    const timeArr = timeValue.split(' ');
    const typeTime = timeArr[1];
    let hour = timeArr[0].split(':')[0];
    const minute = timeArr[0].split(':')[1];
    if (typeTime === 'PM' && hour !== '12') {
      hour = parseInt(hour) + 12;
    }
    const newTime = `${hour}:${minute}`;

    const newDateTime = `${date}T${newTime}`;
    const newParams = { ...params, Meeting_Date_and_Time: newDateTime };
    this.setState({ params: newParams, time: newTime });
    setFieldValue('Meeting_Date_and_Time', newDateTime);
  };

  onChangeCheckboxServices = (event, setFieldValue) => {
    const { params } = this.state;
    const { name, checked, value } = event.target;
    let newService = [];
    if (!params.service) {
      newService = [];
    } else {
      newService = [...params.service];
    }

    if (checked) {
      newService.push(value);
    } else {
      const serviceIndex = newService.findIndex(i => i === value);
      newService.splice(serviceIndex, 1);
    }

    const newParams = { ...params, [name]: newService };
    this.setState({ params: newParams });

    setFieldValue(name, newService);
    this.setMeetingDateTime(setFieldValue);
  };

  onChangeCountry = (event, setFieldValue) => {
    const { value } = event.target;
    this.onHandleChangeCommon(event, setFieldValue);
    setFieldValue('City', '');
    setFieldValue('State', '');
    getStatesOfCountry(value);
    this.setMeetingDateTime(setFieldValue);
  };

  onChangeState = (event, setFieldValue) => {
    const { value } = event.target;
    this.onHandleChangeCommon(event, setFieldValue);
    getCitiesOfState(value);
    this.setMeetingDateTime(setFieldValue);
  };

  onHandleChangeRadioButton = (value, setFieldValue) => {
    const { params } = this.state;
    const newParams = { ...params, designers: value.value };
    this.setState({ params: newParams });
    setFieldValue('broadcastType', value.value);
    this.setMeetingDateTime(setFieldValue);
  };

  onHandleChangeBudget = (event, setFieldValue) => {
    const { name, value } = event.target;
    const { params } = this.state;
    const newBudget = { ...params.budget, [name]: value };
    const newParams = { ...params, budget: newBudget };
    this.setState({ params: newParams });
    setFieldValue('budget', newBudget);
    this.setMeetingDateTime(setFieldValue);
  };

  onHandleChangeBranch = (event, setFieldValue) => {
    const { name, value } = event.target;
    const { params } = this.state;
    const newParams = { ...params, branchId: value.id };
    this.setState({ params: newParams });
    setFieldValue(name, value);
    this.setMeetingDateTime(setFieldValue);
  };

  toggle = () => {
    this.setState(
      prevState => ({ isOpen: !prevState.isOpen }),
      () => {
        const { isOpen } = this.state;
        if (isOpen) {
          NotificationManager.success(
            '',
            'Lead successfully broadcasted.',
            999999999,
            this.onCloseNotification,
          );
        }
      },
    );
  };

  onCloseNotification = () => {
    this.toggle();
    const { history } = this.props;
    history.push({
      pathname: '/leads',
      state: history.location.state,
    });
  };

  onSubmit = values => {
    const { doUpdateLead, isFetching } = this.props;
    const { branch } = values;

    // console.log('onSubmit', values);
    doUpdateLead({ data: { ...values, status: 'broadcasted', branchId: branch.id } });
    if (!isFetching) {
      this.toggle();
    }
  };

  render() {
    const { isOpen, params } = this.state;
    const { branches, lead, isFetching } = this.props;
    if (isFetching) {
      return null;
    }

    const schema = Yup.object().shape({
      Owner: Yup.string().required('Required'),
      First_Name: Yup.string().required('Required'),
      Last_Name: Yup.string().required('Required'),
      Email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      Phone: Yup.number().required('Required'),
      Street: Yup.string().required('Required'),
      Country: Yup.string().required('Required'),
      State: Yup.string().required('Required'),
      City: Yup.string().required('Required'),
      Zip_Code: Yup.number().required('Required'),
      budget: Yup.string().required('Required'),
      service: Yup.string().required('Required'),
      branch: Yup.string().required('Required'),
      Meeting_Date_and_Time: Yup.string().required('Required'),
      broadcastType: Yup.string().required('Required'),
    });

    return (
      <div className="document">
        <Header />
        <BreadCrumb breadcrumbFirst="Manage Leads" pathName="/leads" lead={lead} />
        <Formik
          initialValues={lead}
          onSubmit={this.onSubmit}
          validationSchema={schema}
          isInitialValid={schema.isValidSync(lead)}
        >
          {({ handleSubmit, values, setFieldValue, isValid, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <div className="container">
                <h2 className="page-title">Client Requirements</h2>

                <div className="form-title">Lead Owner</div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-4">
                    <div>
                      {errors.Owner && touched.Owner ? (
                        <div className="invalid-feedback d-block">{errors.Owner}</div>
                      ) : (
                        <br />
                      )}
                      <InputGroup
                        label="Name"
                        name="Owner"
                        value={values.Owner ? values.Owner.name : ''}
                        onChange={event => this.onHandleChangeName(event, setFieldValue)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-title">Lead Info</div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-4">
                    <div>
                      {errors.First_Name && touched.First_Name ? (
                        <div className="invalid-feedback d-block">{errors.First_Name}</div>
                      ) : (
                        <br />
                      )}
                      <InputGroup
                        label="First Name"
                        name="First_Name"
                        value={values.First_Name}
                        onChange={event => this.onHandleChangeNameLead(event, setFieldValue)}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-4">
                    <div>
                      {errors.Last_Name && touched.Last_Name ? (
                        <div className="invalid-feedback d-block">{errors.Last_Name}</div>
                      ) : (
                        <br />
                      )}
                      <InputGroup
                        label="Last Name"
                        name="Last_Name"
                        value={values.Last_Name}
                        onChange={event => this.onHandleChangeNameLead(event, setFieldValue)}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-4">
                    <div>
                      {errors.Email && touched.Email ? (
                        <div className="invalid-feedback d-block">{errors.Email}</div>
                      ) : (
                        <br />
                      )}
                      <InputGroup
                        label="Email"
                        name="Email"
                        type="email"
                        value={values.Email}
                        onChange={event => this.onHandleChangeCommon(event, setFieldValue)}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-4">
                    <div>
                      {errors.Phone && touched.Phone ? (
                        <div className="invalid-feedback d-block">{errors.Phone}</div>
                      ) : (
                        <br />
                      )}
                      <InputGroup
                        type="tel"
                        label="Mobile Number"
                        name="Phone"
                        value={values.Phone}
                        onChange={event => this.onHandleChangePhone(event, setFieldValue)}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-4">
                    <div>
                      {errors.Street && touched.Street ? (
                        <div className="invalid-feedback d-block">{errors.Street}</div>
                      ) : (
                        <br />
                      )}
                      <InputGroup
                        label="Address"
                        name="Street"
                        value={values.Street}
                        onChange={event => this.onHandleChangeCommon(event, setFieldValue)}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-4">
                    <div>
                      {errors.Country && touched.Country ? (
                        <div className="invalid-feedback d-block">{errors.Country}</div>
                      ) : (
                        <br />
                      )}
                    </div>

                    <GroupSelectField
                      label="Country"
                      name="Country"
                      value={{ value: values.Country, label: values.Country }}
                      options={CONTRIES_NAME}
                      onChange={event => this.onChangeCountry(event, setFieldValue)}
                    />
                  </div>
                </div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-4">
                    <div>
                      {errors.State && touched.State ? (
                        <div className="invalid-feedback d-block">{errors.State}</div>
                      ) : (
                        <br />
                      )}
                    </div>
                    <GroupSelectField
                      label="State"
                      name="State"
                      value={{ value: values.State, label: values.State }}
                      options={STATES_NAME}
                      onChange={event => this.onChangeState(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <div>
                      {errors.Zip_Code && touched.Zip_Code ? (
                        <div className="invalid-feedback d-block">{errors.Zip_Code}</div>
                      ) : (
                        <br />
                      )}
                      <InputGroup
                        type="number"
                        label="Pin Code"
                        name="Zip_Code"
                        value={values.Zip_Code}
                        onChange={event => this.onHandleChangeCommon(event, setFieldValue)}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-4">
                    <div>
                      {errors.City && touched.City ? (
                        <div className="invalid-feedback d-block">{errors.City}</div>
                      ) : (
                        <br />
                      )}
                    </div>
                    <GroupSelectField
                      label="City"
                      name="City"
                      value={{ value: values.City, label: values.City }}
                      options={CITIES_NAME}
                      onChange={event => this.onHandleChangeCommon(event, setFieldValue)}
                    />
                  </div>
                </div>
                <div className="form-title">
                  Budget
                  {' '}
                  {errors.budget && touched.budget ? (
                    <div className="invalid-feedback d-inline">{errors.budget}</div>
                  ) : (
                    ''
                  )}
                </div>

                <div className="form-row form-row-detail">
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Low"
                      name="type"
                      type="checkbox"
                      value="low"
                      checked={values.budget ? values.budget.type === 'low' : false}
                      onChange={event => this.onHandleChangeBudget(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Medium"
                      name="type"
                      type="checkbox"
                      value="medium"
                      checked={values.budget ? values.budget.type === 'medium' : false}
                      onChange={event => this.onHandleChangeBudget(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="High"
                      name="type"
                      type="checkbox"
                      value="high"
                      checked={values.budget ? values.budget.type === 'high' : false}
                      onChange={event => this.onHandleChangeBudget(event, setFieldValue)}
                    />
                  </div>
                </div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-4">
                    <InputGroup
                      type="number"
                      label="Enter budget amount (if available)"
                      name="amount"
                      value={values.budget ? values.budget.amount : ''}
                      onChange={event => this.onHandleChangeBudget(event, setFieldValue)}
                    />
                  </div>
                </div>
                <div className="form-title">
                  Services Required
                  {' '}
                  {errors.service && touched.service ? (
                    <div className="invalid-feedback d-inline">{errors.service}</div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Home"
                      name="service"
                      type="checkbox"
                      value="Home"
                      checked={!values.service ? false : values.service.find(se => se === 'Home')}
                      onChange={event => this.onChangeCheckboxServices(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Kitchen"
                      name="service"
                      type="checkbox"
                      value="Kitchen"
                      checked={
                        !values.service ? false : values.service.find(se => se === 'Kitchen')
                      }
                      onChange={event => this.onChangeCheckboxServices(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Dining room"
                      name="service"
                      type="checkbox"
                      id="DiningRoom"
                      value="DiningRoom"
                      checked={
                        !values.service ? false : values.service.find(se => se === 'DiningRoom')
                      }
                      onChange={event => this.onChangeCheckboxServices(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Dining room"
                      name="service"
                      type="checkbox"
                      id="DiningRoom2"
                      value="DiningRoom2"
                      checked={
                        !values.service ? false : values.service.find(se => se === 'DiningRoom2')
                      }
                      onChange={event => this.onChangeCheckboxServices(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Living Room"
                      name="service"
                      type="checkbox"
                      id="LivingRoom"
                      value="LivingRoom"
                      checked={
                        !values.service ? false : values.service.find(se => se === 'LivingRoom')
                      }
                      onChange={event => this.onChangeCheckboxServices(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Bedroom"
                      name="service"
                      type="checkbox"
                      id="Bedroom"
                      value="Bedroom"
                      checked={
                        !values.service ? false : values.service.find(se => se === 'Bedroom')
                      }
                      onChange={event => this.onChangeCheckboxServices(event, setFieldValue)}
                    />
                  </div>
                </div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-7">
                    <InputGroup
                      label="Special instructions (optional)"
                      name="serviceOption"
                      value={values.serviceOption}
                      onChange={event => this.onHandleChangeCommon(event, setFieldValue)}
                    />
                  </div>
                </div>
                <div className="form-title">
                  Experience Center
                  {' '}
                  {errors.branch && touched.branch ? (
                    <div className="invalid-feedback d-inline">{errors.branch}</div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-4">
                    <GroupSelectField
                      label="Select Branch"
                      name="branch"
                      options={branches}
                      getOptionLabel={option => option.name}
                      getOptionValue={option => option.id}
                      value={values.branch}
                      onChange={event => this.onHandleChangeBranch(event, setFieldValue)}
                      isOptionSelected={option => values.branch === option.id}
                    />
                  </div>
                  <div className="form-group col-md-5">
                    <div className="box-alert">
                      <div className="box-alert__inner">
                        <IconHand className="box-alert__icon" />
                        IMPORTANT: PLEASE DOUBLE CHECK BRANCH WITH THE CLIENT. CHANGING BRANCH WILL
                        BROADCAST THE LEAD TO THAT BRANCH.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-title">
                  Meeting Availability
                  {(errors.date || errors.time) && (touched.date || touched.time) ? (
                    <div className="invalid-feedback d-inline">{errors.date || errors.time}</div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-12">
                    <div className="meetingAvailability">
                      <div className="form-row form-row-detail">
                        <div className="form-group col-md-6">
                          <SelectDate
                            value={values.date}
                            initialDate={
                              params.Meeting_Date_and_Time
                                ? params.Meeting_Date_and_Time.split('T')[0]
                                : ''
                            }
                            onDateChange={date => this.onDateChange(date, setFieldValue)}
                          />
                        </div>
                        <div
                          className="form-group col-md-6"
                          style={{ borderLeft: '1px solid  #a5a7aa' }}
                        >
                          <SelectTime
                            dateSelect={params.Meeting_Date_and_Time.split('T')[0]}
                            initialTime={
                              params.Meeting_Date_and_Time
                                ? params.Meeting_Date_and_Time.split('T')[1]
                                : ''
                            }
                            value={params.time}
                            onTimeChange={time => this.onTimeChange(time, setFieldValue)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h2 className="page-title">Broadcast Options</h2>
                <div className="form-title">
                  Select Designer
                  {' '}
                  {errors.broadcastType && touched.broadcastType ? (
                    <div className="invalid-feedback d-inline">{errors.broadcastType}</div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="form-row form-row-detail">
                  <div className="col-md-12">
                    <RadioButton
                      options={RADIO_DESIGNER}
                      branch={values.branch}
                      value={values.broadcastType}
                      onChange={value => this.onHandleChangeRadioButton(value, setFieldValue)}
                      selectedOption={values.broadcastType}
                    />
                  </div>
                </div>
              </div>
              <Footer isValid={isValid} dateTime={params.Meeting_Date_and_Time} />
            </form>
          )}
        </Formik>
        <Notification isOpen={isOpen}>
          <NotificationContainer />
        </Notification>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  isFetching: getFetchingState(store),
  branches: getBranchesState(store),
  lead: getLeadByIdState(store),
});

const mapDispatchToProps = dispatch => ({
  doGetLeadById: evt => dispatch(getLeadById(evt)),
  doUpdateLead: evt => dispatch(updateLead(evt)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'leadDetailReducer', reducer });
const withSaga = injectSaga({ key: 'leadDetailSaga', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SalesDetail);
