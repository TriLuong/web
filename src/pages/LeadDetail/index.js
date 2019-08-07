import React, { Component } from 'react';
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
      date: moment()._d,
      time: {
        hour: 1,
        minute: 0,
        type: 'PM',
      },
      services: [],
      isOpen: false,
    };
  }

  onDateChange = (date, setFieldValue) => {
    this.setState({ date: date._d });
    setFieldValue('date', date._d);
    console.info('onDateChange', date._d);
  };

  onTimeChange = (timeValue, setFieldValue) => {
    const { time } = this.state;
    let newType = '';
    if (timeValue.hour === 10 || timeValue.hour === 11) {
      newType = 'AM';
    } else {
      newType = 'PM';
    }
    const newTime = { ...time, ...timeValue };
    this.setState({ time: newTime });
    setFieldValue('time', newTime);
    // console.log(newTime);
  };

  updateStateCheckbox = (event, field, setFieldValue) => {
    const { name, checked, id } = event.target;
    const value = checked ? id : null;
    let newState = [];
    const newIndex = field.findIndex(i => i === id);
    if (newIndex === -1) {
      newState = [...field, value];
    } else {
      newState = [...field];
      newState.splice(newIndex, 1);
    }
    setFieldValue(name, newState);
    return newState;
  };

  onChangeCheckboxBudget = (event, setFieldValue) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
  };

  onChangeCheckboxServices = (event, setFieldValue) => {
    const { services } = this.state;
    const newState = this.updateStateCheckbox(event, services, setFieldValue);
    this.setState({ services: [...newState] });
  };

  onChangeCountry = (event, setFieldValue) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
    setFieldValue('city', '');
    setFieldValue('state', '');
    getStatesOfCountry(value);
    // console.log(event);
  };

  onChangeState = (event, setFieldValue) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
    getCitiesOfState(value);
    // console.log(event);
  };

  onChangeDesigner = (event, setFieldValue) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
    // console.info('onChangeDesigner', event.target);
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
    console.log('onSubmit', values);
  };

  render() {
    const { isOpen, time } = this.state;
    return (
      <div className="document">
        <Header />
        <BreadCrumb />
        <div className="container">
          <h2 className="page-title">Client Requirements</h2>
          <Formik
            initialValues={this.state}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                      onChange={handleChange}
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
                        onChange={handleChange}
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
                      onChange={event => this.onChangeCheckboxBudget(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Medium"
                      name="budget"
                      type="checkbox"
                      value="medium"
                      checked={values.budget === 'medium'}
                      onChange={event => this.onChangeCheckboxBudget(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="High"
                      name="budget"
                      type="checkbox"
                      value="high"
                      checked={values.budget === 'high'}
                      onChange={event => this.onChangeCheckboxBudget(event, setFieldValue)}
                    />
                  </div>
                </div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-4">
                    <InputGroup
                      label="Enter budget amount (if available)"
                      name="budgetAmount"
                      value={values.budgetAmount}
                      onChange={handleChange}
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
                      id="Home"
                      value={values.services}
                      onChange={event => this.onChangeCheckboxServices(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Kitchen"
                      name="services"
                      type="checkbox"
                      id="Kitchen"
                      value={values.services}
                      onChange={event => this.onChangeCheckboxServices(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Dining room"
                      name="services"
                      type="checkbox"
                      id="DiningRoom"
                      value={values.services}
                      onChange={event => this.onChangeCheckboxServices(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Dining room"
                      name="services"
                      type="checkbox"
                      id="DiningRoom2"
                      value={values.services}
                      onChange={event => this.onChangeCheckboxServices(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Living Room"
                      name="services"
                      type="checkbox"
                      id="LivingRoom"
                      value={values.services}
                      onChange={event => this.onChangeCheckboxServices(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Bedroom"
                      name="services"
                      type="checkbox"
                      id="Bedroom"
                      value={values.services}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      initialTime={time}
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
                      onChange={() => this.onChangeDesigner(event, setFieldValue)}
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

export default SalesDetail;
