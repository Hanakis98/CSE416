import { Component } from 'react';
import  React   from 'react';
import { Link, Redirect } from "react-router-dom";
import { Table, Container, Label, Input, Row, Col, Button, NavLink } from 'reactstrap';
import FilterModal from './FilterModal.jsx';
import DeleteAllModal from './DeleteAllModal.jsx';
//import Cookies from 'js-cookie';

var sha = require("sha1")
 
export default class Students extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            students: []
        };
    } 

    componentDidMount() {
        this.readAllStudent().then(newStudents => this.setState({students: newStudents}));
    }

    convertTextToCSV = (text) => {
        let csvData = [];
        let lbreak = text.split("\n");
        lbreak.forEach(res => {
            csvData.push(res.split(","));
        });
        return csvData
    }

    verifyHeader = (header) => {
        let validHeader = true
        header.forEach(function (data, index) {
            if (index === 0 && data !== 'sbu_id') {
                validHeader = false
                console.log(index)
            } else if (index === 1 && data !== 'first_name') {
                validHeader = false
                console.log(index)
            } else if (index === 2 && data !== 'last_name') {
                validHeader = false
                console.log(index)
            } else if (index === 3 && data !== 'email') {
                validHeader = false
                console.log(index)
            } else if (index === 4 && data !== 'department') {
                validHeader = false
                console.log(index)
            } else if (index === 5 && data !== 'track') {
                validHeader = false
                console.log(index)
            } else if (index === 6 && data !== 'entry_semester') {
                validHeader = false
                console.log(index)
            } else if (index === 7 && data !== 'entry_year') {
                validHeader = false
                console.log(index)
            } else if (index === 8 && data !== 'requirement_version_semester') {
                validHeader = false
                console.log(index)
            } else if (index === 9 && data !== 'requirement_version_year') {
                validHeader = false
                console.log(index)
            } else if (index === 10 && data !== 'graduation_semester') {
                validHeader = false
                console.log(index)
            } else if (index === 11 && data !== 'graduation_year') {
                validHeader = false
                console.log(index)
            } else if (index === 12 && data.replace(/\W/g, '') !== 'passwords'){
                validHeader = false
                console.log(data)
            }
        })
        return validHeader
    }

    buildJSONfromRow = (row) => {
        let json = { sbu_id: row[0], first_name: row[1], last_name: row[2], email: row[3], department: row[4], track: row[5], entry_semester: row[5], entry_year: row[6], requirement_version_semester: row[7], requirement_version_year: row[8], graduation_semester: row[9], graduation_year: row[10], password:sha("passSaltAndP3pp3r!ghtialkdsflkavnlkanfalglkahtklagnalfkja"), coursePlan :null }
        return json
    }

    onStudentFileChange = async event => {
        var file = event.target.files[0]
        console.log(file)
        var extension = file.name.split('.').pop()
        if (extension === 'csv') {
            console.log(extension)
            let text = await file.text();
            let csvData = this.convertTextToCSV(text)

            // Verfiy header of csv file
            console.log(csvData)
            let header = csvData[0]
            let data = csvData.slice(1)
            console.log(header)
            if (this.verifyHeader(header)) {
                let json_data = data.map(x => this.buildJSONfromRow(x))
                console.log(json_data)
                json_data.map(x => this.addStudent(x))
            }
        }
    };

    // Importing student courseplan data
    verifyHeader2 = (header) => {
        let validHeader = true
        header.forEach(function (data, index) {
            if (index === 0 && data !== 'sbu_id') {
                validHeader = false
                console.log(index)
            } else if (index === 1 && data !== 'department') {
                validHeader = false
                console.log(index)
            } else if (index === 2 && data !== 'course_num') {
                validHeader = false
                console.log(index)
            } else if (index === 3 && data !== 'section') {
                validHeader = false
                console.log(index)
            } else if (index === 4 && data !== 'semester') {
                validHeader = false
                console.log(index)
            } else if (index === 5 && data !== 'year') {
                validHeader = false
                console.log(index)
            }
            // else if (index === 6 && data.split(" ").join("") !== 'grade') {
            //     validHeader = false
            //     console.log(data)

            //     console.log(index)}
        })
        return validHeader
    }
    
    buildJSONfromRow2 = (row) => {
        let json = { sbu_id: row[0], department: row[1], course_num: row[2], section: row[3], semester: row[4], year: row[5], grade: row[6]}
        console.log(json)
        return json
    }

    coursePlanFileChange = async event => {
        //Delete all current plans
        fetch('http://localhost:3001/coursePlans/deleteAllPlans', {
            method: 'DELETE', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }, credentials: 'include', 
        });                 
        var file = event.target.files[0]
        var extension = file.name.split('.').pop()
        if (extension === 'csv') {
            let text = await file.text();
            let csvData = this.convertTextToCSV(text)

            // Verfiy header of csv file
            let header = csvData[0]
            let data = csvData.slice(1)
            if (this.verifyHeader2(header)) {
                console.log("fF")

                let json_data = data.map(x => this.buildJSONfromRow2(x))
                var sbIDs =[]

                //Gather all the students ids that will have a course plan updated
                for(let i = 0; i < json_data.length; i++) {
                    let id = json_data[i].sbu_id;
                    if(!sbIDs.includes(id)){
                        sbIDs.push(id)
                    }
                }
                //Make a new course plan object for each student, but dont add it to the student onbejct yet
                for(let i = 0; i < sbIDs.length; i++) {
                    console.log(sbIDs[i]);
                    var data2 = { sbu_id: sbIDs[i] }

                    fetch('http://localhost:3001/coursePlans/newCoursePlan', {
                        method: 'POST', // or 'PUT'
                        headers: {
                            'Content-Type': 'application/json',
                        }, 
                        credentials: 'include', 
                        body: JSON.stringify(data2)
                    })
                       
                }

                //AddCourses To there course plan
                for(let i = 0; i < json_data.length; i++) {

                    fetch('http://localhost:3001/coursePlans/addCourseToPlan', {
                        method: 'POST', // or 'PUT'
                        headers: {
                            'Content-Type': 'application/json',
                        }, credentials: 'include', 
                        body: JSON.stringify(json_data[i]),
                    }); 

                }
                //Now the course plans have been made. tell all course plans to add themselves to the respective student
                fetch('http://localhost:3001/coursePlans/addAllPlansToTheirStudent', {
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                    }, credentials: 'include', 
                }); 
          

                console.log(json_data)
               // json_data.map(x => this.addCourseToPlan(x))

            }  else
            console.log("F")
        }
      
    };





    deleteStudent = (studentID) => {
        console.log(studentID)
        const data = { sbu_id: studentID }

        fetch('http://localhost:3001/students/deleteStudent', {
            method: 'DELETE', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }, credentials: 'include', 
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                this.setState({students: data})
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
        });

    }

    addStudent = (json_data) => {

        fetch('http://localhost:3001/students/addStudent', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }, credentials: 'include', 
            body: JSON.stringify(json_data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.readAllStudent().then(newStudents => this.setState({ students: newStudents }))
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    
    }

    readAllStudent = (params) =>  {
        var route = 'http://localhost:3001/students/allStudents/'
    
        return fetch(route, {
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        })  
            .then(response => response.json())
          
            .then(data => {
                console.log('Success:', data);
                return data
            })
            .catch((error) => {
                console.error('Error:', error);
                return null;
            });
    }

    deleteAllStudent = (id) => {
        //let data = {sbu_id: id}

        fetch('http://localhost:3001/students/deleteAllStudent', {
            method: 'DELETE', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },           
             credentials: 'include', 

        })
            .then(response => response.json())
            .then(data => {
                this.setState({students: data})
                console.log('Success:', data);
                
            })
            .catch((error) => {
                console.error('Error:', error);
        });
    }

    
    updateStudent = (params) =>  {
    
        const data = { username: 'example', id: "2" };
        var old_id = "1"
    
        fetch('http://localhost:3001/students/updateStudent', {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'id': old_id
            }, credentials: 'include', 
            body: JSON.stringify(data),
    
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    searchStudent = (name) => {
       if (name !== ""){
            this.readAllStudent().then(currentStudents => {
                var filteredStudents = currentStudents.filter(function(student){
                    return student.first_name + " " + student.last_name === name 
                    || student.sbu_id === name
                })  
                this.setState({students: filteredStudents})
       
            })
        }else{
            this.readAllStudent().then(newStudents => this.setState({students: newStudents}))
        }
    }

    render() {
        // redirect by checking cookies instead of auth response
        // const gpdLoggedIn=Cookies.get("gpdLoggedIn");
        // if(gpdLoggedIn !== "1")
        //TODO: use a separate token auth API request to do this instead of the response from GET /allStudents
        if(this.state.students == null){
            return <Redirect to={{
                pathname:'/', 
                state: { notauth: true}
            }} />
        }
        return (
            <Container>
                <Row style={{alignItems: 'center', justifyContent: 'space-between'}}>
                    
                        <Col sm={3} style={{padding:"0px", margin:"5px"}}>
                            <Label>Search</Label>
                            <Input type="text" id="search" onChange={e => this.searchStudent(e.target.value)}  />
                        </Col>

                        <Col sm={0.1} style={{padding:"0px", margin:"5px"}}>
                        <FilterModal buttonLabel="Filter"></FilterModal>
                        </Col>
                   
                        <NavLink href="/add" style={{padding:"0px", margin:"5px"}}><Button style={{ width:"80px"}} color="success">Add Student</Button></NavLink>

                    {/* <Col xs={1}></Col> */}
                    <Col xs={4.5}>
                    

                        <Button style={{ margin:"5px", width:"80px"}}>Import Grades</Button>
                    
                        <input id="myInput" type="file" ref={(ref) => this.uploadStudentData = ref} style={{ display: 'none' }} onChange={this.onStudentFileChange} />
                        <Button style={{ margin:"5px", width:"120px"}} onClick={(e) => this.uploadStudentData.click()}>Import Student Data</Button>
                    
                        <input id="myInput" type="file" ref={(ref) => this.uploadCoursePlanData = ref} style={{ display: 'none' }} onChange={this.coursePlanFileChange} />
                        <Button style={{ margin:"5px", width:"140px"}} onClick={(e) => this.uploadCoursePlanData.click()}>Import Student Course Plans</Button>
                    
                        {/* <Button style={{ margin:"5px", width:"100px"}} onClick={this.deleteAllStudent} color="danger">Delete All Students</Button> */}
                        
                    </Col>
                    <Col xs={2}>
                    <DeleteAllModal buttonLabel="Delete All Students" style={{ margin:"5px", width:"100px"}}></DeleteAllModal>
                    </Col>
                    
                </Row>

                <Table xs="3" style={{marginTop:"5px"}}>
                    <thead><tr>
                        <th>Student</th>
                        <th>ID</th>
                        <th>GPA</th>
                        <th>Degree</th>
                        <th>Satisfied Reqs</th>
                        <th>Pending Reqs</th>
                        <th>Unsatisfied Reqs</th>
                        <th>Graduation Semester</th>
                        <th>Semesters Enrolled</th>
                        <th>Course Plan Validity</th>
                        <th>Course Plan Completeness</th>
                        <th></th>
                    </tr></thead>
                    
                    <tbody>
                        {this.state.students.length !== 0 && this.state.students.map(x => (
                            <tr>
                                <td>{x.first_name + " " + x.last_name}</td>
                                <td>{x.sbu_id}</td>
                                <td>3.45</td>
                                <td>{x.department}</td>
                                <td>7</td>
                                <td>5</td>
                                <td>2</td>
                                <td>Spring 2022</td>
                                <td>6</td>
                                <td>Valid</td>
                                <td>Incomplete</td>
                                <td> 
                                    <button onClick={() => this.deleteStudent(x.sbu_id)}>Delete</button>
                                    <Link style={{padding:"0px"}} class="nav-link" to={"/editStudent?user="+x.sbu_id}>
                                        <button>View/Edit</button>
                                    </Link>
                                </td>
                            </tr>
                            
                        ))}
                    </tbody>
                </Table>
            </Container>
        );
                        
                       
    }
}