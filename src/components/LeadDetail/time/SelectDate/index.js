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
  state = { monthObj: null, monthValue: null, yearValue: null };

  componentDidMount() {
    const { initialDate } = this.props;
    const month = initialDate ? moment(initialDate) : moment();
    const monthValue = MONTHS.find(item => item.value === month.month());
    const yearValue = YEARS.find(item => item.value === month.year());
    this.setState({ monthValue, yearValue });
  }

  renderMonthElement = monthObj => {
    this.setState({ monthObj });
  };

  onChangeMonth = monthValue => {
    const { monthObj } = this.state;
    const { month, onMonthSelect } = monthObj || {};
    this.setState({ monthValue });
    onMonthSelect(month, monthValue.value);
  };

  onChangeYear = yearValue => {
    const { monthObj } = this.state;
    const { month, onYearSelect } = monthObj || {};
    this.setState({ yearValue });
    onYearSelect(month, yearValue.value);
  };

  renderMonth = () => {
    const { monthValue, yearValue } = this.state;
    return (
      <div style={{ display: 'flex' }}>
        <div>
          <SelectField
            className="select-month"
            options={MONTHS}
            value={monthValue}
            onChange={this.onChangeMonth}
          />
        </div>
        <div>
          <SelectField
            className="select-year"
            options={YEARS}
            value={yearValue}
            onChange={this.onChangeYear}
          />
        </div>
      </div>
    );
  };

  render() {
    const { onDateChange, initialDate } = this.props;
    const { monthObj } = this.state;
    return (
      <div className="wrapper-calendar">
        <div className="titleCalendar" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>Select Date</p>
          {monthObj && this.renderMonth()}
        </div>
        <hr />
        <Calendar
          numberOfMonths={1}
          autoFocus
          onDateChange={onDateChange}
          daySize={65}
          initialDate={initialDate ? moment(initialDate) : moment()}
          renderMonthElement={this.renderMonthElement}
        />
      </div>
    );
  }
}

export default SelectDate;
