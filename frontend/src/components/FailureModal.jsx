import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const FailureModal = (props) => {
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
          Action was not performed successfully.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>Okay</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default FailureModal;