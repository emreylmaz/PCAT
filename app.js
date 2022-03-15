const express = require('express');
const { response } = require('express');

const app = express();

app.get('/', (req, res) => {
  const photo = {
    id: 1,
    name: 'Photo name',
    description: 'test',
  };

  res.send(photo);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running port: ${port}`);
});
