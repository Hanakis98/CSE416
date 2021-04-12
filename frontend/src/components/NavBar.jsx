import {  Component } from "react";
import  React  from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Collapse, Navbar, NavbarToggler, NavbarText, NavbarBrand, Nav, NavItem } from 'reactstrap';
import Cookies from 'js-cookie';
import axios from 'axios'

class Nav2 extends Component{
    constructor(props) {
        super(props);
        this.props = props;

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            username: Cookies.get("firstName") +  " " + Cookies.get("lastName") 
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen

        });
    }
    logout = () => {
        axios({
            method: 'POST',
            url: `http://localhost:3001/logout`,
            // responseType: 'json',
            headers: {
              Accept: 'application/json',
      
              'Content-Type': 'application/json'
            },          credentials: 'same-origin',
      
            withCredentials: true
      
          }).then((response) => {
            response.json()
            window.location.replace("/")
      
      
          }).catch((response) => {
            // dispatch(pushState(null, '/error'));
            window.location.replace("/")
          }) 
    
        window.location.replace("/");
    }
    render(){
        const gpdLoggedIn=Cookies.get("gpdLoggedIn");
        const studentLoggedIn=Cookies.get("studentLoggedIn");
        
        //navbar buttons change depending on which type of user is logged in
        return (
        <div className="navigation">
            <Navbar color="inverse" light expand="md">
                <NavbarBrand><Link class="nav-link" to="/">MAST</Link></NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                        
                    {gpdLoggedIn === '1' && 
                    <Nav className="mr-auto" navbar>
                    <NavItem >
                        <Link class="nav-link" to="/students">Students</Link>
                    </NavItem>
                    <NavItem>
                        <Link class="nav-link" to="/degrees">Degrees</Link>
                    </NavItem>
                    <NavItem>
                        <Link class="nav-link" to="/courses">Courses</Link>
                    </NavItem>
                    <NavItem>
                        <Link class="nav-link" to="/trends">Trends</Link>
                    </NavItem>
                    </Nav>
                    }

                    {studentLoggedIn === '1' && 
                    <Nav className="mr-auto" navbar>
                    <NavItem >
                        <Link class="nav-link" to="/editStudent">Edit My Info</Link>
                    </NavItem>
                    <NavItem >
                        <Link class="nav-link" to="">Degree Progress</Link>
                    </NavItem>
                    </Nav>}

                    {(studentLoggedIn === '1' || gpdLoggedIn === '1') &&
                    <Nav className="ml-auto" navbar>
                        <NavbarText style={{marginRight: "8px"}}>{this.state.username}</NavbarText>
                        <Button onClick={this.logout} color="primary">
                        Log Out
                        </Button>
                    </Nav>
                    }

                </Collapse>
            </Navbar>
        </div>
        );
    }
}

export default withRouter(Nav2);