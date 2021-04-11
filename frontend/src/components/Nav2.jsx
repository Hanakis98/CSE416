import {  Component } from "react";
import  React  from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Collapse, Navbar, NavbarToggler, NavbarText, NavbarBrand, Nav, NavItem } from 'reactstrap';
import Cookies from 'js-cookie';

class Nav2 extends Component{
    constructor(props) {
        super(props);
        this.props = props;

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            username: "FirstName LastName"
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    logout = () => {
        Cookies.remove('gpdLoggedIn');
        Cookies.remove('studentLoggedIn');

        //TODO this doesn't remove the token. the user is not technically logged out, they can still manually go to a route with a url and it will load the data
        Cookies.remove('token');
        
        window.location.reload();
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
                        
                        {gpdLoggedIn === '1' ? 
                        
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
                        :<div />}

                        {studentLoggedIn === '1' ? 
                        <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link class="nav-link" to="/studenthome">Student Home</Link>
                        </NavItem>
                        <NavItem >
                            <Link class="nav-link" to="/editStudent">Edit My Info</Link>
                        </NavItem>
                        </Nav>:<div />}

                        {(studentLoggedIn === '1' || gpdLoggedIn === '1') ?
                        <Nav className="ml-auto" navbar>
                            <NavbarText style={{padding: "10px"}}>{this.state.username}</NavbarText>
                            <Button onClick={this.logout} color="primary" >
                            Log Out
                            </Button>
                        </Nav>
                        :<div />}

                </Collapse>
            </Navbar>
        </div>
        );
    }
}

export default withRouter(Nav2);