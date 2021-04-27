import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const SuccessModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Success!</ModalHeader>
        <ModalBody>
          Action performed successfully!
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Okay</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default SuccessModal;