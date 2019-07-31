import React, { PureComponent } from 'react';
import { Formik } from 'formik';
// import * as Yup from 'yup';
import ModalBase from 'components/modal';

type Props = {
  onSubmit: () => {},
  user: String,
};
class ModalCheckDesigner extends PureComponent<Props> {
  render() {
    const { onSubmit, user, ...rest } = this.props;
    return (
      <ModalBase className="modal-user" {...rest}>
        <Formik initialValues={user} onSubmit={onSubmit}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group col-md-12 text-center p-4">
                  <button type="submit" className="btn btn-primary">
                    Check Designer
                  </button>
                  <p>Checking designers availability...</p>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </ModalBase>
    );
  }
}

export default ModalCheckDesigner;
