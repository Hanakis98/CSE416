import { React, Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

class Nav2 extends Component{
    constructor(props) {
        super(props);
        this.props = props;

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render(){
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
                        {/* <NavItem>
                            <NavLink href="/">Home (navlink)</NavLink>
                        </NavItem> */}
                        <NavItem>
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
                        <NavItem>
                            <Link class="nav-link" to="/studenthome">Student Home</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
        );
    }
}

export default withRouter(Nav2);