const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const port = process.env.PORT || 3001;
const studentRoutes = require("./routes/students");

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/students", studentRoutes);

app.get("/", (request, response) => {
    console.log("HELLO FROM EXPRESS")
});


app.listen(port, function() {
    console.log("Runnning on " + port);
});



module.exports = app;

