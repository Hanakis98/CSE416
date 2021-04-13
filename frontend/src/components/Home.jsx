import React, {  Component, } from 'react';
import { Redirect } from "react-router-dom";
import { Row, Alert, Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Cookies from 'js-cookie';

var sha = require("sha1")
var axios = require("axios")

export default class  Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      error:0,
      id: "",
      password: "",
      loginError: false,
      notauthMessage: false
    };
  }

  componentDidMount(){
    if (this.props.location.state != null){
      if(this.props.location.state.notauth === true){
          this.setState({notauthMessage: true});
      }
    }

    if (this.state.loginError === true){
      this.setState({loginError: false});
    }
  }

  loginAsAdvisor = ()=> {
    let json_data = {
        sbu_id: this.state.id,
        password: sha(this.state.password + "SaltAndP3pp3r!ghtialkdsflkavnlkanfalglkahtklagnalfkja")
    }
    axios.withCredentials=true
    axios({
      method: 'POST',
      url: `http://localhost:3001/advisors/login`,
      data:  json_data,
      // responseType: 'json',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      withCredentials: true

    }).then((response) => {
      window.location.reload();
    }).catch((response) => {
      // dispatch(pushState(null, '/error'));
      this.setState({loginError: true, notauthMessage: false});
      //window.location.reload(true);
    });
  }

  loginAsStudent = ()=> {
    let json_data = {
      sbu_id: this.state.id,
      password: sha(this.state.password + "SaltAndP3pp3r!ghtialkdsflkavnlkanfalglkahtklagnalfkja")
    }

    axios.withCredentials=true
    axios({
      method: 'POST',
      url: `http://localhost:3001/students/login`,
      data:  json_data,
      // responseType: 'json',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      withCredentials: true

    }).then((response) => {
      response.json()
      window.location.reload();
    }).catch((response) => {
      // dispatch(pushState(null, '/error'));
      this.setState({loginError: true, notauthMessage: false});
      //window.location.reload(true);
    });
  }

  render(){
    const gpdLoggedIn=Cookies.get("gpdLoggedIn");
    const studentLoggedIn=Cookies.get("studentLoggedIn");
    if(gpdLoggedIn === "1"){
      return <Redirect to='/students' />
    }
    else if(studentLoggedIn === "1"){
      return <Redirect to='/studenthome' />
    }

    return (
      <div>
      <Container>
        <Row style={{ alignItems: 'center', justifyContent: 'center'}}>
        <Form>
          <FormGroup>
            <Label for="login_id" style={{ display: 'flex',  justifyContent: 'center'}}>ID</Label>
          </FormGroup>
          <FormGroup row style={{justifyContent: 'center'}}>
            <Input type="text" name="id" id="login_id" style={{  width:200, display: 'flex'}}  onChange = {e=> this.setState( {id: e.target.value })} />
          </FormGroup>

          <FormGroup>
            <Label for="login_password" style={{display: 'flex',  justifyContent: 'center'}}>Password</Label>
          </FormGroup>
          <FormGroup row style={{justifyContent: 'center'}}>
            <Input type="password" name="password" id="login_password" placeholder="" style={{width:200}} onChange = {e=> this.setState( {password: e.target.value })} onKeyPress={ e => e.key === 'Enter' ? this.loginAsAdvisor() : 1}/>
          </FormGroup>

          <FormGroup row style={{justifyContent: 'center'}}>
            <Button color="primary" onClick={this.loginAsAdvisor}>Login As Advisor</Button><br></br>
          </FormGroup>
          <FormGroup row style={{justifyContent: 'center'}}>
            <Button color="primary" onClick={this.loginAsStudent}>Login As Student</Button>
          </FormGroup>

          <FormGroup >
            {this.state.loginError === true && 
            <Alert color="danger" style={{textAlign: "center"}}>
                ID and Password combination not found.
            </Alert>
            }
            {this.state.notauthMessage === true && 
            <Alert color="danger" style={{textAlign: "center"}}>
              Please log in to view this content.
            </Alert>
            }
          </FormGroup>
          
        </Form>
        </Row>
      </Container>
      
      </div>
    );
  }
}
