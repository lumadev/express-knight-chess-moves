const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(require('./routes'));

app.listen(3001, () => console.log('App listening on port 3001!'));
