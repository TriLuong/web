import React, { PureComponent } from 'react';
import Calendar from 'components/LeadDetail/time/Calendar';
import moment from 'moment';
import './style.scss';

type Props = {
  onDateChange: () => {},
  initialDate: '',
};
class SelectDate extends PureComponent<Props> {
  render() {
    const { onDateChange, initialDate } = this.props;
    return (
      <div>
        <div className="titleCalendar">
          <p>Select Date</p>
        </div>
        <hr />
        <Calendar
          numberOfMonths={1}
          autoFocus
          onDateChange={onDateChange}
          daySize={50}
          initialDate={initialDate ? moment(initialDate) : ''}
        />
      </div>
    );
  }
}

export default SelectDate;
