import React from 'react';
import { IconLoading } from 'components/common/icon';
import './styles.scss';

type Props = {
  isChecking: Boolean,
};
class Checking extends React.PureComponent<Props> {
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
