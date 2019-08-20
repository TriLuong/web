import React, { Component } from 'react';
import { Formik } from 'formik';
import ModalBase from 'components/modal';
import SelectDate from 'components/LeadDetail/time/SelectDate';
import SelectTime from 'components/LeadDetail/time/SelectTime';
import moment from 'moment';

type Props = {
  toggle: () => {},
  onSubmit: () => {},
  onHandleChange: () => {},
  lead: {
    Meeting_Date_and_Time: '',
  },
};
class ModalChangeDateTime extends Component<Props> {
  state = {
    params: {
      Meeting_Date_and_Time: '',
    },
    time: '',
    date: '',
    isInitDateTime: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    const prevProps = this.props;
    if (!nextState.isInitDateTime && nextProps.lead !== prevProps.lead) {
      let newDateTime = '';
      let date = '';
      let time = '';

      if (nextProps.lead.Meeting_Date_and_Time) {
        newDateTime = nextProps.lead.Meeting_Date_and_Time;
        date = newDateTime.split('T')[0];
        time = newDateTime.split('T')[1];
      } else {
        date = moment().format('YYYY-MM-DD');
        time = `${moment().format('H')}:00`;
        newDateTime = `${date}T${time}`;
      }
      // console.log('newDateTime', newDateTime);
      const newParams = { ...nextState.params, Meeting_Date_and_Time: newDateTime };
      this.setState(() => ({
        isInitDateTime: true,
        params: newParams,
        date,
        time,
      }));
      // console.log('shouldComponentUpdate');
      return false;
    }
    // console.log('shouldComponentUpdate', nextState.isInitDateTime);

    return true;
  }

  onDateChange = (dateValue, setFieldValue) => {
    const { params, time } = this.state;
    const { onHandleChange } = this.props;
    const newDate = dateValue.format('YYYY-MM-DD');

    const newDateTime = `${newDate}T${time}`;

    const newParams = { ...params, Meeting_Date_and_Time: newDateTime };
    this.setState({ params: newParams, date: newDate });
    setFieldValue('Meeting_Date_and_Time', newDateTime);
    onHandleChange('Meeting_Date_and_Time', newDateTime);
  };

  /* eslint radix: 0 */
  onTimeChange = (timeValue, setFieldValue) => {
    // console.log("onTimeChange",timeValue);
    const { params, date } = this.state;
    const { onHandleChange } = this.props;
    const timeArr = timeValue.split(' ');
    const typeTime = timeArr[1];
    let hour = timeArr[0].split(':')[0];
    const minute = timeArr[0].split(':')[1];
    if (typeTime === 'PM' && hour !== '12') {
      hour = parseInt(hour) + 12;
    }
    const newTime = `${hour}:${minute}`;

    const newDateTime = `${date}T${newTime}`;
    const newParams = { ...params, Meeting_Date_and_Time: newDateTime };
    this.setState({ params: newParams, time: newTime });
    setFieldValue('Meeting_Date_and_Time', newDateTime);
    onHandleChange('Meeting_Date_and_Time', newDateTime);
  };

  toggle = () => {
    const { toggle } = this.props;
    this.setState({ isInitDateTime: false }, () => toggle());
  };

  render() {
    const { toggle, lead, onSubmit, ...rest } = this.props;
    const { params } = this.state;
    return (
      <ModalBase
        className="modal-user"
        toggle={this.toggle}
        style={{ maxWidth: '1150px' }}
        {...rest}
      >
        <Formik onSubmit={onSubmit}>
          {({ handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-row form-row-detail">
                <div className="form-group col-md-6">
                  <SelectDate
                    value={params.date}
                    initialDate={
                      params.Meeting_Date_and_Time ? params.Meeting_Date_and_Time.split('T')[0] : ''
                    }
                    onDateChange={date => this.onDateChange(date, setFieldValue)}
                  />
                </div>
                <div className="form-group col-md-6" style={{ borderLeft: '1px solid  #a5a7aa' }}>
                  <SelectTime
                    dateSelect={params.Meeting_Date_and_Time.split('T')[0]}
                    initialTime={
                      params.Meeting_Date_and_Time ? params.Meeting_Date_and_Time.split('T')[1] : ''
                    }
                    value={params.time}
                    onTimeChange={time => this.onTimeChange(time, setFieldValue)}
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

export default ModalChangeDateTime;
