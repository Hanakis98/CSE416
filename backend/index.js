const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const port = process.env.PORT || 3001;


const studentRoutes = require("./routes/students.js");
const advisorsRoutes = require("./routes/advisors.js");
const coursesRoutes = require("./routes/courses.js");
const requirementsRoutes = require("./routes/requirements.js");
const coursePlanRoutes = require("./routes/course_plan.js");
const degreeRequirements = require("./routes/degree_requirements.js");
const cookieParser = require("cookie-parser");

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use("/students", studentRoutes);
app.use("/advisors", advisorsRoutes);
app.use("/courses", coursesRoutes);
app.use("/requirements", requirementsRoutes);
app.use("/coursePlans", coursePlanRoutes);
app.use("/degreeRequirements", degreeRequirements);


 

app.get("/", (request, response) => {
    console.log("HELLO FROM EXPRESS")
});


app.listen(port, function() {
    console.log("Runnning on " + port);
});



module.exports = app;

