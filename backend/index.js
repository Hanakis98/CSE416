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
var frontEndDomain = "http://localhost:3000"

app.use(logger('dev'));
app.use(cors({credentials: true, origin: frontEndDomain}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use("/students", studentRoutes);
app.use("/advisors", advisorsRoutes);
app.use("/courses", coursesRoutes);
app.use("/requirements", requirementsRoutes);
app.use("/coursePlans", coursePlanRoutes);
app.use("/degreeRequirements", degreeRequirements);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', frontEndDomain);
  res.header('Access-Control-Allow-Methods', 'application/json');
  next();
});

app.get("/", (request, response) => {
    console.log("HELLO FROM EXPRESS")
});
app.post("/logout", (req, res) => { 
    // Check if user exists
    // Check password    
      res.cookie("token",  false ,{ maxage:3000, httpOnly: true , path:"/" });
      res.cookie("gpdLoggedIn",0,{ maxage:3000, httpOnly: false ,path:"/" });
      res.cookie("studentLoggedIn",0,{ maxage:300, httpOnly: false ,path:"/" });

      res.send();
 
});

app.listen(port, function() {
    console.log("Running on " + port);
});

module.exports = app;
