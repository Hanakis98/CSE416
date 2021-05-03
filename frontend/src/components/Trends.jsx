import {  Component } from 'react';
import  React  from 'react';
import { Button, Container, Row, Col, Label, Input, FormGroup } from 'reactstrap';
import { backendDomain } from './../App.js';
import axios from 'axios';
import BarChart from './BarChart.jsx'
import Paper from '@material-ui/core/Paper';
import { Animation } from '@devexpress/dx-react-chart';

import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
function BarGroup(props) {
    let barPadding = 2
    let barColour = '#348AA7'
    let widthScale = d => d * 10
  
    let width = widthScale(props.d.value)
    let yMid = props.barHeight * 0.5
    
    return <g className="bar-group">
      <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle" >{props.d.name}</text>
      <rect y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
      <text className="value-label" x={width- 8} y={yMid} alignmentBaseline="middle" >{props.d.value}</text>
    </g>
  }
export default class Trends extends Component{
    constructor(props) {
        super(props);
        this.state = {
            major: "",
            course: "",
            semesterStart: "",
            yearStart: "",
            semesterEnd: "",
            yearEnd: "",
            chartData : []
        };
    }

    componentDidMount() {
        this.generateGraph();
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
        axios.post(  backendDomain + '/courses/getEnrollmentTrend',  {
         
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              major: this.state.major,
              course: this.state.course,

            // responseType: 'json',
          
            // enrollmentNumbers: (2)  semestersAndYears:
      
          }).then(response=>{
             console.log(response)

            // //Logic goes here
             console.log(this.state.semesterStart + " " + this.state.yearStart)
             console.log(response.data.semestersAndYears)
            for(var i = 0 ; i < response.data.semestersAndYears.length; i++){
                if(this.state.semesterStart=="" || this.state.semesterEnd=="")
                    break
                if(response.data.semestersAndYears[i] != (this.state.semesterStart + " " + this.state.yearStart)){
                    console.log(response.data.semestersAndYears[i],"shift",(this.state.semesterStart + " " + this.state.yearStart))
                    response.data.semestersAndYears.shift()
                    response.data.enrollmentNumbers.shift()

                }
                else{
                    break
                }
            }
             console.log(this.state.semesterEnd + " " + this.state.yearEnd)

            for(var i = response.data.semestersAndYears.length-1; i>0; i--){
                if(this.state.semesterStart="" || this.state.semesterEnd=="")
                break
                console.log(response.data.semestersAndYears[i] == (this.state.semesterEnd + " " + this.state.yearEnd))
                if(response.data.semestersAndYears[i] != (this.state.semesterEnd + " " + this.state.yearEnd)){
                    // console.log("shift2")

                    response.data.semestersAndYears.pop()
                    response.data.enrollmentNumbers.pop()

                }
                else{
                    break
                }
            }
          
            var newData = []
            for(var i = 0 ; i < response.data.semestersAndYears.length; i++){

                    newData.push ( { 
                        semester:response.data.semestersAndYears[i],  
                        enrolled:parseInt(response.data.enrollmentNumbers[i])

                    })
            }
            this.setState({chartData:newData});

            console.log(this.state)
            // const data = response.data.enrollmentNumbers
            // const svg = d3.select("body").append("svg").attr("width", 700).attr("height", 300);
            // svg.selectAll("rect").data(data).enter().append("rect")
            // selection.attr("property", (d, i) => {})
            })
           

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
                        <Input  id="course"  onChange = {e=> this.setState( {course: e.target.value })}>
                     
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
                
                <Paper>
                    <Chart data={this.state.chartData}>
                    <ArgumentAxis />
                    <ValueAxis max={7} />
                    <BarSeries
                        valueField="enrolled"
                        argumentField="semester"
                    />
                    <Title text="Enrollment Trends" />
                    <Animation />
                    </Chart>
                </Paper>
                <Row >
                    </Row>
            </Container>
        );
    }
}