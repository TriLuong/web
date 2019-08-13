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
  render() {
    const { isValid, dateTime } = this.props;
    let date;
    let timeStart;
    let timeEnd;
    if (dateTime) {
      const dateTimeArr = dateTime.split('T');
      date = dateTimeArr[0];
      const hourInt = parseInt(dateTimeArr[1].split(':')[0]);
      const hour = hourInt <= 12 ? hourInt : hourInt - 12;
      const typeTime = hourInt < 12 ? 'AM' : 'PM';

      const hourEnd = hourInt + 1 <= 12 ? hourInt + 1 : hourInt - 12 + 1;
      const typeTimeEnd = hourInt + 1 < 12 ? 'AM' : 'PM';

      const minute = dateTimeArr[1].split(':')[1];
      timeStart = `${hour}:${minute} ${typeTime}`;
      timeEnd = `${hourEnd}:${minute} ${typeTimeEnd}`;
    }

    return (
      <div className="footer">
        <div className="container">
          <div className="footer__content">
            <div>
              Slot will be booked for
              <span className="footer__date-update">{!date ? null : date}</span>
              <span className="footer__date-update">
                {!dateTime ? null : `from ${timeStart} to ${timeEnd}`}
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
