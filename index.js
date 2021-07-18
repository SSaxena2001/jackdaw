const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const User = require("./models/User");
//Routes follows here
const signup = require("./routes/signup");

//App Initialization
const app = express();
//Putting set engine
app.set("view engine", "ejs");
//Adding middlewares here
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan());

//mongodb connect and uri will be here
mongoose
  .connect("mongodb://localhost/chatdaw", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log(err);
  });

//Using routes here
app.use("/", signup);

//Port is here
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
