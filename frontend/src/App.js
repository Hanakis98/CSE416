
<<<<<<< HEAD
function sayHello(params) {

    fetch("http://localhost:3001/students/allStudents").then(response =>
    response.json().then(data => ({
      data: data,
      status: response.status
    })
    ).then(res => {
      console.log(res.status, res.data)
    }));

    fetch("http://localhost:3001/advisors/allGPDs").then(response =>
    response.json().then(data => ({
      data: data,
      status: response.status
    })
    ).then(res => {
      console.log(res.status, res.data)
    }));
=======
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Nav2, Footer, Home, About, Contact, Reactstrap, StudentHome, Students, Degrees, Courses, Trends } from "./components";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Nav2 />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/reactstrap" exact component={() => <Reactstrap />} />
          <Route path="/studenthome" exact component={() => <StudentHome />} />
          <Route path="/students" exact component={() => <Students />} />
          <Route path="/degrees" exact component={() => <Degrees />} />
          <Route path="/courses" exact component={() => <Courses />} />
          <Route path="/trends" exact component={() => <Trends />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
>>>>>>> 93201ff783c751a4117ccbef0114d3924a9df392

    fetch("http://localhost:3001/courses/allCourses").then(response =>
    response.json().then(data => ({
      data: data,
      status: response.status
    })
    ).then(res => {
      console.log(res.status, res.data)
    }));
}
