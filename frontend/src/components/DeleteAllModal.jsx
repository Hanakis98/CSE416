import { React, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import { backendDomain } from './../App.js';

const DeleteAllModal = (props) => {
    const {
        buttonLabel,
        className,
        style
    } = props;

    const [modal, setModal] = useState(false);
    //let data = {sbu_id: id}

    const toggleAndDelete = (id) =>{
      setModal(!modal)

      fetch(backendDomain + '/students/deleteAllStudent', {
        method: 'DELETE', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },           
         credentials: 'include', 

    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            window.location.reload()

            
        })
        .catch((error) => {
            console.error('Error:', error);
    });
    
    };
    const toggle = () =>{
      setModal(!modal)

    }
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
          <Button color="danger" onClick={toggleAndDelete}>Delete All</Button>{' '}
          <Button outline color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
        );
    
}

export default DeleteAllModal;