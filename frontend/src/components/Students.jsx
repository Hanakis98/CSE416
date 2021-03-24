import { React, Component } from 'react';
import { Table, Container, Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap';

export default class Students extends Component{
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            students: []
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render(){
        return (
            <Container>
                <Row>
                    <div className="container">
                    <button onClick={sayHello}>Default</button>
                    </div>
                </Row>
                
                <Row>
                    <Col xs="6">
                        <Form inline>
                        <FormGroup>
                            <Label>Search</Label>
                            <Input type="text" id="search" />
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
                        <Button>Add Student</Button>
                    </Col>
                    <Col xs="2">
                        <Button>Import Student Data</Button>
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
                        <tr>
                            <td>Ahmad Esmaili</td>
                            <td>110253286</td>
                            <td>3.80</td>
                            <td>ISE</td>
                            <td>7</td>
                            <td>5</td>
                            <td>2</td>
                            <td>Spring 2022</td>
                            <td>6</td>
                            <td>Valid</td>
                            <td>Incomplete</td>
                        </tr>
                        <tr>
                            <td>Kevin McDonnell</td>
                            <td>111002348</td>
                            <td>3.94</td>
                            <td>CSE</td>
                            <td>9</td>
                            <td>3</td>
                            <td>4</td>
                            <td>Fall 2021</td>
                            <td>7</td>
                            <td>Invalid</td>
                            <td>Incomplete</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        );
    }
}

function sayHello(params) {
    fetch("https://mast-system.herokuapp.com/students/items").then(response =>
    response.json().then(data => ({
      data: data,
      status: response.status
    })
    ).then(res => {
      console.log(res.status, res.data)
    }));

    fetch("http://localhost:3001/students/allStudents").then(response =>
    response.json().then(data => ({
      data: data,
      status: response.status
    })
    ).then(res => {
      console.log(res.status, res.data)
    }));

    fetch("http://localhost:3001/advisors/allGPDs").then(response =>
    response.json().then(data => ({
      data: data,
      status: response.status
    })
    ).then(res => {
      console.log(res.status, res.data)
    }));

    fetch("http://localhost:3001/courses/allCourses").then(response =>
    response.json().then(data => ({
      data: data,
      status: response.status
    })
    ).then(res => {
      console.log(res.status, res.data)
    }));

  }