import React, { Component } from 'react';
import { Formik } from 'formik';
import ModalBase from 'components/modal';
import InputGroup from 'components/common/form/GroupInput';
import GroupSelectField from 'components/common/form/GroupSelect';

type Props = {
  toggle: () => {},
  onSubmit: () => {},
  onHandleChange: () => {},
  branches: [],
  lead: {},
};
class ModalChangeBranch extends Component<Props> {
  state = {
    params: {},
  };

  onHandleChangeCommon = (event, setFieldValue) => {
    const { name, value } = event.target;
    const { params } = this.state;
    const { onHandleChange } = this.props;
    const newParams = { ...params, [name]: value };
    this.setState({ params: newParams });
    setFieldValue(name, value);
    onHandleChange(name, value);
  };

  onHandleChangeBranch = (event, setFieldValue) => {
    const { name, value } = event.target;
    const { params } = this.state;
    const { onHandleChange } = this.props;
    const newParams = { ...params, branchId: value.id };
    this.setState({ params: newParams });
    setFieldValue(name, value);
    onHandleChange(name, value);
  };

  render() {
    const { toggle, lead, onSubmit, branches, ...rest } = this.props;
    return (
      <ModalBase className="modal-user" toggle={toggle} {...rest}>
        <Formik onSubmit={onSubmit} initialValues={lead}>
          {({ handleSubmit, setFieldValue, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-row form-row-detail">
                <div className="form-group col-md-6">
                  <GroupSelectField
                    label="Select Branch"
                    name="branch"
                    options={branches}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                    value={values.branch}
                    onChange={event => this.onHandleChangeBranch(event, setFieldValue)}
                    isOptionSelected={option => values.branch === option.id}
                  />
                </div>
                <div className="form-group col-md-6">
                  <InputGroup
                    label="Special instructions (optional)"
                    name="manualLocation"
                    value={values.manualLocation}
                    onChange={event => this.onHandleChangeCommon(event, setFieldValue)}
                    toggle={() => toggle(values)}
                  />
                </div>
              </div>
              <div className="d-flex my-4 border-0 justify-content-center">
                <button type="submit" className="btn btn-primary">
                  RESCHEDULE MEETING
                </button>
              </div>
            </form>
          )}
        </Formik>
      </ModalBase>
    );
  }
}

export default ModalChangeBranch;
