import {  Component } from 'react';
import  React  from 'react';
import { backendDomain } from './../App.js';
var axios = require("axios")
//import { Button } from 'reactstrap';

export default class Degrees extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            degreeReqsAMS:[],
            degreeReqsAMS:[],
            degreeReqsAMS:[],
            degreeReqsAMS:[]


        };
        

      
    }
    componentDidMount(){
        this.getAllDegreeReqs()
    }
    getAllDegreeReqs  () {
        axios.post(backendDomain + '/degreeRequirements/allDegreeRequirements',{ // get ALL
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
            ,
            credentials: 'include'
        }).then(data=>{
            
            console.log(data);
            this.setState({degreeRequirements:data.data})
            }
            );
    }
    render(){
        return (
            <div>
            <p style={{textAlign: "center", fontSize: "18px", fontWeight: "bold"}}>Degree Requirements</p>
            <div><pre>{JSON.stringify(this.state.degreeRequirements, null, 2) }</pre></div>           
            </div> 
        );
    }
}