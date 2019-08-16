import React, { Component } from 'react';
import moment from 'moment';
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
class SelectTime extends Component<Props> {
  state = {
    date: '',
    time: {},
  };

  /* eslint radix: 0 */
  componentDidMount() {
    this.processTime();
  }

  // componentWillReceiveProps() {
  //   // console.log('props', props);
  //   // this.processTime();
  // }

  shouldComponentUpdate(nextProps, nexState) {
    const prevState = this.state;
    if (nextProps.dateSelect !== nexState.date) {
      this.processTime();
    }
    if (nexState.time !== prevState.time) {
      const timeUpdate = `${nexState.time.hour}:${nexState.time.minute} ${nexState.time.type}`;
      // console.log('timeUpdate', timeUpdate);
      nextProps.onTimeChange(timeUpdate);
    }
    return true;
  }

  processTime = () => {
    const { dateSelect, initialTime } = this.props;
    const { time } = this.state;
    const hourCurrent = moment().format('h A');
    const today = moment().format('YYYY-MM-DD');

    const hourElemtArr = document.getElementsByName('hour');
    const minuteElemtArr = document.getElementsByName('minute');

    /* RESET TIME */
    for (let i = 0; i < hourElemtArr.length; i++) {
      hourElemtArr[i].classList.remove('notActive', 'active');
    }
    for (let i = 0; i < minuteElemtArr.length; i++) {
      minuteElemtArr[i].classList.remove('notActive', 'active');
    }

    let initTime;
    let indexHour = null;

    this.setState({ time: initTime });
    if (today === dateSelect) {
      for (let i = 0; i < hourElemtArr.length; i++) {
        if (hourElemtArr[i].innerText === hourCurrent) {
          indexHour = i;
        }
      }
    }

    if (indexHour !== null) {
      for (let i = 0; i < indexHour; i++) {
        hourElemtArr[i].classList.add('notActive');
      }

      hourElemtArr[indexHour].classList.add('active');
      minuteElemtArr[0].classList.add('active');
      initTime = {
        hour: moment().format('h'),
        minute: '00',
        type: moment().format('A'),
      };
    } else {
      const hourInt = parseInt(initialTime.split(':')[0]);
      const initHour = hourInt <= 12 ? hourInt : hourInt - 12;
      const type = hourInt < 12 ? 'AM' : 'PM';
      const initMinute = initialTime.split(':')[1];
      initTime = {
        hour: `${initHour}`,
        minute: `${initMinute}`,
        type,
      };
      const hourFormat = `${initTime.hour} ${initTime.type}`;
      for (let i = 0; i < hourElemtArr.length; i++) {
        if (hourElemtArr[i].innerText === hourFormat) {
          hourElemtArr[i].classList.add('active');
        }
      }

      for (let i = 0; i < minuteElemtArr.length; i++) {
        if (minuteElemtArr[i].innerText === `:${initTime.minute}`) {
          minuteElemtArr[i].classList.add('active');
        }
      }
    }
    const newTime = { ...time, ...initTime };
    this.setState({ time: newTime, date: dateSelect });
    // const timeUpdate = `${newTime.hour}:${newTime.minute} ${newTime.type}`;
    // console.log('timeUpdate', timeUpdate);
    // onTimeChange(timeUpdate);
  };

  activeTime = event => {
    const name = event.target.getAttribute('name');
    const elemt = document.getElementsByName(name);
    for (let i = 0; i < elemt.length; i++) {
      elemt[i].classList.remove('active');
    }
    event.target.classList.add('active');
  };

  convertTime = (event, timeValue) => {
    const { time } = this.state;
    let hourState = '';
    let minuteState = '00';
    let typeState = '';
    let newTime = {};
    const name = event.target.getAttribute('name');

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
    // console.log(this.state);
    const timeString = `${newTime.hour}:${newTime.minute} ${newTime.type}`;
    return timeString;
  };

  onClick = (event, timeValue) => {
    const { onTimeChange } = this.props;
    this.activeTime(event);
    const time = this.convertTime(event, timeValue);
    onTimeChange(time);
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
