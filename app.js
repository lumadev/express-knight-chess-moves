const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/', (req, res) => {
  res.send('Got a POST request');
})

app.listen(3001, () => console.log('App listening on port 3001!'));
