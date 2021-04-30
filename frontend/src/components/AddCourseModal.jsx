import { React, useState } from 'react';
import { Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup } from 'reactstrap';

const AddCourseModal = (props) => {

    var {
        department,
        courseNum,
        semester,
        year,
        section,
        buttonLabel,
        className,
        addCourseToPlan
    } = props;
   
    const [modal, setModal] = useState(false);


    const toggle = (target) => {
      setModal(!modal);
      
    }

    const toggleEscape = (target) => {
      if (target === 'Filter'){
        // Apply filtering
      }else{
      }  
      setModal(!modal);
    }

    return (
            <div>
      <Button outline color="primary" onClick={toggle} style={{padding:'18px'}}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add Course</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
                <Label>Department</Label>
                <Input onChange = {e => department = console.log(e.target.value)} />
            <br />
                <Label>Course Number</Label>
                <Input onChange = {e => courseNum = console.log(e.target.value)} />
                <br />
                <Label>Section</Label>
                <Input onChange = {e => section = console.log(e.target.value)} />
                <br />
                <Label>Semester</Label>
                <Input onChange = {e => semester = console.log(e.target.value)} />
                <br />
                <Label>Year</Label>
                <Input onChange = {e => year = console.log(e.target.value)} />

            </FormGroup>
          
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={e => addCourseToPlan()}>Add Course</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
    );

}

export default AddCourseModal