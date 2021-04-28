import { React, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import { backendDomain } from '../App.js';

const ViewCourseModal = (props) => {
    const {
        description,
        buttonLabel,
        className,
        style
    } = props;

    const [modal, setModal] = useState(false);
    //let data = {sbu_id: id}

    const toggleAndDelete = (id) =>{
      setModal(!modal)

      
    };
    const toggle = () =>{
      setModal(!modal)

    }
        return (
            <div>
      <Button  onClick={toggle} style={style}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Description</ModalHeader>
        <ModalBody>
          <Form>
           { description}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button outline color="secondary" onClick={toggle}>Exit</Button>
        </ModalFooter>
      </Modal>
    </div>
        );
    
}

export default ViewCourseModal;