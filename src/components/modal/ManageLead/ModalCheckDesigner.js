import React, { PureComponent } from 'react';
import { Modal } from 'reactstrap';
import Checking from 'components/common/checking';

type Props = {
  onSubmit: () => {},
  toggle: () => {},
  user: String,
  isChecking: Boolean,
};
class ModalCheckDesigner extends PureComponent<Props> {
  render() {
    const { onSubmit, user, isChecking, toggle, ...rest } = this.props;
    return (
      <Modal toggle={toggle} {...rest}>
        <Checking isChecking={isChecking} />
      </Modal>
    );
  }
}

export default ModalCheckDesigner;
