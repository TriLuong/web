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
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 react/prop-types: 0 */
class SelectTime extends PureComponent<Props> {
  state = {
    time: {},
  };

  componentDidMount() {
    const { initialTime } = this.props;
    const timeSplit = initialTime.split(' ');
    const initType = timeSplit[1];
    const initHour = timeSplit[0].split(':')[0];
    const initMinute = timeSplit[0].split(':')[1];
    const hourElemtArr = document.getElementsByName('hour');
    const minuteElemtArr = document.getElementsByName('minute');

    const inintInnerHour = `${initHour} ${initType}`;
    const initInnerMinute = `:${initMinute}`;
    for (let i = 0; i < hourElemtArr.length; i++) {
      if (hourElemtArr[i].innerText === inintInnerHour) {
        hourElemtArr[i].classList.add('active');
      }
    }

    for (let i = 0; i < minuteElemtArr.length; i++) {
      if (minuteElemtArr[i].innerText === initInnerMinute) {
        minuteElemtArr[i].classList.add('active');
      }
    }

    const initTime = { hour: initHour, minute: initMinute, type: initType };
    this.setState({ time: initTime });
  }

  activeTime = (event, name) => {
    const elemt = document.getElementsByName(name);
    for (let i = 0; i < elemt.length; i++) {
      elemt[i].classList.remove('active');
    }
    event.target.classList.add('active');
  };

  onClick = (event, timeValue) => {
    const { onTimeChange } = this.props;
    const { time } = this.state;
    const name = event.target.getAttribute('name');
    this.activeTime(event, name);

    let hourState = '';
    let minuteState = '';
    let typeState = '';
    let newTime = {};
    if (name === 'hour') {
      const hourSplit = timeValue.split(' ');
      hourState = hourSplit[0];
      typeState = hourSplit[1];
      newTime = { ...time, hour: hourState, type: typeState };
    } else {
      minuteState = timeValue;
      newTime = { ...time, minute: minuteState };
    }
    this.setState({ time: newTime });
    const timeString = `${newTime.hour}:${newTime.minute} ${newTime.type}`;

    onTimeChange(timeString);
  };

  render() {
    const elemtHour = MEETING_HOUR.map(hour => (
      <tr>
        {hour.map(h => (
          <td name="hour" onClick={event => this.onClick(event, h)}>
            {h}
          </td>
        ))}
      </tr>
    ));

    const elemtMinute = MEETING_MINUTE.map(minute => (
      <td name="minute" onClick={event => this.onClick(event, minute)}>
        {`:${minute}`}
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
