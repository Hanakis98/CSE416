import { React, Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Row, Col, Jumbotron, Button } from 'reactstrap';

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