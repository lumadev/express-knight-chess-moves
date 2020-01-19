const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

/** to be used to conversion to number coordinates */
const algebricCoordinates = [];

/** to be used to conversion to algebric coordinates */
const numberCoordinates = [];

initAlgebricCoordinates();
getPossibleMoves('A', '8');

function initAlgebricCoordinates() {
  const lettersAlgebric = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const numbersAlgebric = ['8', '7', '6', '5', '4', '3', '2', '1'];
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8'];

  for (let i = 0; i < lettersAlgebric.length; i++) {
    const letter = lettersAlgebric[i];
    const numberY = numbers[i];

    for (let i = 0; i < 8; i++) {
      const numberAlgebric = numbersAlgebric[i];
      const numberX = numbers[i];

      const cellAlgebric = `${letter}${numberAlgebric}`;
      const cellNumber = `${numberX}${numberY}`;

      algebricCoordinates[cellAlgebric] = cellNumber;
      numberCoordinates[cellNumber] = cellAlgebric;
    }
  }
}

function getKnightCombinations(x, y) {
  const xMinus1 = x - 1;
  const xPlus1 = x + 1;
  const xMinus2 = x - 2;
  const xPlus2 = x + 2;

  const yMinus1 = y - 1;
  const yPlus1 = y + 1;
  const yMinus2 = y - 2;
  const yPlus2 = y + 2;

  return [
    {
      'xCombination': xMinus1,
      'yCombination': yMinus2,
      'identifier': 'combination_1'
    },
    {
      'xCombination': xPlus1,
      'yCombination': yPlus2,
      'identifier': 'combination_2'
    },
    {
      'xCombination': xPlus1,
      'yCombination': yMinus2,
      'identifier': 'combination_3'
    },
    {
      'xCombination': xMinus1,
      'yCombination': yPlus2,
      'identifier': 'combination_4'
    },
    {
      'xCombination': xMinus2,
      'yCombination': yMinus1,
      'identifier': 'combination_5'
    },
    {
      'xCombination': xPlus2,
      'yCombination': yPlus1,
      'identifier': 'combination_6'
    },
    {
      'xCombination': xPlus2,
      'yCombination': yMinus1,
      'identifier': 'combination_7'
    },
    {
      'xCombination': xMinus2,
      'yCombination': yPlus1,
      'identifier': 'combination_8'
    },
  ];
}

function checkPossibleMoves(x, y) {
  const knightCombinations = getKnightCombinations(x, y);
  const possibleCombinations = [];

  knightCombinations.forEach((combination) => {
    const x = combination['xCombination'];
    const y = combination['yCombination'];
    const identifier = combination['identifier'];

    const isPossible = isPossibleMove(x, y);

    const possibleCombination = {x, y, identifier, isPossible};
    possibleCombinations.push(possibleCombination);
  });
  return possibleCombinations;
}

function isPossibleMove(x, y) {
  const possible = (x > 0 && x < 9 && y > 0 && y < 9);
  return possible;
}

function getPossibleMoves(xAlgebric, yAlgebric) {
  const coordinates = covertCoordinates(xAlgebric, yAlgebric);
  const x = parseInt(coordinates.substr(0, 1));
  const y = parseInt(coordinates.substr(1, 2));

  const allMoves = checkPossibleMoves(x, y);
  const allowedMoves = allMoves.filter((res) => res.isPossible === true);
  // const allowedMovesSecondTurn = checkPossiblemovesSecondTurn(allowedMoves)
}

// function checkPossiblemovesSecondTurn(allowedMoves) {
//   const possibleCombinations = [];
//
//   allowedMoves.forEach((moveInfo) => {
//     const x = moveInfo.x;
//     const y = moveInfo.y;
//
//     const possibleCombination = checkPossibleMoves(x, y, true);
    // possibleCombinations.push(possibleCombination);

  //   console.log(possibleCombination);
  // });
  // return possibleCombinations;
// }

function covertCoordinates(xAlgebric, yAlgebric) {
  const coordinateUser = `${xAlgebric}${yAlgebric}`;
  return algebricCoordinates[coordinateUser];
}

app.post('/possible-moves', (req, res) => {
  const cellName = req.body.cellName;

  if (cellName === undefined) {
    res.status(500).json({ error: 'Please pass the cell name on the request' })
  }

  const regexLetters = "[ABCDEFGH]+";
  const regexNumbers = "[12345678]+";

  if (regexLetters === null || regexNumbers === null) {
    res.status(500).json({ error: 'Please use algebric notation!' })
  }

  const xAlgebric = cellName.substr(0, 1);
  const yAlgebric = cellName.substr(1, 2);

  // getPossibleMoves(xAlgebric, yAlgebric);

  // res.send('go to sleep a little bit');
})

app.post('/move', (req, res) => {
  // TODO implementar para salvar na database
})

app.listen(3001, () => console.log('App listening on port 3001!'));
