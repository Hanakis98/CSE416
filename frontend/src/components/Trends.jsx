import {  Component } from 'react';
import  React  from 'react';
import { Button, Container, Row, Col, Label, Input, FormGroup } from 'reactstrap';


export default class Trends extends Component{
    constructor(props) {
        super(props);
        this.state = {
            major: "",
            course: "",
            semesterStart: "",
            yearStart: "",
            semesterEnd: "",
            yearEnd: ""
        };
    }

    generateGraph = () => {
        
        const data = {
            major: this.state.major,
            course: this.state.course,
            semesterStart: this.state.semesterStart,
            yearStart: this.state.yearStart,
            semesterEnd: this.state.semesterStart,
            yearEnd: this.state.yearEnd
        }

        console.log(data);


    }

    render(){
        return (
            
            <Container>
                <Row xs="1">
                    <FormGroup row>
                        <Label for="major">Major</Label>
                        <Col style={{marginLeft: '3.75rem'}} sm={{ size: 'auto'}}>
                        <Input type="select" id="major"  onChange  = {e=> this.setState( {major: e.target.value })} >
                        <option value="None">None</option>

                        <option value="AMS">AMS</option>
                        <option value="BMI">BMI</option>
                        <option value="CSE">CSE</option>
                        <option value="ESE">ESE</option>
                        </Input>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="course">Course</Label>
                        <Col style={{marginLeft: '3.3rem'}} sm={{ size: 'auto', alignItems: 'center' }}>
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

                    <FormGroup row>
                        <Label for="semesterStart">Semester Start</Label>
                        <Col sm={{ size: 'auto' }}>
                            <Input id="semesterStart" onChange = {e=> this.setState( {semesterStart: e.target.value })} />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="yearStart">Year Start</Label>
                        <Col style={{marginLeft: '2.3rem'}}sm={{ size: 'auto'}}>
                            <Input id="yearStart" onChange = {e=> this.setState( {yearStart: e.target.value })} />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="semesterEnd">Semester End </Label>
                        <Col style={{marginLeft: '.5rem'}} sm={{ size: 'auto' }}>
                            <Input id="semesterEnd" onChange = {e=> this.setState( {semesterEnd: e.target.value })} />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="yearEnd">Year End</Label>
                        <Col style={{marginLeft: '2.7rem'}} sm={{ size: 'auto' }}>
                            <Input id="yearEnd" onChange = {e=> this.setState( {yearEnd: e.target.value })} />
                        </Col>
                    </FormGroup>

                    <Button color="success" onClick={this.generateGraph}>Generate Graph</Button>

                </Row>

                <Row xs="1">
                    <div id="courseChart">Chart here</div>
                </Row>
            </Container>
        );
    }
}