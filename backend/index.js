const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const port = process.env.PORT || 3001;

const studentRoutes = require("./routes/students");
const advisorsRoutes = require("./routes/advisors");
const coursesRoutes = require("./routes/courses");
const requirementsRoutes = require("./routes/requirements.js");
const coursePlanRoutes = require("./routes/course_plan.js");
const degreeRequirements = require("./routes/degree_requirements.js");
const cookieParser = require("cookie-parser");

app.use(logger('dev'));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use("/students", studentRoutes);
app.use("/advisors", advisorsRoutes);
app.use("/courses", coursesRoutes);
app.use("/requirements", requirementsRoutes);
app.use("/coursePlans", coursePlanRoutes);
app.use("/degreeRequirements", degreeRequirements);
var session = require('express-session');

// app.use(session({
//     secret: 'yoursecret',
//     cookie: { 
//         path: '/',
//         domain: 'localhost:3001',
//         maxAge: 1000 * 60 * 24 / / 24 hours
//     }
// }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', "http://localhost:3000");
  res.header('Access-Control-Allow-Methods', 'application/json');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.get("/", (request, response) => {
    console.log("HELLO FROM EXPRESS")
});

app.listen(port, function() {
    console.log("Running on " + port);
});

module.exports = app;
