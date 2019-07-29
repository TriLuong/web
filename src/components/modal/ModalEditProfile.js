import React, { PureComponent } from 'react';
import { Formik } from 'formik';
// import * as Yup from 'yup';
import InputGroup from 'components/common/form/GroupInput';
import ModalBase from './ModalBase';

type Props = {
  onSubmit: () => {},
  user: {},
};
class ModalEditProfile extends PureComponent<Props> {
  render() {
    const { onSubmit, user, ...rest } = this.props;
    return (
      <ModalBase className="modal-user" {...rest}>
        <Formik initialValues={user} onSubmit={onSubmit}>
          {({ handleSubmit, values, handleChange }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <InputGroup name="firstName" label="First Name" value={values.firstName} onChange={handleChange} />
                </div>
                <div className="form-group col-md-6">
                  <InputGroup name="lastName" label="Last Name" value={values.lastName} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <InputGroup name="email" label="Email Address" value={values.email} onChange={handleChange} />
                </div>
              </div>
              <div className="d-flex my-4 border-0 justify-content-center">
                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </div>
            </form>
          )}
        </Formik>
      </ModalBase>
    );
  }
}

export default ModalEditProfile;
