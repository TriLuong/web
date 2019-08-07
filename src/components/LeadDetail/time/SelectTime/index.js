import React, { PureComponent } from 'react';
import { MEETING_HOUR, MEETING_MINUTE } from './constants';
import './style.scss';

type Props = {
  onTimeChange: () => {},
  initialTime: {
    hour: {},
    minute: {},
    type: {},
  },
};
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */
class SelectTime extends PureComponent<Props> {
  componentDidMount() {
    const { initialTime } = this.props;
    const initHour = `${initialTime.hour} ${initialTime.type}`;
    const initMinute = `:${
      initialTime.minute === 0 ? `${initialTime.minute}0` : initialTime.minute
    }`;
    const hourElemt = document.getElementsByName('hour');
    const minuteElemt = document.getElementsByName('minute');
    let hourIndex;
    let minuteIndex;

    for (let i = 0; i < hourElemt.length; i++) {
      if (hourElemt[i].innerText === initHour) {
        hourIndex = i;
      }
    }

    for (let i = 0; i < minuteElemt.length; i++) {
      if (minuteElemt[i].innerText === initMinute) {
        minuteIndex = i;
      }
    }
    hourElemt[hourIndex].classList.add('active');
    minuteElemt[minuteIndex].classList.add('active');
  }

  activeTime = (event, name) => {
    const elemt = document.getElementsByName(name);
    for (let i = 0; i < elemt.length; i++) {
      elemt[i].classList.remove('active');
    }
    event.target.classList.add('active');
  };

  onClick = (event, time) => {
    const { onTimeChange } = this.props;
    const name = event.target.getAttribute('name');
    this.activeTime(event, name);
    const value = time;
    this.setState({ [name]: value });
    onTimeChange({ [name]: value });
  };

  render() {
    const elemtHour = MEETING_HOUR.map(hour => (
      <tr>
        {hour.map(h => (
          <td name="hour" onClick={event => this.onClick(event, h)}>
            {h === 10 || h === 11 ? `${h} AM` : `${h} PM`}
          </td>
        ))}
      </tr>
    ));

    const elemtMinute = MEETING_MINUTE.map(minute => (
      <td name="minute" onClick={event => this.onClick(event, minute)}>
        {`:${minute === 0 ? `${minute}0` : minute}`}
      </td>
    ));
    return (
      <div className="selectHour">
        <div className="titleTable">
          <p>Select Hour</p>
        </div>
        <hr />
        <table className="table  table-borderless selectHourTable">
          <tbody>{elemtHour}</tbody>
        </table>

        <div className="titleTable">
          <p>Select Minutes</p>
        </div>
        <hr />
        <table className="table  table-borderless selectMinute">
          <tbody>
            <tr>{elemtMinute}</tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default SelectTime;
