const express = require("express")
const app = express();
const PORT = 3000;

app.get('/', (req,res) => {
  res.send('The "home" route of my express server')
})

app.get('/home', (req,res) => {
  res.send('<h1> Hello World </h1>')
})

app.get('/list', (req,res) => {
  res.send(`
     <ul>
        <li> Item 1 </li>
        <li> Item 2 </li>
        <li> Item 3 </li>
      </ul>
    `);
    //
})

app.get('/go-home',(req,res) => {
  res.redirect('/home');
})

app.get('/json', (req,res) => {
  res.json({
       learner: '',
       grades:[90,80],
       enrolled:true,
       course: 'NodeJS and Express'
  })
})


app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`)
})

