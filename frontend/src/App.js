import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Nav2, Footer, Home, StudentHome, Students, Degrees, Courses, Trends, EditStudent } from "./components";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Nav2 />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/studenthome" exact component={() => <StudentHome />} />
          <Route path="/students" exact component={() => <Students />} />
          <Route path="/degrees" exact component={() => <Degrees />} />
          <Route path="/courses" exact component={() => <Courses />} />
          <Route path="/trends" exact component={() => <Trends />} />
          <Route path="/edit" exact component={() => <EditStudent />} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}
