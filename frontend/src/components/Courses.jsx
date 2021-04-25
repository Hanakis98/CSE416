import { Component } from 'react';
import  React   from 'react';
import { Table, Container, Row, Col, Button } from 'reactstrap';
import { backendDomain } from './../App.js';

export default class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            courses:[]
        };
    }

    componentDidMount() {
        this.readAllCourses().then(courses => this.setState({courses: courses}))
    }
    readAllCourses = (params) =>  {
        var route = backendDomain + '/courses/allOfferedCourses/'
    
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
            console.log(data)
            if (index === 0 && data !== 'department') {
                validHeader = false
                console.log(index)
            } else if (index === 1 && data !== 'course_num') {
                validHeader = false
                console.log(index)
            } else if (index === 2 && data !== 'section') {
                validHeader = false
                console.log(index)
            } else if (index === 3 && data !== 'semester') {
                validHeader = false
                console.log(index)
            } else if (index === 4 && data !== 'year') {
                validHeader = false
                console.log(index)
             }// else if (index === 5 && data !== 'timeslot\r') {
            //     validHeader = false
            //     console.log(index)
            // }
        })
        return validHeader
    }

    buildJSONfromRow = (row) => {
        let json = { sbu_id:"OFFERING", department: row[0], course_num: row[1], section: row[2], semester: row[3], year: row[4], timeslot: row[5], description:"" ,credits:"",prerequisites:[] }
        return json
    }

    onCourseFileChange = async event => {
        this.deleteAllCourses();

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
                json_data.map(x => this.addCourse(x))
            }
        }
    };

    addCourse = (json_data) => {

        fetch( backendDomain + '/courses/addCourse', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }, credentials: 'include', 
            body: JSON.stringify(json_data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.readAllCourses().then(c => this.setState({ courses: c }))
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    
    }

    deleteCourse = (d, cn, s, y) => {
        const data = { sbu_id: "OFFERING" ,department: d, course_num:cn, semester:s, year:y }


        fetch(backendDomain + '/courses/deleteCourse', {
            method: 'DELETE', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }, credentials: 'include', 
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);  
                this.setState({courses: data})
            })
            .catch((error) => {
                console.error('Error:', error);
        });

    }

    deleteAllCourses = (id) => {
        //let data = {sbu_id: id}
        fetch(backendDomain + '/courses/deleteAllOfferedCourses', {
            method: 'DELETE', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }, credentials: 'include', 
        })
            .then(response => response.json())
            .then(data => {
                this.setState({courses: data})
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
        });
    }

    render() {
        return (
            <Container>
                <Row style={{alignItems: 'center', justifyContent: 'flex-start'}}>
               
                     <Col xs="2" style={{padding:"0px", margin:"5px"}}>
                        <input id="myInput" type="file" ref={(ref) => this.uploadStudentData = ref} style={{ display: 'none' }} onChange={this.onCourseFileChange} />
                        <Button onClick={(e) => this.uploadStudentData.click()}>Scrape Course Info </Button>
                    </Col>
                   
                    <Col xs="2" style={{padding:"0px", margin:"5px"}}>
                        <input id="myInput" type="file" ref={(ref) => this.uploadStudentData = ref} style={{ display: 'none' }} onChange={this.onCourseFileChange} />
                        <Button onClick={(e) => this.uploadStudentData.click()}>Import course offerings </Button>
                    </Col>
                    <Col xs="2" style={{padding:"0px", margin:"5px"}}>
                        <Button onClick={this.deleteAllCourses} style={{ width:"100px"}}>Delete All Courses</Button>
                    </Col>
                    
                </Row>
                <br></br>
                <br></br>

                <Table  xs="3">
                    <thead><tr>
                        <th>Depatment</th>
                        <th>Course Number</th>
                        <th>Section</th>
                        <th>Semester</th>
                        <th>Year</th>
                        <th>Timeslot</th>
                        <th></th>
                        <th></th>


                    </tr></thead>
                    
                    <tbody>
                        {this.state.courses.length !== 0 && this.state.courses.map(x => (
                            <tr>
                                <td>{x.department }</td>
                                <td>{x.course_num}</td>
                                <td>{x.section}</td>
                                <td>{x.semester}</td>
                                <td>{x.year}</td>
                                <td>{x.timeslot}  </td>
                          
                                <td> 
                                <button onClick={() => this.deleteCourse(x.department,x.course_num,x.semester,x.year)}>Delete</button> 
                                </td>
                             
                                 
                            </tr>
                            
                        ))}
                    </tbody>
                </Table>
            </Container>
        );
    }
}
