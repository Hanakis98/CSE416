import { React, Component, Select } from 'react';
import { Container, Row, Col, Form, Button, Label, Input, FormGroup } from 'reactstrap';

export default class EditStudent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            category: 'yo'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({category: event.target.value});
        console.log(event.target.value)
    }
    handleSubmit(event){
        console.log(this.state);
        event.preventDefault();
    }
    render(){
        return (
            <Container>
                <Row>
                    Edit Student: Kevin McDonnell (or Add New Student)
                </Row>
                <Form>
                    <FormGroup row>
                        <Label for="name" sm={1}>Name</Label>
                        <Col sm={4}><Input type="text" id="name" /></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="id" sm={1}>ID</Label>
                        <Col sm={4}><Input type="text" id="id" /></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="email" sm={1}>Email</Label>
                        <Col sm={4}><Input type="text" id="email" /></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="major" sm={1}>Major</Label>
                        <Col sm={4}>
                        <Input type="select" id="major" >
                        
                        <option value="ams">AMS</option>
                        <option value="cse">CSE</option>
                        <option value="ese">ESE</option>
                        <option value="bmi">BMI</option>
                        </Input>
                        
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="track" sm={1}>Track</Label>
                        <Col sm={4}><Input type="select" id="track">
                            
                            <option value="iit">Imaging Informatics with thesis</option>
                            <option value="iip">Imaging Informatics with project</option>
                            <option value="cit">Clinical Informatics with thesis</option>
                            <option value="cip">Clinical Informatics with project</option>
                            <option value="tbt">Translational Bioinformatics with thesis</option>
                            <option value="tbp">Translational Bioinformatics with project</option>
                            <option value="t">Thesis</option>
                            <option value="nt">Non-Thesis</option>
                            <option value="ap">Advanced Project</option>
                            <option value="sp">Special Project</option>
                            </Input>
                            
                        </Col>
                    </FormGroup>
                    <Button>Save</Button>
                </Form>
            </Container>
        );
    }
}