import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { InputGroup, GroupSelectField } from 'components/common/form/';
import { USER_TYPE, TYPE_DESIGNER, USER_BRANCH } from 'pages/ManageUser/constants';
import ModalBase from './ModalBase';

class ModalUser extends React.PureComponent {
  render() {
    const { onSubmit, user, ...rest } = this.props;
    return (
      <ModalBase className="modal-user" {...rest}>
        <Formik
          initialValues={user}
          onSubmit={onSubmit}
          validationSchema={Yup.object().shape({
            branch: Yup.string().required('Required'),
            role: Yup.string().required('Required'),
            typeDesigner: Yup.string().required('Required'),
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
                    options={USER_BRANCH}
                    onChange={setFieldValue}
                    value={{ value: values.branch, label: values.branch }}
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
                    onChange={setFieldValue}
                  />
                </div>
                <div className="form-group col-md-6">
                  <GroupSelectField
                    name="typeDesigner"
                    label="Type of Designer"
                    options={TYPE_DESIGNER}
                    value={{ value: values.typeDesigner, label: values.typeDesigner }}
                    onChange={setFieldValue}
                  />
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
