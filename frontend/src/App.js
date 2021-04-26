import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar, Home, Students, Degrees, Courses, Trends, AddStudent,EditStudent } from "./components";

export let backendDomain = "http://localhost:3001";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={(props) => <Home {...props}/>} />
          <Route path="/students" exact component={() => <Students />} />
          <Route path="/degrees" exact component={() => <Degrees />} />
          <Route path="/courses" exact component={() => <Courses />} />
          <Route path="/trends" exact component={() => <Trends />} />
          <Route path="/add" exact component={() => <AddStudent />} />
          <Route path="/editStudent" exact component={() => <EditStudent />} />

        </Switch> 
      </Router>
    </div>
  );
}
