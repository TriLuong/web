import React from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { IconCancel } from 'components/common/icon/';

type Props = {
  children: {},
  footer: {},
  title: String,
  toggle: () => {},
  LinkTopTitle: () => {},
  onClickLinkTop: () => {},
}
class ModalBase extends React.Component<Props> {
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
    const { children, footer, title, toggle, LinkTopTitle, onClickLinkTop, ...rest } = this.props;
    return (
      <Modal centered toggle={toggle} {...rest}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          {LinkTopTitle ? (
            <div className="linkTop">
              <button type="button" onClick={() => onClickLinkTop(LinkTopTitle)}>
                {LinkTopTitle}
              </button>
            </div>
          ) : (
            ''
          )}
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={toggle}
          >
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
