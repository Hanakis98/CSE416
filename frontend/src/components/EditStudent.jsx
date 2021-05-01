import {Component}  from 'react';
import  React  from 'react';
import { Redirect } from "react-router-dom";
import { Alert, Table, Container, Row, Col, Form, Button, Label, Input, FormGroup } from 'reactstrap';
import Cookies from 'js-cookie';
import { backendDomain } from '../App.js';
import AddCourseModal from './AddCourseModal'
import AddCourseWarningModal from './AddCourseWarningModal'

var sha = require("sha1")
var u=0;


export default class EditStudentAsStudent extends Component{
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
            entry_semester: "",
            entry_year : "",
            graduation_semester: "",
            graduation_year: "",
            comments: [],
            commentToAdd:""
        }; 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.fetchStudentInfo()//.then(n => this.setState({}))
    }

    fetchStudentInfo = () => {
        // Get the query paramter and then get the students info and update the state of the page
        const query = new URLSearchParams(window.location.search);
        u = query.get('user')
        
        var urlToGetStudent= backendDomain + "/students/getOneStudent"

        if(u != null  ){
            urlToGetStudent = backendDomain + "/students/getOneStudent?user="+u
        }
        
        fetch(urlToGetStudent, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            } ,credentials: 'include', 
                })
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                if(data.notAllowed != null){
                    //auth fail from api call?
                    Cookies.set("gpdLoggedIn", "0");
                    Cookies.set("studentLoggedIn", "0");
                    this.setState({});
                    return;
                }
                this.setState ( {
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    password: "",
                    department: data.department,
                    track: data.track,
                    sbu_id: data.sbu_id,
                    studentUserName:u,
                    entry_semester: data.entry_semester,
                    entry_year : data.entry_year,
                    graduation_semester: data.graduation_semester,
                    graduation_year: data.graduation_year,
                    comments: data.comments

                });
                if(data.coursePlan != null){
                    this.setState ( {
                        courses: data.coursePlan.courses
                    }); 
                }

            })
            .catch((error) => {
                console.error('Error:', error);
                console.log("testst");
            });
    }

    updateStudent=() =>{
  
        let json_data = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            sbu_id: this.state.sbu_id,
            email: this.state.email,
            department:  this.state.department,
            track: this.state.track,
            password: this.state.password,
            entry_semester: this.state.entry_semester,
            entry_year : this.state.entry_year,
            graduation_semester: this.state.graduation_semester,
            graduation_year: this.state.graduation_year
        }
        //The gpd can be updating the student or the student can update themselves.
        //Change the URL depending on this and then send a PUT to update
        
        var URLtoUpdateStudent=backendDomain + "/students/updateStudent";
            if(u != null  ){
                URLtoUpdateStudent = backendDomain + "/students/updateStudent?user="+u
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
    deleteCourseFromPlan = (sbu_id,department,courseNum,semester,year)=>{
        
        console.log( (semester))
        fetch(backendDomain + "/coursePlans/deleteCourseFromPlan", {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            } ,credentials: 'include', 
            body: JSON.stringify({sbu_id: sbu_id , department: department, course_num: courseNum,semester: semester,year: year})
                })   ;
            fetch(backendDomain + "/students/regrabCoursePlan", {
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                    } ,credentials: 'include', 
                    body: JSON.stringify({sbu_id: sbu_id })
                        }).then(data=>            window.location.reload() )   ;

    }
    handleChange(event){
        this.setState({category: event.target.value});
        console.log(event.target.value)
    }
    handleSubmit(event){
        console.log(this.state);
        event.preventDefault();
    }
    addComment=(commentToAdd, sbu_id)=>{
        if(commentToAdd!="")
        fetch(backendDomain + "/students/addComment", {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            } ,credentials: 'include', 
            body: JSON.stringify({sbu_id: sbu_id ,commentToAdd : commentToAdd})
                }).then(data=>window.location.reload()                )
    }
    
    addCommentAndNotify=(commentToAdd, sbu_id)=>{
        let templateParams = {
            from_name: "MAST SYSTEM",
            to_name: this.state.email,
            subject: "COMMENT ON COURSEPLAN",
            message_html: "THERES A NEW COMMENT ON YOUR COURSEPLAN",
        }
        if(commentToAdd!="")
        fetch(backendDomain + "/students/addCommentAndNotify", {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            } ,credentials: 'include', 
            body: JSON.stringify({sbu_id: sbu_id ,commentToAdd : commentToAdd, email: this.state.email})
                }).then(data=>window.location.reload() );
        
     
    }
    toggleAddCourseWarningModal = () => {
        var newShowModal = !this.state.showAddCourseWarningModal
        this.setState({ showAddCourseWarningModal: newShowModal })

    }
    
    addCourseToPlan = (department,courseNum,semester,year,section) => {
        console.log(department,courseNum,semester,year,section)
        fetch(backendDomain + "/courses/getCourseIfItExists", {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            } ,credentials: 'include', 
            body: JSON.stringify({department: department, course_num:courseNum, semester:semester, year:year,section:section})

                })
            .then(response => response.json())
            .then(data => {
                console.log(data.department)
                if(data.department == null)
                {
                    this.toggleAddCourseWarningModal()
                    this.setState({ showAddCourseModal: false })}
            });  

            fetch(backendDomain + '/coursePlans/addCourseToPlan', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                }, credentials: 'include',
                body: JSON.stringify({sbu_id: this.state.sbu_id,department: department, course_num:courseNum, semester:semester, year:year,section:section})
            })
            fetch(backendDomain + '/students/regrabCoursePlan', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                }, credentials: 'include', 
                body: JSON.stringify({sbu_id: this.state.sbu_id})
            })

    }
    render(){
        const gpdLoggedIn=Cookies.get("gpdLoggedIn");
        const studentLoggedIn=Cookies.get("studentLoggedIn");
        //TODO: use a separate token auth API request to do this instead of the response from the GET
        
        // if(api call fails due to no authentication){
        //     Cookies.set('gpdLoggedIn', '0');
        //     Cookies.set('studentLoggedIn', '0');
        // }
        if(gpdLoggedIn !== "1" && studentLoggedIn !== "1"){
            return <Redirect to={{
                pathname:'/', 
                state: { notauth: true }
            }} />
        }
        return (
            <Container>
                <Row style={{ justifyContent: 'center'}}>
                    <p style={{fontSize: "22px", fontWeight: "bold"}}>Viewing Student: {this.state.firstName + " " + this.state.lastName}</p>
                </Row>
                <Row>
                    <Col sm={4} style={{padding:"5px", margin:"0px", justifyContent: 'center', alignItems: 'center'}} >
                        <p style={{textAlign: "center", fontSize: "18px", fontWeight: "bold"}}>Edit Student Info</p>
                        <Form>
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="name" sm={4}>First Name</Label>
                                <Col sm={8}><Input type="text" id="name" value={this.state.firstName} onChange = {e=> this.setState( {firstName: e.target.value })} /></Col>
                            </FormGroup>
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="name" sm={4}>Last Name</Label>
                                <Col sm={8}><Input type="text" id="name" value={this.state.lastName} onChange = {e=> this.setState( {lastName: e.target.value })}/></Col>
                            </FormGroup>
                           {gpdLoggedIn==1 && <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="id" sm={4}>ID</Label>
                                <Col sm={8}><Input type="text" id="id" readOnly={false} value={this.state.sbu_id}  onChange = {e=> this.setState( {sbu_id: e.target.value })} /></Col>
                            </FormGroup>}
                            {studentLoggedIn==1 && <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="id" sm={4}>ID</Label>
                                <Col sm={8}><Input type="text" id="id" readOnly={true} value={this.state.sbu_id}  onChange = {e=> this.setState( {sbu_id: e.target.value })} /></Col>
                            </FormGroup>}
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="email" sm={4}>Email</Label>
                                <Col sm={8}><Input type="text" id="email" value={this.state.email}  onChange = {e=> this.setState( {email: e.target.value })}/></Col>
                            </FormGroup>
                        
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="password" sm={4}>Password</Label>
                                <Col sm={8}><Input type="text" id="password"   onChange = {e=> this.setState( {password:sha( e.target.value+"SaltAndP3pp3r!ghtialkdsflkavnlkanfalglkahtklagnalfkja") })}/></Col>
                            </FormGroup>
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="entry_semester" sm={4}>Entry Semester</Label>
                                <Col sm={8}><Input type="text" id="entry_semester"value={this.state.entry_semester}   onChange = {e=> this.setState( { entry_semester : e.target.value})}/></Col>
                            </FormGroup>
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="entry_year" sm={4}>Entry Year</Label>
                                <Col sm={8}><Input type="text" id="entry_year"value={this.state.entry_year}   onChange = {e=> this.setState( { entry_year : e.target.value })}/></Col>
                            </FormGroup>
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="graduation_semester" sm={4}>Graduation Semester</Label>
                                <Col sm={8}><Input type="text" id="graduation_semester"placeholder={this.state.graduation_semester}   onChange = {e=> this.setState( {  graduation_semester: e.target.value })}/></Col>
                            </FormGroup>
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="graduation_year" sm={4}>Graduation Year</Label>
                                <Col sm={8}><Input type="text" id="graduation_year" placeholder={this.state.graduation_year}   onChange = {e=> this.setState( { graduation_year: e.target.value})}/></Col>
                            </FormGroup>
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="major" sm={4}>Major</Label>
                                <Col sm={8}>
                                <Input type="select" id="major" value={this.state.department} onChange = {e=> this.setState( {department: e.target.value })} >
                                <option value="None">None</option>

                                <option value="AMS">AMS</option>
                                <option value="CSE">CSE</option>
                                <option value="ESE">ESE</option>
                                <option value="BMI">BMI</option>
                                </Input>
                                
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="track" sm={4}>Track</Label>
                                <Col sm={8}><Input type="select" id="track" value={this.state.track} onChange = {e=> this.setState( {track: e.target.value })}>
                                    <option value="None">None</option>
                                    {this.state.department === 'BMI' && <option value="iit">Imaging Informatics with thesis</option>}
                                    {this.state.department === 'BMI' && <option value="iip">Imaging Informatics with project</option>}
                                    {this.state.department === 'BMI' && <option value="cit">Clinical Informatics with thesis</option>}
                                    {this.state.department === 'BMI' && <option value="cip">Clinical Informatics with project</option>}
                                    {this.state.department === 'BMI' && <option value="tbt">Translational Bioinformatics with thesis</option>}
                                    {this.state.department === 'BMI' && <option value="tbp">Translational Bioinformatics with project</option>}
                                    {(this.state.department === 'ESE' || this.state.department === 'CSE' )&& <option value="t">Thesis</option>}
                                    {this.state.department === 'ESE' && <option value="nt">Non-Thesis</option>}
                                    {this.state.department === 'CSE' && <option value="ap">Advanced Project</option>}
                                    {this.state.department === 'CSE' && <option value="sp">Special Project</option>}
                                    </Input>
                                    
                                </Col>
                            </FormGroup>

                            <Row style={{padding:"0px", margin:"0px"}}>
                                <Col sm={2}>
                                    <Button onClick = {this.updateStudent} color="success" style={{}} >Save</Button>
                                </Col>
                                <Col sm={10} style={{}}>
                                    { this.state.error === 1 &&
                                    <Alert color="danger" style={{margin:"0px", padding:"6px"}}>
                                        All fields must be filled.
                                    </Alert>}
                                </Col>
                            </Row>
                            
                        </Form>
                    </Col>
                    <Col sm={8} style={{padding:"5px", margin:"0px"}}>
                        <p style={{textAlign: "center", fontSize: "18px", fontWeight: "bold"}}>Course Plan</p>
                        <Table  xs="3">
                            <thead><tr>
                                <th>Department</th>
                                <th>Number</th>
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
                                    <td>{x.newCourse.department }</td>
                                    <td>{x.newCourse.course_num}</td>
                                    <td>{x.newCourse.section}</td>
                                    <td>{x.newCourse.semester}</td>
                                    <td>{x.newCourse.year}</td>
                                    <td>{x.newCourse.timeslot}  </td>
                                    {x.grade && <td>{x.grade}  </td>}

                                   {(gpdLoggedIn==1 || x.grade=="") && <td> 
                                     <Button onClick={(e) => this.deleteCourseFromPlan(this.state.sbu_id,x.newCourse.department,x.newCourse.course_num,x.newCourse.semester,x.newCourse.year)}>Delete</Button>  
                                    </td>}
                                </tr>
                                )}
                            </tbody>

                        </Table>
                                              
                         <AddCourseModal buttonLabel="Add Course" addCourseToPlan={this.addCourseToPlan}></AddCourseModal>
                         <AddCourseWarningModal  toggle={this.toggleAddCourseWarningModal} modal={this.state.showAddCourseWarningModal}></AddCourseWarningModal>

                        <p style={{textAlign: "center", fontSize: "18px", fontWeight: "bold"}}>Comments</p>

                        <Table  xs="3">
                            <thead><tr>
                    
                            </tr></thead>
                            <tbody>
                                {this.state.comments.length !==0 && this.state.comments.map(x =>
                                <tr>
                                    <td>{x}</td>

                                        <br></br>
                                
                                </tr>
                                )}
                                   {gpdLoggedIn==1 &&  <td> 
                                    <FormGroup row style={{alignItems: 'center'}}>
                                        <Col sm={8}><Input type="text" id="commentToAdd"    onChange = {e=> this.setState( { commentToAdd: e.target.value})}/></Col>
                                        <br></br>
                                        <Row>
                                        <Button onClick = {(e) => this.addComment(this.state.commentToAdd, this.state.sbu_id)} color="success" style={{width:"120px",margin:"5px"}} >Add Comment</Button>
                                        <Button onClick = {(e) => this.addCommentAndNotify(this.state.commentToAdd, this.state.sbu_id)} color="success" style={{width:"120px",margin:"5px"}} >Add Comment and Notify</Button>
                                        </Row>
                                    </FormGroup>
                                    </td>}
                            </tbody>
                           
                        </Table>
                    </Col>
                </Row>
                <Row >
                    <Col sm={4} style={{padding:"5px", margin:"0px", justifyContent: 'center', alignItems: 'center'}}>
                        <p style={{textAlign: "center", fontSize: "18px", fontWeight: "bold"}}>Suggest Course Plan</p>
                        <Form>
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="max_courses" sm={4}>Max Number of Courses per Semester</Label>
                                    <Col sm={8}><Input type="text" id="max_courses" placeholder={""}   onChange = {e=> this.setState( { })}/></Col>
                            </FormGroup>
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="preferred_courses" sm={4}>Preferred Courses</Label>
                                    <Col sm={8}><Input type="text" id="preferred_courses" placeholder={""}   onChange = {e=> this.setState( { })}/></Col>
                            </FormGroup>
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="avoid_courses" sm={4}>Courses to Avoid</Label>
                                    <Col sm={8}><Input type="text" id="avoid_courses" placeholder={""}   onChange = {e=> this.setState( { })}/></Col>
                            </FormGroup>
                            <FormGroup row style={{alignItems: 'center', paddingLeft:"35px"}}>
                                <Label check>
                                    <Input type="checkbox" onClick = {e => this.setState({scp_sortByPreference: e.target.checked})} />
                                    Sort Plans by Preference
                                </Label>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={4}>Scheduling Constraints</Label>
                                <Col>
                                    <Input type="select" id="major" value={this.state.department} onChange = {e=> this.setState( {scp_day: e.target.value })} >
                                        <option value="None Selected">None</option>
                                        <option value="AMS">Day</option>
                                        <option value="CSE">CSE</option>
                                        <option value="ESE">ESE</option>
                                        <option value="BMI">BMI</option>
                                    </Input>
                                    <Input type="select" id="major" value={this.state.department} onChange = {e=> this.setState( {scp_time: e.target.value })} >
                                        <option value="None Selected">None</option>
                                        <option value="AMS">Time</option>
                                        <option value="CSE">CSE</option>
                                        <option value="ESE">ESE</option>
                                        <option value="BMI">BMI</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <Row style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Button onClick = {null} color="success" style={{width:"120px",margin:"5px"}} >Generate Course Plan Suggestions</Button>
                                <Button onClick = {null} color="success" style={{width:"140px",margin:"5px"}} >Generate Smart Course Plan Suggestions</Button>

                            </Row>
                            

                        </Form>
                    </Col>
                    <Col sm={8} style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <p style={{textAlign: "center", fontSize: "18px", fontWeight: "bold"}}>Suggested Course Plans</p>
                    </Col>
                </Row>
            </Container>
        );
    }
}
