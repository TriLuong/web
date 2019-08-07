import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import ModalBase from 'components/modal';

type Props = {
  onSubmit: () => {},
  toggle: () => {},
  user: String,
};
class ModalDesignerAvailable extends PureComponent<Props> {
  render() {
    const { onSubmit, user, toggle, ...rest } = this.props;
    return (
      <ModalBase className="modal-user" {...rest}>
        <Formik initialValues={user} onSubmit={onSubmit}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <table entries="10" className="table">
                <tr>
                  <td>Donat Twerski</td>
                  <td>12, Random street name Chennai, Tamil Nadu India 600064</td>
                  <td>+91 8939792845 jayaprasad.mohanan@gmail.com</td>
                  <td>21/07/2019 2:30 PM</td>
                </tr>
              </table>
              <div className="d-flex my-4 border-0 justify-content-center">
                <Link to={`/lead-detail/${user.id}`}>
                  <button type="submit" className="btn btn-primary">
                    RESCHEDULE NOW
                  </button>
                </Link>
                &nbsp;
                <button type="button" className="btn btn-secondary" onClick={toggle}>
                  LATER
                </button>
              </div>
            </form>
          )}
        </Formik>
      </ModalBase>
    );
  }
}

export default ModalDesignerAvailable;
