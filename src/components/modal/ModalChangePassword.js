import React, { PureComponent } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputGroup from 'components/common/form/GroupInput';
import ModalBase from './ModalBase';

type Props = {
  onSubmit: () => {},
  user: {},
};
class ModalChangePassword extends PureComponent<Props> {
  render() {
    const { onSubmit, user, ...rest } = this.props;
    return (
      <ModalBase className="modal-user" {...rest}>
        <Formik
          initialValues={user}
          onSubmit={onSubmit}
          validationSchema={Yup.object().shape({
            oldPassword: Yup.string().required('Required'),
            newPassword: Yup.string().required('Required'),
            reNewPassword: Yup.string().required('Required'),
          })}
        >
          {({ handleChange, values, handleSubmit, isValid }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <InputGroup
                    name="oldPassword"
                    type="password"
                    label="Enter Old Password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <InputGroup
                    name="newPassword"
                    type="password"
                    label="Enter New Password"
                    value={values.newPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <InputGroup
                    name="reNewPassword"
                    type="password"
                    label="Re-enter New Password"
                    value={values.reNewPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="d-flex my-4 border-0 justify-content-center">
                <button type="submit" className="btn btn-primary" disabled={!isValid}>
                  CHANGE PASSWORD
                </button>
              </div>
            </form>
          )}
        </Formik>
      </ModalBase>
    );
  }
}

export default ModalChangePassword;
