import {  Component } from 'react';
import  React  from 'react';

import { Container, Row, Col, Form, Button, Label, Input, FormGroup } from 'reactstrap';
var sha = require("sha1")

export default class AddStudent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            department: "AMS",
            track: "",
            sbu_id: "",
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
    addStudent = ()=> {
        let json_data = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            sbu_id: this.state.sbu_id,
            email: this.state.email,
            department:  this.state.major,
            track: this.state.track,
            username: this.state.username,
            password: this.state.password

        }
        fetch('http://localhost:3001/students/addStudent', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json_data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }
    render(){
        return (
            <Container>
                <Row>
                    Add Student: Kevin McDonnell (or Add New Student)
                </Row>
                <Form>
                    <FormGroup row>
                        <Label for="name" sm={1}>First Name</Label>
                        <Col sm={4}><Input type="text" id="name" onChange = {e=> this.setState( {firstName: e.target.value })} /></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="name" sm={1}>Last Name</Label>
                        <Col sm={4}><Input type="text" id="name" onChange = {e=> this.setState( {lastName: e.target.value })}/></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="id" sm={1}>ID</Label>
                        <Col sm={4}><Input type="text" id="id" onChange = {e=> this.setState( {sbu_id: e.target.value })} /></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="email" sm={1}>Email</Label>
                        <Col sm={4}><Input type="text" id="email" onChange = {e=> this.setState( {email: e.target.value })}/></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="username" sm={1}>username</Label>
                        <Col sm={4}><Input type="text" id="username" onChange = {e=> this.setState( {username: e.target.value })}/></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="password" sm={1}>password</Label>
                        <Col sm={4}><Input type="text" id="password" onChange = {e=> this.setState( {password:sha( e.target.value+"SaltAndP3pp3r!ghtialkdsflkavnlkanfalglkahtklagnalfkja") })}/></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="major" sm={1}>Major</Label>
                        <Col sm={4}>
                        <Input type="select" id="major" onChange = {e=> this.setState( {major: e.target.value })} >
                        <option value="None Selected">None</option>

                        <option value="AMS">AMS</option>
                        <option value="CSE">CSE</option>
                        <option value="ESE">ESE</option>
                        <option value="BMI">BMI</option>
                        </Input>
                        
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="track" sm={1}>Track</Label>
                        <Col sm={4}><Input type="select" id="track"  onChange = {e=> this.setState( {track: e.target.value })}>
                        <option value="None Selected">None</option>

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
                    <Button onClick = {this.addStudent} >Save</Button>
                </Form>
            </Container>
        );
    }
}