import {  Component } from "react";
import  React  from "react";
import { Link, withRouter } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import Cookies from 'js-cookie';

class Nav2 extends Component{
    constructor(props) {
        super(props);
        this.props = props;

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
        
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render(){
        const gpdLoggedIn=Cookies.get("gpdLoggedIn");
        const studentLoggedIn=Cookies.get("studentLoggedIn");

        //change navbar if you're logged in as gpd or not
        if(gpdLoggedIn === 1)
        return (
        <div className="navigation">
            <Navbar color="inverse" light expand="md">
                <NavbarBrand><Link class="nav-link" to="/">MAST</Link></NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link class="nav-link" to="/">Home</Link>
                        </NavItem>
                    
                        {gpdLoggedIn === true &&<NavItem >
                            < Link   class="nav-link" to="/students">Students</Link>
                        </NavItem>
                          }
                        <NavItem>
                            <Link class="nav-link" to="/degrees">Degrees</Link>
                        </NavItem>
                        <NavItem>
                            <Link class="nav-link" to="/courses">Courses</Link>
                        </NavItem>
                        <NavItem>
                            <Link class="nav-link" to="/trends">Trends</Link>
                        </NavItem>
                        <NavItem>
                            <Link class="nav-link" to="/studenthome">Student Home</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
        );

        else if(studentLoggedIn === 1)
        return (
            <div className="navigation">
                <Navbar color="inverse" light expand="md">
                    <NavbarBrand><Link class="nav-link" to="/">MAST</Link></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link class="nav-link" to="/">Home</Link>
                            </NavItem>
                        
                            {gpdLoggedIn === 1 &&<NavItem >
                                < Link   class="nav-link" to="/students">Students</Link>
                            </NavItem>
                              }
                                  {studentLoggedIn === true &&<NavItem >
                                < Link   class="nav-link" to="/editStudent">Edit My info</Link>
                            </NavItem>
                              }
                            <NavItem>
                                <Link class="nav-link" to="/degrees">Degrees</Link>
                            </NavItem>
                            <NavItem>
                                <Link class="nav-link" to="/courses">Courses</Link>
                            </NavItem>
                            <NavItem>
                                <Link class="nav-link" to="/trends">Trends</Link>
                            </NavItem>
                            <NavItem>
                                <Link class="nav-link" to="/studenthome">Student Home</Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
            );
        
        else
        return (
            <div className="navigation">
                <Navbar color="inverse" light expand="md">
                    <NavbarBrand><Link class="nav-link" to="/">MAST</Link></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        
                    </Collapse>
                </Navbar>
            </div>
        );

    }
}

export default withRouter(Nav2);