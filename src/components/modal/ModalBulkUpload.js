import React, { PureComponent } from 'react';
import { Formik } from 'formik';
import yup from 'yup';
import ModalBase from './ModalBase';

type Props = {
  onSubmit: () => {},
  user: {},
};
class ModalBulkUpload extends PureComponent<Props> {
  render() {
    const { onSubmit, user, ...rest } = this.props;
    return (
      <ModalBase className="modal-user" title="Bulk Upload" {...rest}>
        <Formik initialValues={{ file: null }} onSubmit={onSubmit}>
          {({ handleSubmit, values, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <p className="mb-3">
                {'Please click link to download template:  '}
                <a href="/bulk-upload-template.xlsx">bulk-upload-template.xlsx</a>
              </p>

              <div className="custom-file">
                <input
                  id="file"
                  className="custom-file-input"
                  name="file"
                  type="file"
                  onChange={event => {
                    setFieldValue('file', event.currentTarget.files[0]);
                  }}
                  accept=".xlsx, .xls, .csv"
                />
                <label className="custom-file-label" htmlFor="customFile">
                  {values.file ? values.file.name : 'Choose file'}
                </label>
              </div>
              <div className="d-flex my-4 border-0 justify-content-center">
                <button className="btn btn-primary" type="submit">
                  Upload
                </button>
              </div>
            </form>
          )}
        </Formik>
      </ModalBase>
    );
  }
}

export default ModalBulkUpload;
