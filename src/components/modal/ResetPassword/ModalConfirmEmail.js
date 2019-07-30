import React, { PureComponent } from 'react';
import { Formik } from 'formik';
// import * as Yup from 'yup';
import ModalBase from 'components/modal';

type Props = {
  onSubmit: () => {},
  user: String,
};
class ModalConfirmEmail extends PureComponent<Props> {
  render() {
    const { onSubmit, user, ...rest } = this.props;
    return (
      <ModalBase className="modal-user" {...rest}>
        <Formik initialValues={user} onSubmit={onSubmit}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <button type="submit" className="btn btn-primary">
                    Confirm Email
                  </button>
                  <p>An email with the password reset link has been sent...</p>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </ModalBase>
    );
  }
}

export default ModalConfirmEmail;
