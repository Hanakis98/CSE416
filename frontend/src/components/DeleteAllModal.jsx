import { React, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';

const DeleteAllModal = (props) => {
    const {
        buttonLabel,
        className,
        style
    } = props;

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
        return (
            <div>
      <Button color="danger" onClick={toggle} style={style}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Delete All Students</ModalHeader>
        <ModalBody>
          <Form>
            Are you sure you want to delete all students from the database? This is irreversible.
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>Delete All</Button>{' '}
          <Button outline color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
        );
    
}

export default DeleteAllModal;