import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import { Formik } from 'formik';
import * as Yup from 'yup';
import 'react-dates/initialize';
import moment from 'moment';
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
import {
  CONTRIES_NAME,
  STATES_NAME,
  CITIES_NAME,
  getStatesOfCountry,
  getCitiesOfState,
  RADIO_DESIGNER,
} from './constant';
import 'pages/ManageLead/styles.scss';

/* eslint-disable */
const optionsExperience = [
  { value: 'all', label: 'All Users' },
  { value: 'Name', label: 'Name' },
  { value: 'Branch', label: 'Branch' },
];

class SalesDetail extends Component {
  constructor() {
    super();
    this.state = {
      params: {
        firstName: '',
        lastName: '',
        email: '',
        date: moment().format('DD/MM/YYYY'),
        time: '10:00 AM',
        budget: 'high',
        budgetAmount: 'asdfasdf',
        services: ['Kitchen', 'DiningRoom', 'Home'],
      },

      isOpen: false,
      lead: {},
    };
  }

  componentDidMount() {
  }

  /* This function handleOnChange for common component */
  onHandleChangeCommon = (event, setFieldValue) => {
    const { name, value } = event.target;
    const { params } = this.state;
    const newParams = { ...params, [name]: value };
    this.setState({ params: newParams });
    setFieldValue(name, value);
  };

  onDateChange = (date, setFieldValue) => {
    const { params } = this.state;
    const newParams = { ...params, date: date.format('DD/MM/YYYY') };
    this.setState({ params: newParams });
    setFieldValue('date', date.format('DD/MM/YYYY'));
  };

  onTimeChange = (timeValue, setFieldValue) => {
    const { params } = this.state;
    const newParams = { ...params, time: timeValue };
    this.setState({ params: newParams });
    setFieldValue('time', timeValue);
  };

  onChangeCheckboxServices = (event, setFieldValue) => {
    const { params } = this.state;
    const { name, checked, value } = event.target;
    let newService = [...params.services];
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
    setFieldValue('city', '');
    setFieldValue('state', '');
    getStatesOfCountry(value);
  };

  onChangeState = (event, setFieldValue) => {
    const { value } = event.target;
    this.onHandleChangeCommon(event, setFieldValue);
    getCitiesOfState(value);
  };

  toggle = () => {
    this.setState(
      prevState => ({ isOpen: !prevState.isOpen }),
      () => {
        if (this.state.isOpen) {
          NotificationManager.success('', 'Lead successfully broadcasted.', 999999999, this.toggle);
        }
      }
    );
  };

  onSubmit = values => {
    this.toggle();
    console.log('this.state.params', this.state.params);
    console.log('onSubmit', values);
  };

  render() {
    const { isOpen, time, lead, params } = this.state;
    return (
      <div className="document">
        <Header />
        <BreadCrumb lead={lead} />
        <div className="container">
          <h2 className="page-title">Client Requirements</h2>
          <Formik
            initialValues={params}
            onSubmit={this.onSubmit}
            validationSchema={Yup.object().shape({
              firstName: Yup.string().required('Required'),
              lastName: Yup.string().required('Required'),
              email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
              mobileNumber: Yup.number().required('Required'),
              address: Yup.string().required('Required'),
              country: Yup.string().required('Required'),
              state: Yup.string().required('Required'),
              city: Yup.string().required('Required'),
              pinCode: Yup.number().required('Required'),
              budget: Yup.string().required('Required'),
              services: Yup.string().required('Required'),
              branch: Yup.string().required('Required'),
              date: Yup.string().required('Required'),
              time: Yup.string().required('Required'),
              designers: Yup.string().required('Required'),
            })}
          >
            {({ handleSubmit, values, handleChange, setFieldValue, isValid, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <div className="form-title">Contact Info</div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-4">
                    <div>
                      {errors.firstName && touched.firstName ? (
                        <div className="invalid-feedback d-block">{errors.firstName}</div>
                      ) : (
                        <br />
                      )}
                      <InputGroup
                        label="First Name"
                        name="firstName"
                        value={values.firstName}
                        onChange={event => this.onHandleChangeCommon(event, setFieldValue)}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-4">
                    <div>
                      {errors.lastName && touched.lastName ? (
                        <div className="invalid-feedback d-block">{errors.lastName}</div>
                      ) : (
                        <br />
                      )}
                      <InputGroup
                        label="Last Name"
                        name="lastName"
                        value={values.lastName}
                        onChange={event => this.onHandleChangeCommon(event, setFieldValue)}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-4">
                    <div>
                      {errors.email && touched.email ? (
                        <div className="invalid-feedback d-block">{errors.email}</div>
                      ) : (
                        <br />
                      )}
                      <InputGroup
                        label="Email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={event => this.onHandleChangeCommon(event, setFieldValue)}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-4">
                    <div>
                      {errors.lastName && touched.lastName ? (
                        <div className="invalid-feedback d-block">{errors.lastName}</div>
                      ) : (
                        <br />
                      )}
                      <InputGroup
                        type="number"
                        label="Mobile Number"
                        name="mobileNumber"
                        value={values.mobileNumber}
                        onChange={event => this.onHandleChangeCommon(event, setFieldValue)}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-4">
                    <div>
                      {errors.address && touched.address ? (
                        <div className="invalid-feedback d-block">{errors.address}</div>
                      ) : (
                        <br />
                      )}
                      <InputGroup
                        label="Address"
                        name="address"
                        value={values.address}
                        onChange={event => this.onHandleChangeCommon(event, setFieldValue)}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-4">
                    <div>
                      {errors.city && touched.city ? (
                        <div className="invalid-feedback d-block">{errors.city}</div>
                      ) : (
                        <br />
                      )}
                    </div>
                    <GroupSelectField
                      label="City"
                      name="city"
                      value={{ value: values.city, label: values.city }}
                      options={CITIES_NAME}
                      onChange={event => this.onHandleChangeCommon(event, setFieldValue)}
                    />
                  </div>
                </div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-4">
                    <div>
                      {errors.state && touched.state ? (
                        <div className="invalid-feedback d-block">{errors.state}</div>
                      ) : (
                        <br />
                      )}
                    </div>
                    <GroupSelectField
                      label="State"
                      name="state"
                      value={{ value: values.state, label: values.state }}
                      options={STATES_NAME}
                      onChange={event => this.onChangeState(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <div>
                      {errors.pinCode && touched.pinCode ? (
                        <div className="invalid-feedback d-block">{errors.pinCode}</div>
                      ) : (
                        <br />
                      )}
                      <InputGroup
                        type="number"
                        label="Pin Code"
                        name="pinCode"
                        value={values.pinCode}
                        onChange={event => this.onHandleChangeCommon(event, setFieldValue)}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-4">
                    <div>
                      {errors.country && touched.country ? (
                        <div className="invalid-feedback d-block">{errors.country}</div>
                      ) : (
                        <br />
                      )}
                    </div>

                    <GroupSelectField
                      label="Country"
                      name="country"
                      value={{ values: values.country, label: values.country }}
                      options={CONTRIES_NAME}
                      onChange={event => this.onChangeCountry(event, setFieldValue)}
                    />
                  </div>
                </div>
                <div className="form-title">
                  Budget{' '}
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
                      name="budget"
                      type="checkbox"
                      value="low"
                      checked={values.budget === 'low'}
                      onChange={event => this.onHandleChangeCommon(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Medium"
                      name="budget"
                      type="checkbox"
                      value="medium"
                      checked={values.budget === 'medium'}
                      onChange={event => this.onHandleChangeCommon(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="High"
                      name="budget"
                      type="checkbox"
                      value="high"
                      checked={values.budget === 'high'}
                      onChange={event => this.onHandleChangeCommon(event, setFieldValue)}
                    />
                  </div>
                </div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-4">
                    <InputGroup
                      label="Enter budget amount (if available)"
                      name="budgetAmount"
                      value={values.budgetAmount}
                      onChange={event => this.onHandleChangeCommon(event, setFieldValue)}
                    />
                  </div>
                </div>
                <div className="form-title">
                  Services Required{' '}
                  {errors.services && touched.services ? (
                    <div className="invalid-feedback d-inline">{errors.services}</div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Home"
                      name="services"
                      type="checkbox"
                      value="Home"
                      checked={values.services.find(se => se === 'Home') ? true : false}
                      onChange={event => this.onChangeCheckboxServices(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Kitchen"
                      name="services"
                      type="checkbox"
                      value="Kitchen"
                      checked={values.services.find(se => se === 'Kitchen') ? true : false}
                      onChange={event => this.onChangeCheckboxServices(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Dining room"
                      name="services"
                      type="checkbox"
                      id="DiningRoom"
                      value="DiningRoom"
                      checked={values.services.find(se => se === 'DiningRoom') ? true : false}
                      onChange={event => this.onChangeCheckboxServices(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Dining room"
                      name="services"
                      type="checkbox"
                      id="DiningRoom2"
                      value="DiningRoom2"
                      checked={values.services.find(se => se === 'DiningRoom2') ? true : false}
                      onChange={event => this.onChangeCheckboxServices(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Living Room"
                      name="services"
                      type="checkbox"
                      id="LivingRoom"
                      value="LivingRoom"
                      checked={values.services.find(se => se === 'LivingRoom') ? true : false}
                      onChange={event => this.onChangeCheckboxServices(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Bedroom"
                      name="services"
                      type="checkbox"
                      id="Bedroom"
                      value="Bedroom"
                      checked={values.services.find(se => se === 'Bedroom') ? true : false}
                      onChange={event => this.onChangeCheckboxServices(event, setFieldValue)}
                    />
                  </div>
                </div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-7">
                    <InputGroup
                      label="Special instructions (optional)"
                      name="servicesSpecial"
                      value={values.servicesSpecial}
                      onChange={event => this.onHandleChangeCommon(event, setFieldValue)}
                    />
                  </div>
                </div>
                <div className="form-title">
                  Experience Center{' '}
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
                      options={optionsExperience}
                      value={{ value: values.branch, label: values.branch }}
                      onChange={event => this.onHandleChangeCommon(event, setFieldValue)}
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
                <div className="form-row form-row-detail meetingAvailability">
                  <div className="form-group col-md-6">
                    <SelectDate
                      value={values.date}
                      onDateChange={date => this.onDateChange(date, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-6" style={{ borderLeft: '1px solid  #a5a7aa' }}>
                    <SelectTime
                      initialTime={params.time}
                      value={values.time}
                      onTimeChange={time => this.onTimeChange(time, setFieldValue)}
                    />
                  </div>
                </div>
                <h2 className="page-title">Broadcast Options</h2>
                <div className="form-title">
                  Select Designer{' '}
                  {errors.designers && touched.designers ? (
                    <div className="invalid-feedback d-inline">{errors.designers}</div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-12">
                    <RadioButton
                      label="All Designers in 1MG Experience Center"
                      options={RADIO_DESIGNER}
                      value={values.designers}
                      onChange={() => this.onHandleChangeCommon(event, setFieldValue)}
                      selectedOption={values.designers}
                    />
                  </div>
                </div>
                <Footer isValid={isValid} />
              </form>
            )}
          </Formik>
        </div>
        <Notification isOpen={isOpen}>
          <NotificationContainer />
        </Notification>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  // dataLeads: getLeadsState(store),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(SalesDetail);
