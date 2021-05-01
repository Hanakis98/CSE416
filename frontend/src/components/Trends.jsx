import {  Component } from 'react';
import  React  from 'react';
import { Container, Row, Col, Form, Label, Input, FormGroup } from 'reactstrap';

export default class Trends extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
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
                        <option value="None Selected">None</option>

                        <option value="AMS">AMS</option>
                        <option value="CSE">CSE</option>
                        <option value="ESE">ESE</option>
                        <option value="BMI">BMI</option>
                        </Input>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="course" sm={3}>Course</Label>
                        <Col sm={8}>
                        <Input type="select" id="course"  onChange = {e=> this.setState( {track: e.target.value })}>
                        <option value="None Selected">None</option>
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