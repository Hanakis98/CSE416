import { React, Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Row, Col, Jumbotron, Button } from 'reactstrap';

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
            <div className="container">
                <button onClick={sayHello}>Default</button>
            </div>

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
}