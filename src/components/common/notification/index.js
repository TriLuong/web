import React, { PureComponent } from 'react';
import './style.scss';

type Props = {
  isOpen: Boolean,
  children: any,
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
    const { isOpen, children, ...rest } = this.props;
    return (
      <>
        <div isOpen={isOpen} {...rest} className="container-fluid notify-container" />
        {children}
      </>
    );
  }
}

export default Notification;
