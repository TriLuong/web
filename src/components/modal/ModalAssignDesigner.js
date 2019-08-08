import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { InputGroup } from 'components/common/form/';
import { USER_TYPE, TYPE_DESIGNER } from 'pages/ManageUser/constants';
import ModalBase from './ModalBase';

class ModalAssignDesigner extends React.PureComponent {
  render() {
    const { onSubmit, user = {}, ...rest } = this.props;
    const init = user && user.role === 'sale' ? { ...user, type: '' } : user;
    return (
      <ModalBase className="modal-assign" {...rest}>
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
              <div className="box-control">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <InputGroup
                      type="radio"
                      name="Designers"
                      label="Available Designers"
                      value={values.firstName || ''}
                      required
                      checked
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <InputGroup
                      type="radio"
                      name="Designers"
                      label="All Designers"
                      id="allDesign"
                      value={values.lastName || ''}
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-assign__inner">
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <InputGroup
                      type="radio"
                      name="val01"
                      label="Designer Name
                        Available
                        10AM to 7:30AM"
                      value={values.lastName || ''}
                      required
                      id="user01"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <InputGroup
                      type="radio"
                      name="val01"
                      label="Designer Name
                        Available
                        10AM to 7:30AM"
                      value={values.lastName || ''}
                      required
                      id="user02"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <InputGroup
                      type="radio"
                      name="val01"
                      label="Designer Name
                        Available
                        10AM to 7:30AM"
                      value={values.lastName || ''}
                      required
                      id="user03"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <InputGroup
                      type="radio"
                      name="val02"
                      label="Designer Name
                    Available
                    10AM to 7:30AM"
                      value={values.lastName || ''}
                      required
                      id="user04"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <InputGroup
                      type="radio"
                      name="val02"
                      label="Designer Name
                    Available
                    10AM to 7:30AM"
                      value={values.lastName || ''}
                      required
                      id="user05"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <InputGroup
                      type="radio"
                      name="val02"
                      label="Designer Name
                    Available
                    10AM to 7:30AM"
                      value={values.lastName || ''}
                      required
                      id="user06"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex my-4 border-0 justify-content-center">
                <button type="submit" className="btn btn-primary" disabled={!isValid && !user}>
                  {user ? 'ASSIGN DESIGNER' : 'ADD USER'}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </ModalBase>
    );
  }
}

export default ModalAssignDesigner;
