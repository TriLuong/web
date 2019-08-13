import React from 'react';
import IconLoading from 'assets/images/loading-ring.gif';
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
            <img src={IconLoading} alt="loading..." width="50" height="50" />
          </div>
          <div className="wrap-loading__message">Checking designers availability...</div>
        </div>
      </div>
    );
  }
}
export default Checking;
