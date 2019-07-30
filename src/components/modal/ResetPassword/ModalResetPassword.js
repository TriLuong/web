import React, { PureComponent } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputGroup from 'components/common/form/GroupInput';
import ModalBase from 'components/modal';

type Props = {
  onSubmit: () => {},
  user: string,
};
class ModalResetPassword extends PureComponent<Props> {
  render() {
    const { onSubmit, user, ...rest } = this.props;
    return (
      <ModalBase className="modal-user" {...rest}>
        <Formik
          initialValues={user}
          onSubmit={onSubmit}
          validationSchema={Yup.object().shape({
            email: Yup.string().required('Required'),
          })}
        >
          {({ handleChange, values, handleSubmit, isValid }) => (
            <form onSubmit={handleSubmit}>
              <p>Enter your email to get the link to reset your password.</p>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <InputGroup
                    name="email"
                    type="email"
                    label="Email Address"
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="d-flex my-4 border-0 justify-content-center">
                <button type="submit" className="btn btn-primary" disabled={!isValid}>
                  RESET PASSWORD
                </button>
              </div>
            </form>
          )}
        </Formik>
      </ModalBase>
    );
  }
}

export default ModalResetPassword;
