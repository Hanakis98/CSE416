import {Component}  from 'react';
import  React  from 'react';

import { Table,Container, Row, Col, Form, Button, Label, Input, FormGroup } from 'reactstrap';

var sha = require("sha1")
var u=0;

export default class editStudent extends Component{
    constructor(props) {

        super(props);
        this.state={
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            department: "",
            track: "",
            sbu_id: "",
            courses:[],
            studentUserName:u,
            entrySemester: "",
            entryYear : "",
            graduationSemester: "",
            graduationYear: ""
               }; 

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        // Get the query paramter and then get the students info and update the state of the page
        const query = new URLSearchParams(window.location.search);
        u = query.get('user')
        
        var urlToGetStudent="http://localhost:3001/students/getOneStudent"
        if(u != null  ){
            urlToGetStudent = "http://localhost:3001/students/getOneStudent?user="+u
        }
        fetch(urlToGetStudent, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            } ,credentials: 'include', 
                })
            .then(response => response.json())
            .then(data => {
                this.setState ( {
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    password: "",
                    department: data.department,
                    track: data.track,
                    sbu_id: data.sbu_id,
                    studentUserName:u,
                    entrySemester: data.entrySemester,
                    entryYear : data.entryYear,
                    graduationSemester: data.graduationSemester,
                    graduationYear: data.graduationYear
                 });       
                 if(data.coursePlan != null)
                    this.setState ( {
                        courses: data.coursePlan.courses
                    }); 


            })
            .catch((error) => {
                console.error('Error:', error);

            });
  

    }
    updateStudent=() =>{
        //When update student is pressed, make sure forms filled out and then submit
        // if(this.state.firstName === "" || this.state.lastName === ""|| this.state.sbu_id === ""|| this.state.email === ""|| this.state.major === ""|| this.state.track === "" || this.state.password === "")
        // {
        //     this.setState({error:1})
        //     return 
        // }
        let json_data = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            sbu_id: this.state.sbu_id,
            email: this.state.email,
            department:  this.state.department,
            track: this.state.track,
            password: this.state.password,
            entrySemester: this.state.entrySemester,
            entryYear : this.state.entryYear,
            graduationSemester: this.state.graduationSemester,
            graduationYear: this.state.graduationYear
        }
        //The gpd can be updating the student or the student can update themselves.
        //Change the URL depending on this and then send a PUT to update
        var URLtoUpdateStudent="http://localhost:3001/students/updateStudent";
            if(u != null  ){
                URLtoUpdateStudent = "http://localhost:3001/students/updateStudent?user="+u
            }
        fetch(URLtoUpdateStudent, {
            method: 'PUT', // or 'PUT'
            headers: { 
                'Content-Type': 'application/json',
            }, credentials: 'include', 
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
                        <Label for="password" sm={1}>password</Label>
                        <Col sm={4}><Input type="text" id="password"placeholder={this.state.password}   onChange = {e=> this.setState( {password:sha( e.target.value+"SaltAndP3pp3r!ghtialkdsflkavnlkanfalglkahtklagnalfkja") })}/></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="entry_semester" sm={1}>Entry Semester</Label>
                        <Col sm={4}><Input type="text" id="entry_semester"placeholder={this.state.entrySemester}   onChange = {e=> this.setState( { entrySemester : e.target.value})}/></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="entry_year" sm={1}>Entry Year</Label>
                        <Col sm={4}><Input type="text" id="entry_year"placeholder={this.state.entryYear}   onChange = {e=> this.setState( { entryYear : e.target.value })}/></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="graduation_semester" sm={1}>Graduation Semester</Label>
                        <Col sm={4}><Input type="text" id="graduation_semester"placeholder={this.state.graduationSemester}   onChange = {e=> this.setState( {  graduationSemester: e.target.value })}/></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="graduation_year" sm={1}>Graduation Year</Label>
                        <Col sm={4}><Input type="text" id="graduation_year" placeholder={this.state.graduationYear}   onChange = {e=> this.setState( { graduationYear: e.target.value})}/></Col>
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
     

                    {this.state.error === 1 && <div style= {{color:'red', fontSize:18}} >Please Enter All forms</div>}
                </Form>
                 
                Course Plan: 
                <br>
                 </br>
                 <Table  xs="3">
                    <thead><tr>
                        <th>Depatment</th>
                        <th>Course Number</th>
                        <th>Section</th>
                        <th>Semester</th>
                        <th>Year</th>
                        <th>Timeslot</th>
                        <th>Grade</th>

                        <th></th>
                        <th></th>
                    </tr></thead>
                    <tbody>
                        {this.state.courses.length !==0 && this.state.courses.map(x =>     
                      <tr>
                                <td>{x.department }</td>
                                <td>{x.course_num}</td>
                                <td>{x.section}</td>
                                <td>{x.semester}</td>
                                <td>{x.year}</td>
                                <td>{x.timeslot}  </td>
                                <td>{x.grade}  </td>

                                <td> 
                                {/* <button onClick={() => this.deleteCourse(x.department,x.courseNum,x.semester,x.year)}>Delete</button>  */}
                                </td>
                             
                                 
                            </tr>
                            
                            
                        
                        )}
                    </tbody>
                </Table>
            </Container>
        );
    }
}