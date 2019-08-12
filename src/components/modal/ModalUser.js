import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { InputGroup, GroupSelectField } from 'components/common/form/';
import { USER_TYPE, TYPE_DESIGNER } from 'pages/ManageUser/constants';
import ModalBase from './ModalBase';

/* eslint react/prop-types: 0 */
class ModalUser extends React.PureComponent {
  onHandleChange = (event, setFieldValue) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
  };

  render() {
    const { onSubmit, user = {}, branches, ...rest } = this.props;
    const init = user && user.role === 'sale' ? { ...user, type: '' } : user;
    return (
      <ModalBase className="modal-user" {...rest}>
        <Formik
          initialValues={init}
          onSubmit={onSubmit}
          validationSchema={Yup.object().shape({
            branch: Yup.string().required('Required'),
            role: Yup.string().required('Required'),
            type: Yup.string(),
          })}
        >
          {({ isValid, handleChange, setFieldValue, handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <InputGroup
                    name="firstName"
                    label="First Name"
                    value={values.firstName || ''}
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <InputGroup
                    name="lastName"
                    label="Last Name"
                    value={values.lastName || ''}
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <InputGroup
                    name="email"
                    label="Email Address"
                    value={values.email || ''}
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <GroupSelectField
                    name="branch"
                    label="Select Branch"
                    options={branches}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => `${option.id}`}
                    onChange={event => this.onHandleChange(event, setFieldValue)}
                    value={values.branch}
                    isOptionSelected={option => values.branch === option.id}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <GroupSelectField
                    name="role"
                    options={USER_TYPE}
                    label="User Type"
                    value={{ value: values.role, label: values.role }}
                    onChange={event => this.onHandleChange(event, setFieldValue)}
                  />
                </div>
                <div className="form-group col-md-6">
                  {values.role !== 'sale' && (
                    <GroupSelectField
                      name="type"
                      label="Type of Designer"
                      options={TYPE_DESIGNER}
                      value={{ value: values.type, label: values.type }}
                      onChange={event => this.onHandleChange(event, setFieldValue)}
                    />
                  )}
                </div>
              </div>
              <div className="d-flex my-4 border-0 justify-content-center">
                <button type="submit" className="btn btn-primary" disabled={!isValid && !user}>
                  {user ? 'UPDATE DETAILS' : 'ADD USER'}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </ModalBase>
    );
  }
}

export default ModalUser;
