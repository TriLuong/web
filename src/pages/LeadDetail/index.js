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
import { getBranchesState, getLeadState } from 'pages/ManageLead/selectors';
// import { getBranches } from 'pages/ManageLead/actions';
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
        date: moment().format('DD/MM/YYYY'),
        time: '10:00 AM',
        budget: '',
        budgetAmount: '',
        services: [],
      },
      firstName: '',
      lastName: '',
      isOpen: false,
    };
  }

  /* eslint  react/prop-types: 0 */
  componentDidMount() {
    const { lead } = this.props;
    const { params } = this.state;
    const initParams = { ...params, ...lead };
    this.setState({
      firstName: lead.Full_Name.split(' ')[0],
      lastName: lead.Full_Name.split(' ')[1],
      params: initParams,
    });
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

    const newFullName = `${valueFirstName} ${valueLastName}`;
    const newParams = { ...params, Full_Name: newFullName };
    this.setState({ [name]: value, params: newParams });

    setFieldValue('Full_Name', newFullName);
    // console.info('onHandleChangeName');
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
    const newService = [...params.services];
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
    setFieldValue('designers', value.value);
  };

  toggle = () => {
    this.setState(
      prevState => ({ isOpen: !prevState.isOpen }),
      () => {
        const { isOpen } = this.state;
        if (isOpen) {
          NotificationManager.success('', 'Lead successfully broadcasted.', 999999999, this.toggle);
        }
      },
    );
  };

  onSubmit = values => {
    this.toggle();
    const { params } = this.state;
    console.log('this.state.params', params);
    console.log('onSubmit', values);
  };

  render() {
    const { isOpen, params } = this.state;
    const { branches, lead } = this.props;
    return (
      <div className="document">
        <Header />
        <BreadCrumb lead={lead} />
        <div className="container">
          <h2 className="page-title">Client Requirements</h2>
          <Formik
            initialValues={lead}
            onSubmit={this.onSubmit}
            validationSchema={Yup.object().shape({
              // Full_Name: Yup.string().required('Required'),
              // lastName: Yup.string().required('Required'),
              // email: Yup.string()
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
                <div className="form-title">Contact Info</div>
                <div className="form-row form-row-detail">
                  <div className="form-group col-md-4">
                    <div>
                      {errors.Full_Name && touched.Full_Name ? (
                        <div className="invalid-feedback d-block">{errors.Full_Name}</div>
                      ) : (
                        <br />
                      )}
                      <InputGroup
                        label="First Name"
                        name="firstName"
                        value={values.Full_Name.split(' ')[0]}
                        onChange={event => this.onHandleChangeName(event, setFieldValue)}
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
                        value={values.Full_Name.split(' ')[1]}
                        onChange={event => this.onHandleChangeName(event, setFieldValue)}
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
                      {errors.lastName && touched.lastName ? (
                        <div className="invalid-feedback d-block">{errors.lastName}</div>
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
                      {errors.address && touched.address ? (
                        <div className="invalid-feedback d-block">{errors.address}</div>
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
                      {errors.city && touched.city ? (
                        <div className="invalid-feedback d-block">{errors.city}</div>
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
                      {errors.state && touched.state ? (
                        <div className="invalid-feedback d-block">{errors.state}</div>
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
                      {errors.pinCode && touched.pinCode ? (
                        <div className="invalid-feedback d-block">{errors.pinCode}</div>
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
                  Services Required
                  {' '}
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
                      checked={
                        !values.services ? false : !!values.services.find(se => se === 'Home')
                      }
                      onChange={event => this.onChangeCheckboxServices(event, setFieldValue)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <InputGroup
                      label="Kitchen"
                      name="services"
                      type="checkbox"
                      value="Kitchen"
                      checked={
                        !values.services ? false : !!values.services.find(se => se === 'Kitchen')
                      }
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
                      checked={
                        !values.services ? false : !!values.services.find(se => se === 'DiningRoom')
                      }
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
                      checked={
                        !values.services
                          ? false
                          : !!values.services.find(se => se === 'DiningRoom2')
                      }
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
                      checked={
                        !values.services ? false : !!values.services.find(se => se === 'LivingRoom')
                      }
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
                      checked={
                        !values.services ? false : !!values.services.find(se => se === 'Bedroom')
                      }
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
                      onChange={event => this.onHandleChangeCommon(event, setFieldValue)}
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
                  Select Designer
                  {' '}
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
                      onChange={value => this.onHandleChangeRadioButton(value, setFieldValue)}
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
  branches: getBranchesState(store),
  lead: getLeadState(store),
});

const mapDispatchToProps = () => ({
  // doGetBranches: evt => dispatch(getBranches(evt)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SalesDetail);
