import React, { PureComponent } from 'react';
import Calendar from 'components/LeadDetail/time/Calendar';
import moment from 'moment';
import './style.scss';

type Props = {
  onDateChange: () => {},
};
class SelectDate extends PureComponent<Props> {
  render() {
    const { onDateChange } = this.props;
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
          initialDate={moment()}
        />
      </div>
    );
  }
}

export default SelectDate;