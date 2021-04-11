import { React, useState } from 'react';
import { Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup } from 'reactstrap';

const FilterModal = (props) => {
    const {
        buttonLabel,
        className
    } = props;

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
        return (
            <div>
      <Button outline color="primary" onClick={toggle} style={{padding:'18px'}}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Filter Student List</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
                <Label>Student Name</Label>
                <Input  />
            <br />
                <Label>Graduation Semester</Label>
                <Input type="select" />
            </FormGroup>
            <FormGroup check>
                <Label check>
                <Input type="checkbox" />
                    Course Plan Validity
                </Label>
                <br />
                <Label check>
                <Input type="checkbox" />
                    Course Plan Completeness
                </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Filter</Button>{' '}
          <Button outline color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
        );
    
}

export default FilterModal;