const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();

//TEMPLATE ENGİNE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));

app.get('/', (req, res) => {
  /*res.sendFile(path.resolve(__dirname, 'views/index.ejs'));*/
  res.render('index');
});
app.get('/about', (req, res) => {
  /*res.sendFile(path.resolve(__dirname, 'views/index.ejs'));*/
  res.render('about');
});
app.get('/add', (req, res) => {
  /*res.sendFile(path.resolve(__dirname, 'views/index.ejs'));*/
  res.render('add');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running port: ${port}`);
});
