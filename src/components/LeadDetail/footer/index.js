import React, { PureComponent } from 'react';
import './styles.scss';

type Props = {
  isValid: Boolean,
  date: String,
  time: String,
};
class Footer extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {};
  }

  /* eslint radix: 0 */
  endTime = time => {
    const timeArr = time.split(' ');
    const hour = timeArr[0].split(':')[0];
    const minute = timeArr[0].split(':')[1];
    const type = timeArr[1];
    const newHour = parseInt(hour) + 1;
    const newTime = `${newHour}:${minute} ${type}`;
    return newTime;
  };

  render() {
    const { isValid, date, time } = this.props;
    let newTime = '';
    if (time) {
      newTime = this.endTime(time);
    }

    return (
      <div className="footer">
        <div className="container">
          <div className="footer__content">
            <div>
              Slot will be booked for
              <span className="footer__date-update">{!date ? null : date}</span>
              <span className="footer__date-update">
                {!time ? null : `from ${time} to ${newTime}`}
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
