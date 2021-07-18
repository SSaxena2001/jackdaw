const express = require("express");
const bodyparser = require("body-parser");
const signup = require("./routes/signup");


const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
//Using routes here
app.use('/', signup);

// app.get("/", function (req, res) {
//   res.render('signup');
// });
// app.post("/", function (req, res) {
//   let firstname = req.body.fname;
//   let lastname = req.body.lname;
//   let email = req.body.email;
//   console.log(firstname, lastname, email);
// });



const port = process.env.PORT || 3000;
app.listen(port,()=>{
  console.log(`Server running at http://localhost:${port}`);
});
//446df91b1815b788b6f8a2505e4f07e0-us6
