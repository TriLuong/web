import React from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { IconCancel } from 'components/common/icon/';

class ModalBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  render() {
    const { children, footer, title, toggle, ...rest } = this.props;
    return (
      <Modal centered toggle={toggle} {...rest}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={toggle}>
            <IconCancel />
          </button>
        </div>
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </Modal>
    );
  }
}

export default ModalBase;
