const express = require('express');
const { response } = require('express');
const path = require('path');

const app = express();

/*const myLogger = (req, res, next) => {
  console.log('middleware log 1');
  next();
};

const myLogger2 = (req, res, next) => {
  console.log('middleware log 2');
  next();
};*/

//MIDDLEWARES
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running port: ${port}`);
});
