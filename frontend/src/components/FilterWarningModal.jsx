import { React, useState } from 'react';
import { Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup } from 'reactstrap';




const FilterWarningModal = (props) => {
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

export default FilterWarningModal;