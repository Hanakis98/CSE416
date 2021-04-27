import { Component } from 'react';
import React from 'react';
import { Table, Container, Row, Button } from 'reactstrap';
import { backendDomain } from './../App.js';

export default class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            courses: []
        };
    }

    componentDidMount() {
        this.readAllCourses().then(courses => this.setState({ courses: courses }))
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
        let json = { sbu_id: "OFFERING", department: row[0], course_num: row[1], section: row[2], semester: row[3], year: row[4], timeslot: row[5], description: "", credits: "", prerequisites: [] }
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
        const data = { sbu_id: "OFFERING", department: d, course_num: cn, semester: s, year: y }


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
                this.setState({ courses: data })
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
                this.setState({ courses: data })
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    scrapeCourseInfo = async event => {
        // var re = /(?<=[A-Z]{3} [0-9]{3})(.*)(?=\n\n)/g
        var file = event.target.files[0]
        var text = await file.text();

        text = text.substring(text.indexOf(":") -7)
        var arr = text.split("\n\n\n\n")

        for ( var i =0; i < arr.length ; i++){
            fetch(backendDomain + '/courses/scrapeCourseInfo', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
                body: JSON.stringify( {courseInfo: arr[i]})
            })
            console.log(JSON.stringify({courseInfo: arr[i]}))


        }

        //var match;
        // while ((match = re.exec(text)) != null) {
        //     console.log(match);
        // }         
        // console.log( re.exec(text))

        
    }
    render() {
        return (
            <Container>
                <Row style={{paddingLeft:"10px", paddingRight:"10px", alignItems: 'center', justifyContent: 'flex-end'}}>
               
                    <input id="myInput" type="file" ref={(ref) => this.uploadCourseInfo = ref} style={{ display: 'none' }} onChange={this.scrapeCourseInfo} />
                    <Button onClick={(e) => this.uploadCourseInfo.click()} style={{ width:"120px", margin:"5px"}}>Scrape Course Info </Button>
                    
                    <input id="myInput" type="file" ref={(ref) => this.uploadCourses = ref} style={{ display: 'none' }} onChange={this.onCourseFileChange} />
                    <Button onClick={(e) => this.uploadCourses.click()} style={{ width:"130px", margin:"5px"}}>Import Course Offerings </Button>


                    <Button onClick={this.deleteAllCourses} style={{ width:"100px", margin:"5px"}}>Delete All Courses</Button>
                    
                </Row>

                <Table xs="3">
                    <thead><tr>
                        <th>Department</th>
                        <th>Course</th>
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
                                <td>{x.department}</td>
                                <td>{x.course_num}</td>
                                <td>{x.section}</td>
                                <td>{x.semester}</td>
                                <td>{x.year}</td>
                                <td>{x.timeslot}  </td>

                                <td>
                                    <button onClick={() => this.deleteCourse(x.department, x.course_num, x.semester, x.year)}>Delete</button>
                                </td>


                            </tr>

                        ))}
                    </tbody>
                </Table>
            </Container>
        );
    }
}
