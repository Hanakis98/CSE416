import { React, Component } from 'react';
import { Table, Container, Form, FormGroup, Label, Input, Row, Col, Button, NavLink } from 'reactstrap';
import { Link, withRouter } from "react-router-dom";

export default class Students extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            students: [],
        };
    }

    componentDidMount() {
        this.readAllStudent().then(newStudents => this.setState({students: newStudents}))
    }

    deleteStudent = (studentID) =>  {

        const data = {id: studentID }
        
        fetch('http://localhost:3001/students/deleteStudent', {
            method: 'DELETE', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
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

    deleteAllStudent = () => {

        fetch('http://localhost:3001/students/deleteAllStudent', {
            method: 'DELETE', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
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


    addStudent = (params) =>  {

        const data = { username: 'example', id: "1" };
    
        fetch('http://localhost:3001/students/addStudent', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
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
    
    
    
    readAllStudent = (params) =>  {
        var route = 'http://localhost:3001/students/allStudents/'
    
        return fetch(route, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                return data
            })
            .catch((error) => {
                console.error('Error:', error);
                return null
            });
    }
    
    readOneStudent = (params) =>  {
    
        var route = 'http://localhost:3001/students/student/'
        const data = { username: 'example', id: "2" };
    
        fetch(route, {
            headers: {
                'Content-Type': 'application/json',
                'id': data.id
            },
    
        })
            .then(response => response.json())
            .then(data => {
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
            },
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
                    return student.name === name
                })  
                this.setState({students: filteredStudents})
       
            })
        }else{
            this.readAllStudent().then(newStudents => this.setState({students: newStudents}))
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col xs="6">
                        <Form inline>
                            <FormGroup>
                                <Label>Search</Label>
                                <Input type="text" id="search" onChange={e => this.searchStudent(e.target.value)}  />
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col xs="2">
                        <Button>Filter</Button>
                    </Col>
                    <Col xs="1">
                        <Button>Import Grades</Button>
                    </Col>
                    <Col xs="1">
                        {/* <Link class="nav-link" to="/students"><Button>Add Student</Button></Link> */}
                        <NavLink href="/edit"><Button>Add Student</Button></NavLink>
                    </Col>
                    <Col xs="2">
                        <Button>Import Student Data</Button>
                    </Col>
                    <Col xs="2">
                        <Button onClick={this.deleteAllStudent}>Delete All Student</Button>
                    </Col>
                </Row>

                <Table striped>
                    <thead><tr>
                        <th>Student</th>
                        <th>ID</th>
                        <th>GPA</th>
                        <th>Degree</th>
                        <th>Satisfied Reqs</th>
                        <th>Pending Reqs</th>
                        <th>Unsatisfied Reqs</th>
                        <th>Graduation Semester</th>
                        <th># Semesters Enrolled</th>
                        <th>Course Plan Validity</th>
                        <th>Course Plan Completeness</th>
                    </tr></thead>
                    
                    <tbody>
                        {this.state.students.map(x => (
                            <tr>
                                <td>{x.name}</td>
                                <td>{x.id}</td>
                                <td>{x.GPA}</td>
                                <td>CSE</td>
                                <td>7</td>
                                <td>5</td>
                                <td>2</td>
                                <td>Spring 2022</td>
                                <td>6</td>
                                <td>Valid</td>
                                <td>Incomplete</td>
                                <td> <button onClick={() => this.deleteStudent(x.id)}>Delete</button> </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

