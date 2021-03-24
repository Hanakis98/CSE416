import { React, Component } from 'react';
import { Container, Row, Col, Form, Button, Label, Input, FormGroup } from 'reactstrap';

export default class EditStudent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }
    render(){
        return (
            <Container>
                <Row>
                    Edit Student: Kevin McDonnell (or Add New Student)
                </Row>
                <Form>
                    <FormGroup row>
                        <Label for="name" sm={1}>Name</Label>
                        <Col sm={4}><Input type="text" id="name" /></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="id" sm={1}>ID</Label>
                        <Col sm={4}><Input type="text" id="id" /></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="email" sm={1}>Email</Label>
                        <Col sm={4}><Input type="text" id="email" /></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="major" sm={1}>Major</Label>
                        <Col sm={4}><Input type="select" id="id" /></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="track" sm={1}>Track</Label>
                        <Col sm={4}><Input type="select" id="track" /></Col>
                    </FormGroup>
                    <Button>Save</Button>
                </Form>
            </Container>
        );
    }
}