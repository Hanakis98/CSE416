import {  Component } from 'react';
import  React  from 'react';

import { Alert, Container, Row, Col, Form, Button, Label, Input, FormGroup } from 'reactstrap';

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
            department: "",
            track: "",
            sbu_id: "",
            error: 10  ,
            entry_year:"",
            entry_semester:"",
            graduation_year:"",
            graduation_semester:"",
            coursePlan: []
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
        if(this.state.firstName === "" || this.state.lastName === ""|| this.state.sbu_id === ""|| this.state.email === ""|| this.state.major === ""|| this.state.track === "" || this.state.password === "" ||this.state.entry_semester === "" || this.state.entry_year === "")
            {
                this.setState({error:1})
                return 
            }
        let json_data = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            sbu_id: this.state.sbu_id,
            email: this.state.email,
            department:  this.state.major,
            track: this.state.track,
            password: this.state.password,
            entry_year: this.state.entry_year,
            entry_semester: this.state.entry_semester,
            graduation_semester: this.state.graduation_semester,
            graduation_year: this.state.graduation_year,


            coursePlan: []
        }
        fetch('http://localhost:3001/students/addStudent', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json_data),
            credentials:"include"
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                window.location = '/students';

            })
            .catch((error) => {
                console.error('Error:', error);

            });

    }
    render(){
        return (
            <Container>
                <Row style={{alignItems: 'center', justifyContent: 'center'}}>
                    <p style={{fontSize: "22px", fontWeight: "bold"}}>New Student</p>
                </Row>
                <Row style={{alignItems: 'center', justifyContent: 'center'}}>
                <Form >
                    <FormGroup row>
                        <Label for="name" sm={3}>First Name</Label>
                        <Col sm={8}><Input type="text" id="name" onChange = {e=> this.setState( {firstName: e.target.value })} /></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="name" sm={3}>Last Name</Label>
                        <Col sm={8}><Input type="text" id="name" onChange = {e=> this.setState( {lastName: e.target.value })}/></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="id" sm={3}>ID</Label>
                        <Col sm={8}><Input type="text" id="id" onChange = {e=> this.setState( {sbu_id: e.target.value })} /></Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="id" sm={3}>Entry Year</Label>
                        <Col sm={8}><Input type="text" id="entry_year" onChange = {e=> this.setState( {entry_year: e.target.value })} /></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="id" sm={3}>Entry Semester</Label>
                        <Col sm={8}><Input type="text" id="entry_semester" onChange = {e=> this.setState( {entry_semester: e.target.value })} /></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="id" sm={3}>Graduation Year</Label>
                        <Col sm={8}><Input type="text" id="gradYear" onChange = {e=> this.setState( {graduation_year: e.target.value })} /></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="id" sm={3}>Graduation Semester</Label>
                        <Col sm={8}><Input type="text" id="gradSemester" onChange = {e=> this.setState( {graduation_semester: e.target.value })} /></Col>
                    </FormGroup>


                    <FormGroup row>
                        <Label for="email" sm={3}>Email</Label>
                        <Col sm={8}><Input type="text" id="email" onChange = {e=> this.setState( {email: e.target.value })}/></Col>
                    </FormGroup>
                    
                    <FormGroup row>
                        <Label for="password" sm={3}>Password</Label>
                        <Col sm={8}><Input type="text" id="password" onChange = {e=> this.setState( {password:sha( e.target.value+"SaltAndP3pp3r!ghtialkdsflkavnlkanfalglkahtklagnalfkja") })}/></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="major" sm={3}>Major</Label>
                        <Col sm={8}>
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
                        <Label for="track" sm={3}>Track</Label>
                        <Col sm={8}><Input type="select" id="track"  onChange = {e=> this.setState( {track: e.target.value })}>
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
                    <FormGroup row style={{justifyContent: 'center'}}>
                        <Button color="primary" onClick = {this.addStudent} >Save</Button>
                    </FormGroup>

                    {this.state.error === 1 && 
                        <Alert color="danger" style={{textAlign: "center"}}>
                            Please complete all fields.
                        </Alert>
                    }
                </Form></Row>
            </Container>
        );
    }
}