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
      firstName: '',
      lastName: '',
      date: moment().format('YYYY-MM-DD'),
      time: '10:00',
      isOpen: false,
    };
  }

  /* eslint  react/prop-types: 0 */
  componentDidMount() {
    const { doGetLeadById, match } = this.props;
    doGetLeadById({ id: match.params.id });
    // this.setState({
    //   firstName: lead.Owner.name.split(' ')[0],
    //   lastName: lead.Owner.name.split(' ')[1],
    // });
  }

  /* This function handleOnChange for common component */
  onHandleChangeCommon = (event, setFieldValue) => {
    const { name, value } = event.target;
    const { params } = this.state;
    const newParams = { ...params, [name]: value };
    this.setState({ params: newParams });
    setFieldValue(name, value);
  };

  onHandleChangeName = (event, setFieldValue) => {
    const { name, value } = event.target;
    const { firstName, lastName, params } = this.state;
    const valueFirstName = name === 'firstName' ? value : firstName;
    const valueLastName = name === 'lastName' ? value : lastName;

    const newOwnerName = { ...params.Owner, name: `${valueFirstName} ${valueLastName}` };
    const newParams = { ...params, Owner: newOwnerName };
    this.setState({ [name]: value, params: newParams });

    setFieldValue('Owner', newOwnerName);
    // console.info('onHandleChangeName');
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
  };

  onChangeCountry = (event, setFieldValue) => {
    const { value } = event.target;
    this.onHandleChangeCommon(event, setFieldValue);
    setFieldValue('City', '');
    setFieldValue('State', '');
    getStatesOfCountry(value);
  };

  onChangeState = (event, setFieldValue) => {
    const { value } = event.target;
    this.onHandleChangeCommon(event, setFieldValue);
    getCitiesOfState(value);
  };

  onHandleChangeRadioButton = (value, setFieldValue) => {
    // console.log('onHandleChangeRadioButton', value);
    const { params } = this.state;
    const newParams = { ...params, designers: value.value };
    // console.log('newParams', newParams);
    this.setState({ params: newParams });
    setFieldValue('broadcastType', value.value);
  };

  onHandleChangeBudget = (event, setFieldValue) => {
    const { name, value } = event.target;
    const { params } = this.state;
    const newBudget = { ...params.budget, [name]: value };
    // console.log('newBudget', newBudget);
    const newParams = { ...params, budget: newBudget };
    this.setState({ params: newParams });
    setFieldValue('budget', newBudget);
  };

  onHandleChangeBranch = (event, setFieldValue) => {
    const { name, value } = event.target;
    const { params } = this.state;
    const newParams = { ...params, branchId: value.id };
    this.setState({ params: newParams });
    setFieldValue(name, value.id);
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
    history.goBack();
  };

  onSubmit = values => {
    const { doUpdateLead } = this.props;
    const { params } = this.state;
    // const newParams = {...params, status: "broadcasted" };
    // this.setState({ params: newParams });
    doUpdateLead({ data: { ...values, status: 'broadcasted' } });
    this.toggle();
    console.log('this.state.params', params);
    // console.log('this.state', this.state);
    console.log('onSubmit', values);
  };

  render() {
    const { isOpen } = this.state;
    const { branches, lead, isFetching } = this.props;
    if (isFetching) {
      return null;
    }
    return (
      <div className="document">
        <Header />
        <BreadCrumb lead={lead} />
        <Formik
          initialValues={lead}
          onSubmit={this.onSubmit}
          validationSchema={Yup.object().shape({
            // Full_Name: Yup.string().required('Required'),
            // lastName: Yup.string().required('Required'),
            // Email: Yup.string()
            //   .email('Invalid email address')
            //   .required('Required'),
            // Phone: Yup.string().required('Required'),
            // Street: Yup.string().required('Required'),
            // Country: Yup.string().required('Required'),
            // State: Yup.string().required('Required'),
            // City: Yup.string().required('Required'),
            // Zip_Code: Yup.number().required('Required'),
            // budget: Yup.string().required('Required'),
            // services: Yup.string().required('Required'),
            // branch: Yup.string().required('Required'),
            // date: Yup.string().required('Required'),
            // time: Yup.string().required('Required'),
            // designers: Yup.string().required('Required'),
          })}
        >
          {({ handleSubmit, values, setFieldValue, isValid, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <div className="container">
                <h2 className="page-title">Client Requirements</h2>

                <div className="form-title">Contact Info</div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-4">
                    <div>
                      {errors.Owner && touched.Owner ? (
                        <div className="invalid-feedback d-block">{errors.Owner}</div>
                      ) : (
                        <br />
                      )}
                      <InputGroup
                        label="First Name"
                        name="firstName"
                        value={values.Owner ? values.Owner.name.split(' ')[0] : ''}
                        onChange={event => this.onHandleChangeName(event, setFieldValue)}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-4">
                    <div>
                      {errors.Owner && touched.Owner ? (
                        <div className="invalid-feedback d-block">{errors.Owner}</div>
                      ) : (
                        <br />
                      )}
                      <InputGroup
                        label="Last Name"
                        name="lastName"
                        value={values.Owner ? values.Owner.name.split(' ')[1] : ''}
                        onChange={event => this.onHandleChangeName(event, setFieldValue)}
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
                        type="text"
                        label="Mobile Number"
                        name="Phone"
                        value={values.Phone}
                        onChange={event => this.onHandleChangeCommon(event, setFieldValue)}
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
                      {errors.Country && touched.Country ? (
                        <div className="invalid-feedback d-block">{errors.Country}</div>
                      ) : (
                        <br />
                      )}
                    </div>

                    <GroupSelectField
                      label="Country"
                      name="Country"
                      value={{ values: values.Country, label: values.Country }}
                      options={CONTRIES_NAME}
                      onChange={event => this.onChangeCountry(event, setFieldValue)}
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
                  {errors.branchId && touched.branchId ? (
                    <div className="invalid-feedback d-inline">{errors.branchId}</div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-4">
                    <GroupSelectField
                      label="Select Branch"
                      name="branchId"
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
                        values.Meeting_Date_and_Time
                          ? values.Meeting_Date_and_Time.split('T')[0]
                          : ''
                      }
                            onDateChange={date => this.onDateChange(date, setFieldValue)}
                          />
                        </div>
                        <div className="form-group col-md-6" style={{ borderLeft: '1px solid  #a5a7aa' }}>
                          <SelectTime
                            initialTime={
                        values.Meeting_Date_and_Time
                          ? values.Meeting_Date_and_Time.split('T')[1]
                          : ''
                      }
                            value={values.time}
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
                      label="All Designers in 1MG Experience Center"
                      options={RADIO_DESIGNER}
                      value={values.broadcastType}
                      onChange={value => this.onHandleChangeRadioButton(value, setFieldValue)}
                      selectedOption={values.broadcastType}
                    />
                  </div>
                </div>
              </div>
              <Footer isValid={isValid} dateTime={values.Meeting_Date_and_Time} />
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
