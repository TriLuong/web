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
    let date;
    let time;
    if (user.Meeting_Date_and_Time) {
      const dateTimeArr = user.Meeting_Date_and_Time.split('T');
      date = dateTimeArr[0];
      const hour = dateTimeArr[1].split(':')[0];
      const minute = dateTimeArr[1].split(':')[1];
      time = `${hour}:${minute}`;
    }

    return (
      <ModalBase className="modal-user" toggle={toggle} {...rest}>
        <Formik initialValues={user} onSubmit={onSubmit}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <table entries="10" className="table table-borderless">
                <tbody>
                  <tr>
                    <td>{user.Full_Name}</td>
                    <td>
                      {user.Street || ''}
                      {user.Region}
                    </td>
                    <td>
                      {`${user.Phone ? user.Phone : ''}`}
                      <br />
                      {`${user.Email ? user.Email : ''}`}
                    </td>
                    <td>{user.Meeting_Date_and_Time ? `${date} ${time}` : ''}</td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <p className="text-danger">
                <strong>No designers available for the selected slot. Please reschedule.</strong>
              </p>
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
