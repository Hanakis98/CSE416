import { React, useState } from 'react';
import { Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup } from 'reactstrap';




const FilterModal = (props) => {
    const {
        buttonLabel,
        className,
        filterStudents,
        reloadStudent
    } = props;

   
    const [modal, setModal] = useState(false);
    const [filterName, setFilterName] = useState(null);
    const [filterSemester, setFilterSemester] = useState(null);
    const [filterCoursplanValidity, setValdity] = useState(false)
    const [filterCompleteCoursePlan, setComplete] = useState(false)

    const toggle = (target) => {
      setModal(!modal);
      
    }

    const toggleEscape = (target) => {
      if (target === 'Filter'){
        // Apply filtering
        filterStudents(filterName, filterSemester, filterCoursplanValidity, filterCompleteCoursePlan)
      
      
      }else{
        reloadStudent()
      }  
      setModal(!modal);
    }

   
    
    
      return (
            <div>
      <Button outline color="primary" onClick={toggle} style={{padding:'18px'}}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={e => toggleEscape(e.target.innerText)}>Filter Student List</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
                <Label>Student Name</Label>
                <Input onChange = {e => setFilterName(e.target.value) } />
            <br />
                <Label>Graduation Semester</Label>
                <Input onChange = {e => setFilterSemester(e.target.value) } />
            </FormGroup>
            <FormGroup check>
                <Label check>
                <Input type="checkbox" onClick = {e => setValdity(e.target.checked) } />
                    Course Plan Validity
                </Label>
                <br />
                <Label check>
                <Input type="checkbox" onClick = {e => setComplete(e.target.checked) } />
                    Course Plan Completeness
                </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={e => toggleEscape(e.target.innerText)}>Filter</Button>{' '}
          <Button outline color="secondary" onClick={e => toggleEscape(e.target.innerText)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
        );
    
}

export default FilterModal;