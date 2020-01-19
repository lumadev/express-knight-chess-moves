const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/possible-moves', () => {

});

app.post('/move', (req, res) => {

  const cellName = req.body.cellName;

  if (cellName === undefined) {
    res.status(500).json({ error: 'Please pass the cell name on the request' })
  }

  const x = cellName.substr(0, 1);
  const y = cellName.substr(1, 2);

  const regexLetters = "[ABCDEFGH]+";
  const regexNumbers = "[12345678]+";

  if (regexLetters === null || regexNumbers === null) {
    res.status(500).json({ error: 'Please use algebric notation!' })
  }
})

app.listen(3001, () => console.log('App listening on port 3001!'));
