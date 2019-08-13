import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { InputGroup } from 'components/common/form/';
import { dataDesigners } from 'pages/ManageLead/constants';
import ModalBase from './ModalBase';

type Props = {
  onSubmit: () => {},
};
class ModalAssignDesigner extends React.PureComponent<Props> {
  elemtDesigner = (values, setFieldValue) => dataDesigners.map(designerRow => (
    <div className="form-row">
      {designerRow.map(designer => (
        <div className="form-group col-md-4">
          <InputGroup
            type="radio"
            name="designerId"
            label={`${designer.name} Availble from ${designer.timeFrom} to ${designer.timeTo}`}
            value={designer.id}
            checked={values.designerId === `${designer.id}`}
            required
            id={designer.id}
            onChange={event => this.onHandleChange(event, setFieldValue)}
          />
        </div>
      ))}
    </div>
  ));

  onHandleChange = (event, setFieldValue) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
  };

  onHandleChangeDesigner = () => { };

  render() {
    const { onSubmit, ...rest } = this.props;
    return (
      <ModalBase className="modal-assign" {...rest}>
        <div className="box-control">
          <div className="form-row">
            <div className="form-group col-md-6">
              <InputGroup
                type="radio"
                name="Designers"
                label="Available Designers"
                required
                checked
                onChange={this.onHandleChangeDesigner}
              />
            </div>
            <div className="form-group col-md-6">
              <InputGroup
                type="radio"
                name="Designers"
                label="All Designers"
                id="allDesign"
                required
                onChange={this.onHandleChangeDesigner}
              />
            </div>
          </div>
        </div>
        <Formik
          onSubmit={onSubmit}
          validationSchema={Yup.object().shape({
            designerId: Yup.string().required('Required'),
          })}
        >
          {({ isValid, setFieldValue, handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="modal-assign__inner">{this.elemtDesigner(values, setFieldValue)}</div>
              <div className="d-flex my-4 border-0 justify-content-center">
                <button type="submit" className="btn btn-primary" disabled={!isValid}>
                  ASSIGN DESIGNER
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
