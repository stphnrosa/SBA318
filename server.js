//reference for error handling middleware:https://medium.com/@arunchaitanya/understanding-normal-middleware-and-error-handling-middleware-in-express-js-d3ecbd9b9849 , https://expressjs.com/en/guide/error-handling.html
//reference for template: https://www.npmjs.com/package/ejs
//reference: https://www.youtube.com/watch?v=lYVKbAn5Od0
//reference:http://w3schools.com/nodejs/nodejs_filesystem.asp


const express = require("express");
const expressLayouts = require('express-ejs-layouts')
const app = express();
const PORT = 3000;


////////////////////////////////////////////////////
// serve static files from the styles dictionary //
///////////////////////////////////////////////////
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))


////////////////////////////////////////////
///////////// TEMPLATE ENGINE /////////////
//////////////////////////////////////////
app.use(expressLayouts)
app.set('view engine', 'ejs'); // installed this by typing npm install ejs in terminal
app.set('views', './views');

const fs = require("fs"); // lets you read/create/update/delete/rename files

//middleware should be at the top of the file
app.use((req, res, next) => {
  console.log("This middleware is running for all routes. This one runs first");
  next(); // this lets the code know to run whatever is next
});

app.use((req, res, next) => {
  console.log(
    "This middleware is running for all routes. This one runs second"
  );
  next();
});

app.use((err, req, res, next) => {
  // This includes the 4 arguments needed
  console.error(err.stack);
  res.status(500).send("Uh-oh! There's been an error");
}); // Should I leave error handling middleware here or after routes? Not sure.

function customMiddleware(req, res, next) {
  console.log(`This middleware runs for all routes. this is the third`);
  next();
}

app.use(customMiddleware);

//////////////////////////////////////////////////////
//////////////// ROUTES !!!!! ////////////////////////
/////////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.send('The "home" route of my express server');
});

app.get("/home", (req, res) => {
  res.send("<h1> Hello World </h1>");
});

app.get("/list", (req, res) => {
  res.send(`
     <ul>
        <li> Item 1 </li>
        <li> Item 2 </li>
        <li> Item 3 </li>
      </ul>
    `);
  //
});

app.get("/go-home", (req, res) => {
  res.redirect("/home");
});

app.get("/Posts", (req, res) => {
  res.send("<h1> Here are some of our favorite skincare products </h1>");
  res.send()
});

app.get("/json", (req, res) => {
  res.json({
    learner: "",
    grades: [90, 80],
    enrolled: true,
    course: "NodeJS and Express",
  });
});

app.get("/user/:id", (req, res) => {
  // this is an endpoint
  // console.log(req.params)
  res.send(`The ID of this user is ${req.params.id}`);
});

app.get("/name/:firstName", (req, res) => {
  // this used an endpoint
  console.log("Params: ", req.params);
  console.log("Queries", req.query);
  res.send(`My name is ${req.params.firstName} ${req.query.lastName}`);
}); // key value pair in URL uses ? and =

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
