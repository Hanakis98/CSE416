import {  Component } from 'react';
import  React  from 'react';
import { backendDomain } from './../App.js';
import { Alert, Table, Container, Row, Col, Form, Button, Label, Input, FormGroup } from 'reactstrap';

var axios = require("axios")
//import { Button } from 'reactstrap';

export default class Degrees extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            degreeReqsAMS:[],
            degreeReqsBMI:[],
            degreeReqsCSE:[],
            degreeReqsECE:[]

        };
        

      
    }
    componentDidMount(){
        this.getAllDegreeReqs()
    }
    getAllDegreeReqs  () {
        axios.post(backendDomain + '/degreeRequirements/getDegreeRequriement',{ // get ALL
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
            ,
            credentials: 'include',
            department:"AMS"
        }).then(data=>{
            
            console.log(data);
            this.setState({degreeReqsAMS:data.data})
            }
            );

            axios.post(backendDomain + '/degreeRequirements/getDegreeRequriement',{ // get ALL
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
                ,
                credentials: 'include',
                department:"BMI"
            }).then(data=>{
                
                console.log(data);
                this.setState({degreeReqsBMI:data.data})
                }
                );

                axios.post(backendDomain + '/degreeRequirements/getDegreeRequriement',{ // get ALL
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                    ,
                    credentials: 'include',
                    department:"CSE"
                }).then(data=>{
                    
                    console.log(data);
                    this.setState({degreeReqsCSE:data.data})
                    }
                    );

                    axios.post(backendDomain + '/degreeRequirements/getDegreeRequriement',{ // get ALL
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                        ,
                        credentials: 'include',
                        department:"ECE"
                    }).then(data=>{
                        
                        console.log(data);
                        this.setState({degreeReqsECE:data.data})
                        }
                        );
    }
    render(){
        return (
            <Container fluid={true} style={{ paddingLeft:"100px",paddingRight:"100px"}}>
                <Row >
            <Col sm="3">
            <div>
            <p style={{textAlign: "center", fontSize: "18px", fontWeight: "bold"}}>AMS</p>
            <div><pre>{JSON.stringify(this.state.degreeReqsAMS, null, 2) }</pre></div>           
            </div> 
            </Col>
            <Col sm="3">
            <div>
            <p style={{textAlign: "center", fontSize: "18px", fontWeight: "bold"}}>BMI</p>
            <div><pre>{JSON.stringify(this.state.degreeReqsBMI, null, 2) }</pre></div>           
            </div> 
            </Col>
            <Col sm="3">
            <div>
            <p style={{textAlign: "center", fontSize: "18px", fontWeight: "bold"}}>CSE</p>
            <div><pre>{JSON.stringify(this.state.degreeReqsCSE, null, 2) }</pre></div>           
            </div> 
            </Col>
            <Col sm="3">
            <div>
            <p style={{textAlign: "center", fontSize: "18px", fontWeight: "bold"}}>ESE</p>
            <div><pre>{JSON.stringify(this.state.degreeReqsECE, null, 2) }</pre></div>           
            </div> 
            </Col>
            </Row>
            </Container>
        );
    }
}