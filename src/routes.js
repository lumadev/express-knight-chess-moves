
var express = require('express');
var router = express.Router();

/** to be used to conversion to number coordinates */
const algebricCoordinates = [];

/** to be used to conversion to algebric coordinates */
const numberCoordinates = [];

initAlgebricCoordinates();

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
  const coordinates = covertToNumberCoordinate(xAlgebric, yAlgebric);

  if (coordinates === undefined) {
    throw new Error('Wrong coordinates');
  }

  const x = parseInt(coordinates.substr(0, 1));
  const y = parseInt(coordinates.substr(1, 2));

  const allMoves = checkPossibleMoves(x, y);
  const allowedMoves = allMoves.filter((res) => res.isPossible === true);

  return convertMovesToAlgebric(allowedMoves);
}

function getPossibleMovesSecondTurn(allowedCoordinates) {
  const movesList = [];

  allowedCoordinates = convertCoordinatesToNumber(allowedCoordinates);

  allowedCoordinates.forEach((coordinate) => {
    const x = parseInt(coordinate.substr(0, 1));
    const y = parseInt(coordinate.substr(1, 2));

    const allMoves = checkPossibleMoves(x, y);

    allMoves.forEach((move) => {
      movesList.push(move);
    })
  });

  const allowedMoves = movesList.filter((res) => res.isPossible === true);
  const algebricElements = convertMovesToAlgebric(allowedMoves);

  /** remove duplicated elements */
  return [...new Set(algebricElements)];
}

function convertCoordinatesToNumber(coordinates) {
  const numbersCoordinates = [];

  coordinates.forEach((coordinate) => {
    const converted = algebricCoordinates[coordinate];
    numbersCoordinates.push(converted);
  });
  return numbersCoordinates;
}

function convertMovesToAlgebric(moves) {
  const algebricCoordinates = [];

  moves.forEach((move) => {
    const x = move.x;
    const y = move.y;

    const algebricCoordinate = covertToAlgebricCoordinate(x, y);

    algebricCoordinates.push(algebricCoordinate);
  });

  return algebricCoordinates;
}

function covertToNumberCoordinate(xAlgebric, yAlgebric) {
  const coordinate = `${xAlgebric}${yAlgebric}`;
  return algebricCoordinates[coordinate];
}

function covertToAlgebricCoordinate(xNumber, yNumber) {
  const coordinate = `${xNumber}${yNumber}`;
  return numberCoordinates[coordinate];
}

router.post('/move/possible-moves', (req, res) => {
  const coordinate = req.body.coordinate;

  if (coordinate === undefined) {
    res.status(500).json({ error: 'Please pass the cell name on the request' })
  }

  const regexLetters = "[ABCDEFGH]+";
  const regexNumbers = "[12345678]+";

  if (regexLetters === null || regexNumbers === null) {
    res.status(500).json({ error: 'Please use algebric notation!' })
  }

  const xAlgebric = coordinate.substr(0, 1);
  const yAlgebric = coordinate.substr(1, 2);

  const moves = getPossibleMoves(xAlgebric, yAlgebric);

  res.send({ moves });
});

router.post('/move/second-turn-moves', (req, res) => {
  const moves = req.body.moves;

  if (moves === undefined) {
    res.status(500).json({ error: 'Please pass the moves on the request' })
  }
  const secondTurnMoves = getPossibleMovesSecondTurn(moves);

  res.send({ moves: secondTurnMoves });
});

router.post('/move', (req, res) => {
  // TODO implement to save on database
});

module.exports = router;
