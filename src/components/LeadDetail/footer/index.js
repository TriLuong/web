import React, { PureComponent } from 'react';
import './styles.scss';

type Props = {
  isValid: Boolean,
  dateTime: String,
};
class Footer extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {};
  }

  /* eslint radix: 0 */
  displayTime = dateTime => {
    if (dateTime) {
      const dateTimeArr = dateTime.split('T');
      const date = dateTime.split('T')[0];
      const hourInt = parseInt(dateTimeArr[1].split(':')[0]);
      const hour = hourInt <= 12 ? hourInt : hourInt - 12;
      const typeTime = hourInt < 12 ? 'AM' : 'PM';

      const hourEnd = hourInt + 1 <= 12 ? hourInt + 1 : hourInt - 12 + 1;
      const typeTimeEnd = hourInt + 1 < 12 ? 'AM' : 'PM';

      const minute = dateTimeArr[1].split(':')[1];

      /* eslint no-restricted-globals: 0 */
      if (!isNaN(hour) && minute !== 'undefined') {
        const timeStart = `${hour}:${minute} ${typeTime}`;
        const timeEnd = `${hourEnd}:${minute} ${typeTimeEnd}`;
        return { date, time: `from ${timeStart} to ${timeEnd}` };
      }
    }
    return { date: '', time: '' };
  };

  render() {
    const { isValid, dateTime } = this.props;

    const showDateTime = this.displayTime(dateTime);
    return (
      <div className="footer">
        <div className="container">
          <div className="footer__content">
            <div>
              Slot will be booked for
              <span className="footer__date-update">
                {showDateTime.date ? showDateTime.date : ''}
              </span>
              <span className="footer__date-update">
                {showDateTime.time ? showDateTime.time : ''}
              </span>
            </div>
            <button type="submit" className="btn btn-primary" disabled={!isValid}>
              BROADCAST
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
