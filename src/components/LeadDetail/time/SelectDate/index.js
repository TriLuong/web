import React, { PureComponent } from 'react';
import Calendar from 'components/LeadDetail/time/Calendar';
import { SelectField } from 'components/common/form';
import moment from 'moment';
import './style.scss';

type Props = {
  onDateChange: () => {},
  initialDate: '',
};

const YEARS = (() => {
  const years = [];
  for (let i = moment().year(); i <= moment().year() + 2; i++) {
    years.push({ value: i, label: i });
  }
  return years;
})();
const MONTHS = (() => moment.months().map((label, value) => ({ value, label })))();

class SelectDate extends PureComponent<Props> {
  state = { monthObj: null };

  renderMonthElement = monthObj => {
    this.setState({ monthObj });
  };

  onChangeMonth = ({ value }) => {
    const { monthObj } = this.state;
    const { month, onMonthSelect } = monthObj || {};
    onMonthSelect(month, value);
  };

  onChangeYear = ({ value }) => {
    const { monthObj } = this.state;
    const { month, onYearSelect } = monthObj || {};
    onYearSelect(month, value);
  };

  renderMonth = () => {
    const { monthObj } = this.state;
    const { month } = monthObj || {};
    const valueMonth = MONTHS.find(item => item.value === month.month());
    const valueYear = YEARS.find(item => item.value === month.year());
    return (
      <div style={{ display: 'flex' }}>
        <div>
          <SelectField
            className="select-month"
            options={MONTHS}
            value={valueMonth}
            onChange={this.onChangeMonth}
          />
        </div>
        <div>
          <SelectField
            className="select-year"
            options={YEARS}
            value={valueYear}
            onChange={this.onChangeYear}
          />
        </div>
      </div>
    );
  };

  render() {
    const { onDateChange, initialDate } = this.props;
    return (
      <div className="wrapper-calendar">
        <div className="titleCalendar" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>Select Date</p>
          {this.state.monthObj && this.renderMonth()}
        </div>
        <hr />
        <Calendar
          numberOfMonths={1}
          autoFocus
          onDateChange={onDateChange}
          daySize={50}
          initialDate={initialDate ? moment(initialDate) : ''}
          renderMonthElement={this.renderMonthElement}
        />
      </div>
    );
  }
}

export default SelectDate;
