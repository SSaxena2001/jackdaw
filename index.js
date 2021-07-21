const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
//Routes follows here
const signup = require("./routes/signup");
const home = require("./routes/home");

//App Initialization
const app = express();
//Putting set engine
app.set("view engine", "ejs");
//Adding middlewares here
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Storing cookies for use of login
//mongodb connect and uri will be here
mongoose
  .connect("mongodb://localhost:27017/chatdaw", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log(err);
  });

//Using routes here
app.use("/", signup);
app.use('/home', home);

//Port is here
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
