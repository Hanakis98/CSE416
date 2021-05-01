import {  Component } from 'react';
import  React  from 'react';
import { Container, Row, Col, Form, Label, Input, FormGroup } from 'reactstrap';

export default class Trends extends Component{
    constructor(props) {
        super(props);
        this.state = {
            major: "",
            course: ""
        };
    }
    render(){
        return (
            
            <Container>
                <Row xs="2">
                    <FormGroup row>
                        <Label for="major" sm={3}>Major</Label>
                        <Col sm={8}>
                        <Input type="select" id="major" onChange = {e=> this.setState( {major: e.target.value })} >
                        <option value="None">None</option>

                        <option value="AMS">AMS</option>
                        <option value="BMI">BMI</option>
                        <option value="CSE">CSE</option>
                        <option value="ESE">ESE</option>
                        </Input>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="course" sm={3}>Course</Label>
                        <Col sm={8}>
                        <Input type="select" id="course"  onChange = {e=> this.setState( {course: e.target.value })}>
                        {this.state.major === 'None' && <>
                                        <option>None</option>
                        </>}
                        {this.state.major === 'AMS' && <>
                                        <option>AMS1</option>
                                        <option>AMS2</option>
                                        <option>AMS3</option>
                        </>}
                        {this.state.major === 'BMI' && <>
                                        <option>BMI1</option>
                                        <option>BMI2</option>
                                        <option>BMI3</option>
                        </>}
                        {this.state.major === 'CSE' && <>
                                        <option>CSE1</option>
                                        <option>CSE2</option>
                                        <option>CSE3</option>
                        </>}
                        {this.state.major === 'ESE' && <>
                                        <option>ESE1</option>
                                        <option>ESE2</option>
                                        <option>ESE3</option>
                        </>}
                        </Input>
                            
                        </Col>
                    </FormGroup>
                </Row>
                <Row xs="1">
                    <p>GRAPH GOES HERE</p>
                </Row>
            </Container>
        );
    }
}