import {Component}  from 'react';
import  React  from 'react';

import { Container, Row, Col, Form, Button, Label, Input, FormGroup } from 'reactstrap';
import queryString from 'query-string';

var sha = require("sha1")
var u=0;

export default class editStudent extends Component{
    constructor(props) {

        super(props);
        this.state={

            firstName: "",
            lastName: "",
            email: "",
            username: "", 
            password: "",
            department: "",
            track: "",
            sbu_id: "",
            error:0
               }; 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        var urlToGetStudent="http://localhost:3001/students/getOneStudent"
        const query = new URLSearchParams(window.location.search);

         u = query.get('user')
        console.log("USER " +u)//123
        if(u != null  ){
            urlToGetStudent = "http://localhost:3001/students/getOneStudent?user="+u
        }
        fetch(urlToGetStudent, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }
                })
            .then(response => response.json())
            .then(data => {
                console.log('name:', data.first_name);

                this.setState ( {

                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    username: data.username,
                    password: "",
                    department: data.department,
                    track: data.track,
                    sbu_id: data.sbu_id,
                     studentUserName:u  });

            })
            .catch((error) => {
                console.error('Error:', error);

            });
  

    }
    updateStudent=() =>{
        if(this.state.firstName == "" || this.state.lastName == ""|| this.state.sbu_id == ""|| this.state.email == ""|| this.state.major == ""|| this.state.track == "" || this.state.username == ""|| this.state.password == "")
        {
            this.setState({error:1})
            return 
        
        }
    let json_data = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        sbu_id: this.state.sbu_id,
        email: this.state.email,
        department:  this.state.department,
        track: this.state.track,
        username: this.state.username,
        password: this.state.password
    }
    var URLtoUpdateStudent="http://localhost:3001/students/updateStudent";
        if(u != null  ){
            URLtoUpdateStudent = "http://localhost:3001/students/updateStudent?user="+u
        }
    fetch(URLtoUpdateStudent, {
        method: 'PUT', // or 'PUT'
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
                    Edit Student:

                    <br></br>
                </Row>
                <Form>
                    <FormGroup row>
                        <Label for="name" sm={1}>First Name</Label>
                        <Col sm={4}><Input type="text" id="name" placeholder={this.state.firstName} onChange = {e=> this.setState( {firstName: e.target.value })} /></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="name" sm={1}>Last Name</Label>
                        <Col sm={4}><Input type="text" id="name" placeholder={this.state.lastName} onChange = {e=> this.setState( {lastName: e.target.value })}/></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="id" sm={1}>ID</Label>
                        <Col sm={4}><Input type="text" id="id" placeholder={this.state.sbu_id}  onChange = {e=> this.setState( {sbu_id: e.target.value })} /></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="email" sm={1}>Email</Label>
                        <Col sm={4}><Input type="text" id="email" placeholder={this.state.email}  onChange = {e=> this.setState( {email: e.target.value })}/></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="username" sm={1}>username</Label>
                        <Col sm={4}><Input type="text" id="username" placeholder={this.state.username}  onChange = {e=> this.setState( {username: e.target.value })}/></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="password" sm={1}>password</Label>
                        <Col sm={4}><Input type="text" id="password"placeholder={this.state.password}   onChange = {e=> this.setState( {password:sha( e.target.value+"SaltAndP3pp3r!ghtialkdsflkavnlkanfalglkahtklagnalfkja") })}/></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="major" sm={1}>Major</Label>
                        <Col sm={4}>
                        <Input type="select" id="major" value={this.state.department} onChange = {e=> this.setState( {department: e.target.value })} >
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
                        <Col sm={4}><Input type="select" id="track" value={this.state.track} onChange = {e=> this.setState( {track: e.target.value })}>
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
                    <Button onClick = {this.updateStudent} >Save</Button>
                    <br></br>
                    <br></br>
     

                    {this.state.error == 1 && <div style= {{color:'red', fontSize:18}} >Please Enter All forms</div>}
                </Form>
            </Container>
        );
    }
}