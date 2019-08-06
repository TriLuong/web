import React, { PureComponent } from 'react';
import './styles.scss';

type Props = {
  isValid: Boolean,
};
class Footer extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { isValid } = this.props;
    return (
      <div className="footer">
        <div className="container">
          <div className="footer__content">
            <div>
              Slot will be booked for
              <span className="footer__date-update">Wed 15 July 2019 from 6:00 PM to 7:00 PM</span>
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
