import React, { PureComponent } from 'react';
import { NotificationContainer } from 'react-notifications';
import './style.scss';

type Props = {
  isOpen: Boolean,
};
class Notification extends PureComponent<Props> {
  componentWillUpdate(nextProps) {
    const notifyContainer = document.getElementsByClassName('notify-container')[0];
    if (nextProps.isOpen) {
      notifyContainer.classList.add('active');
    } else {
      notifyContainer.classList.remove('active');
    }
  }

  render() {
    const { isOpen } = this.props;
    return (
      <>
        <div isOpen={isOpen} className="container-fluid notify-container" />
        <NotificationContainer />
      </>
    );
  }
}

export default Notification;
