import React, { Component } from 'react';
import { Formik } from 'formik';
import 'react-dates/initialize';
import Header from 'components/common/header';
import Footer from 'components/LeadDetail/footer';
import BreadCrumb from 'components/LeadDetail/breadcrumb';
import InputGroup from 'components/common/form/GroupInput';
import GroupSelectField from 'components/common/form/GroupSelect';
import IconHand from 'components/common/icon/IconHand';
import SelectDate from 'components/LeadDetail/time/SelectDate';
import SelectTime from 'components/LeadDetail/time/SelectTime';
import { CONTRIES_NAME, STATES_NAME, CITIES_NAME, getStatesOfCountry, getCitiesOfState } from './constant';
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
      date: new Date(),
      time: {
        hour: 10,
        minute: 0,
        type: 'AM',
      },
      burget: [],
      services: [],
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
    const newTime = { ...time, ...timeValue, type: newType };
    this.setState({ time: newTime });
    setFieldValue('time', newTime);
    console.log(newTime);
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
    const { burget } = this.state;
    const newState = this.updateStateCheckbox(event, burget, setFieldValue);
    this.setState({ burget: [...newState] });
  };

  onChangeCheckboxServices = (event, setFieldValue) => {
    const { services } = this.state;
    const newState = this.updateStateCheckbox(event, services, setFieldValue);
    this.setState({ services: [...newState] });
  };

  onSubmit = values => {
    console.log('onSubmit', values);
  };

  onChangeCountry = (event, setFieldValue) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
    getStatesOfCountry(value);
    // console.log(event);
  };

  onChangeCountry = (event, setFieldValue) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
    getStatesOfCountry(value);
    // console.log(event);
  };

  onChangeState = (event, setFieldValue) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
    getCitiesOfState(value);
    // console.log(event);
  };

  render() {
    // const { contactInfo } = this.state;
    // console.log(contactInfo);
    return (
      <div className="document">
        <Header />
        <BreadCrumb />
        <div className="container">
          <h2 className="page-title">Client Requirements</h2>
          <Formik onSubmit={this.onSubmit}>
            {({ handleSubmit, values, handleChange, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <div className="form-title">Contact Info</div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-4">
                    <InputGroup
                      label="First Name"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <InputGroup
                      label="Last Name"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <InputGroup
                      label="Email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-4">
                    <InputGroup
                      type="number"
                      label="Mobile Number"
                      name="mobileNumber"
                      value={values.mobileNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <InputGroup
                      label="Address"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-4">
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
                    <GroupSelectField
                      label="State"
                      name="state"
                      value={{ value: values.state, label: values.state }}
                      options={STATES_NAME}
                      onChange={event => this.onChangeState(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <InputGroup
                      type="number"
                      label="Pin Code"
                      name="pinCode"
                      value={values.pinCode}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <GroupSelectField
                      label="Country"
                      name="country"
                      value={{ values: values.country, label: values.country }}
                      options={CONTRIES_NAME}
                      onChange={event => this.onChangeCountry(event, setFieldValue)}
                    />
                  </div>
                </div>
                <div className="form-title">Budget</div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Low"
                      name="budget"
                      type="checkbox"
                      id="Low"
                      value={values.budget}
                      onChange={event => this.onChangeCheckboxBudget(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Medium"
                      name="budget"
                      type="checkbox"
                      id="Medium"
                      value={values.budget}
                      onChange={event => this.onChangeCheckboxBudget(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="High"
                      name="budget"
                      type="checkbox"
                      id="High"
                      value={values.budget}
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
                <div className="form-title">Services Required</div>
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
                      name="SpecialInstructions"
                      value={values.specialIntructions}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-title">Experience Center</div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-4">
                    <GroupSelectField
                      label="Select Branch"
                      name="branch"
                      options={optionsExperience}
                      value={values.branch}
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
                <div className="form-title">Meeting Availability</div>
                <div className="form-row form-row-detail meetingAvailability">
                  <div className="form-group col-md-6">
                    <SelectDate
                      value={values.date}
                      onDateChange={date => this.onDateChange(date, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-6" style={{ borderLeft: '1px solid  #a5a7aa' }}>
                    <SelectTime
                      value={values.time}
                      onTimeChange={time => this.onTimeChange(time, setFieldValue)}
                    />
                  </div>
                </div>
                <h2 className="page-title">Broadcast Options</h2>
                <div className="form-title">Select Designer</div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-4">
                    <InputGroup
                      type="radio"
                      label="All Designers in 1MG Experience Center"
                      name="Designers"
                    />
                  </div>
                </div>
                <Footer />
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default SalesDetail;
