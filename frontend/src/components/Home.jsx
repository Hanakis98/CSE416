import {  Component, } from 'react';
import  React  from 'react';
//import { Link } from "react-router-dom";
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';
//import Cookies from 'js-cookie';

var sha = require("sha1")
var axios = require("axios")

export default class  Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      error:0,
      id: "",
      password: "",
      loginError: false
    };
  }

  login = ()=> {
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
      },          credentials: 'same-origin',

      withCredentials: true

    }).then((response) => {
      window.location.reload(true);
    }).catch((response) => {
      // dispatch(pushState(null, '/error'));
      this.setState({loginError: true})
      //window.location.reload(true);
    });
  }

  render(){
    return (
      <div>
      <Container style={{display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
        <Form>
          <FormGroup>
            <Label for="login_id" style={{display: 'flex',  justifyContent: 'center'}}>ID</Label>
            <Input type="text" name="id" id="login_id" placeholder="adminID" style={{width:200}}  onChange = {e=> this.setState( {id: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="login_password" style={{display: 'flex',  justifyContent: 'center'}}>Password</Label>
            <Input type="password" name="password" id="login_password" placeholder="" style={{width:200}} onChange = {e=> this.setState( {password: e.target.value })} onKeyPress={ e => e.key === 'Enter' ? this.login() : 1}/>
        </FormGroup>
        
          <Button onClick={this.login}>Submit</Button>
          
        </Form>
      </Container>

      {this.state.loginError === true ? 
          <p style={{color: "red", textAlign: "center", padding: "10px"}}>ID and Password combination not found.</p>
        :<div />}
      </div>
    );
  }
}
