import React from 'react';
import { IconLoading } from 'components/common/icon';
import './styles.scss';

class Checking extends React.PureComponent {
  render() {
    const { isChecking } = this.props;
    if (!isChecking) {
      return null;
    }
    return (
      <div className="wrap-loading">
        <div className="wrap-loading__content">
          <div className="wrap-loading__icon">
            <IconLoading />
          </div>
          <div className="wrap-loading__message">Checking designers availability...</div>
        </div>
      </div>
    );
  }
}
export default Checking;
