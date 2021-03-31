import {  Component, } from 'react';
import  React  from 'react';

import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';
export default class  Home extends Component {
  constructor(props){
    super(props);
    this.state = {

      username: "",
      password: "",

  };
  
  }

  login = ()=> {
    let json_data = {
        username: this.state.username,
        password: this.state.password + "SaltAndP3pp3r!ghtialkdsflkavnlkanfalglkahtklagnalfkja"

    }
    fetch('http://localhost:3001/advisors/login', { 
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },    
        credentials: 'same-origin',
                body: JSON.stringify(json_data),

    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}

  render(){
  return (
    <Container style={{display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
      <Form>
        <FormGroup>
          <Label for="login_id">ID</Label>
          <Input type="text" name="id" id="login_id" placeholder="110047354" style={{width:200}}  onChange = {e=> this.setState( {username: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="login_password">Password</Label>
          <Input type="password" name="password" id="login_password" placeholder="" style={{width:200}} onChange = {e=> this.setState( {password: e.target.value })} />
      </FormGroup>
        <Button onClick ={this.login}>Submit</Button>
      </Form>
    </Container>
  );
}
}
