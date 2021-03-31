import { Component } from 'react';
import  React   from 'react';

import { Table, Container, Form, FormGroup, Label, Input, Row, Col, Button, NavLink } from 'reactstrap';

export default class Students extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            students: []
        };
    }

    componentDidMount() {
        this.readAllStudent().then(newStudents => this.setState({students: newStudents}))
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
        let json = { sbu_id: row[0], first_name: row[1], last_name: row[2], email: row[3], department: row[4], track: row[5], entry_semester: row[5], entry_year: row[6], requirement_version_semester: row[7], requirement_version_year: row[8], graduation_semester: row[9], graduation_year: row[10], password:row[11] }
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

    deleteStudent = (studentID) => {
        console.log(studentID)
        const data = { sbu_id: studentID }


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

    deleteAllStudent = (id) => {

        let data = {sbu_id: id}

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


    addStudent = (json_data) => {

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
                this.readAllStudent().then(newStudents => this.setState({ students: newStudents }))
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
                'Accept': 'application/json'
            }   
            ,
            credentials: 'include', 
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                return data
            })
            .catch((error) => {
                console.error('Error:', error);
                return []
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
        

        return (
            <Container>
                <Row>
                    <Col xs="0">
                        <Form inline>
                                <Label>Search</Label>
                                <Input type="text" id="search" onChange={e => this.searchStudent(e.target.value)}  />
                        </Form>
                    </Col>
                    <Col xs="1">
                        <Button>Filter</Button>
                    </Col>
                    <Col xs="1">
                        <Button>Import Grades</Button>
                    </Col>
                    <Col xs="2">
                        <NavLink href="/add"><Button>Add Student</Button></NavLink>
                    </Col>
                    <Col xs="2">
                        <input id="myInput" type="file" ref={(ref) => this.uploadStudentData = ref} style={{ display: 'none' }} onChange={this.onStudentFileChange} />
                        <Button onClick={(e) => this.uploadStudentData.click()}>Import Student Data</Button>
                    </Col>
                    <Col xs="2">
                        <Button onClick={this.deleteAllStudent}>Delete All Student</Button>
                    </Col>

                </Row>
 <br></br>
 <br></br>

                <Table  xs="3">
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
                        {this.state.students.length !=0 && this.state.students.map(x => (
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
                                <td> <button onClick={() => this.deleteStudent(x.sbu_id)}>Delete</button> </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        );
                        
                       
    }
}

