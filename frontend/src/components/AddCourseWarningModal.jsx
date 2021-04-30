import { React } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const AddCourseWarningModal = (props) => {
  const {
    className,
    toggle,
    modal
  } = props;
  
  return (
    <div>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={e => toggle(e.target.innerText)}>Warning</ModalHeader>
        <ModalBody>No Students Found
        </ModalBody>
      </Modal>
    </div>
  );

}

export default AddCourseWarningModal;