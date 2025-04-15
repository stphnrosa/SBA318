//reference for error handling middleware:https://medium.com/@arunchaitanya/understanding-normal-middleware-and-error-handling-middleware-in-express-js-d3ecbd9b9849 , https://expressjs.com/en/guide/error-handling.html
//reference for template: https://www.npmjs.com/package/ejs
//reference: https://www.youtube.com/watch?v=lYVKbAn5Od0
//reference:http://w3schools.com/nodejs/nodejs_filesystem.asp


const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const app = express();
const PORT = 3000;


////////////////////////////////////////////
///////////// TEMPLATE ENGINE /////////////
//////////////////////////////////////////
app.use(expressLayouts);
app.set('view engine', 'ejs'); // installed this by typing npm install ejs in terminal
app.set('layout', 'layouts/layout');
app.use(express.static('public'));


///////////////////////////////////////////////
//middleware should be at the top of the file//
///////////////////////////////////////////////
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

function customMiddleware(req, res, next) {
  console.log(`This middleware runs for all routes. this is the third`);
  next();
}

app.use(customMiddleware);


//////////////////////////////////////////////////////
//////////////// ROUTES !!!!! ////////////////////////
/////////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.render('home', { title: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    items: ['Item 1', 'Item 2', 'Item 3']
  });
});

app.get("/go-home", (req, res) => {
  res.redirect("/home");
});

app.get("/posts", (req, res) => {
  res.render('posts', { title: 'posts' });
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

//////////////////////Error Handling/////////////////////////
////////////////////////////////////////////////////////////

app.use((err, req, res, next) => {
  // This includes the 4 arguments needed
  console.error(err.stack);
  res.status(500).send("Uh-oh! There's been an error");
}); // Should I leave error handling middleware here or after routes? Not sure.

///////////////////////////////////////////////
//////////////////LISTENING///////////////////
//////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
