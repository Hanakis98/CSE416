import React from "react";
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function Home() {
  return (
    <Container style={{display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
      <Form>
        <FormGroup>
          <Label for="login_id">ID</Label>
          <Input type="text" name="id" id="login_id" placeholder="110047354" style={{width:200}} />
        </FormGroup>
        <FormGroup>
          <Label for="login_password">Password</Label>
          <Input type="password" name="password" id="login_password" placeholder="" style={{width:200}} />
      </FormGroup>
        <Button>Submit</Button>
      </Form>
    </Container>
  );
}
