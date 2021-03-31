import {  Component } from 'react';
//import { Button } from 'reactstrap';
import  React  from 'react';


export default class StudentHome extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }
    render(){
        return (
            <p>Template page</p>
        );
    }
}