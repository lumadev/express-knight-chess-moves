const test = require('tape')
const routes = require('./src/routes');

test('possible knight moves', (t) => {
  t.assert(
    routes.getPossibleMoves('A', '8').includes('C7'), "C7 move correct");
  t.assert(
    routes.getPossibleMoves('A', '8').includes('B6'), "B6 move correct");
  t.end();
});

test('possible knight second turn moves', (t) => {
  t.assert(
    routes.getPossibleMovesSecondTurn(['A8', 'B6']).includes('D7'), "D7 move correct");
  t.assert(
    routes.getPossibleMovesSecondTurn(['A8', 'B6']).includes('A4'), "B6 move correct");
  t.assert(
    routes.getPossibleMovesSecondTurn(['A8', 'B6']).includes('D5'), "B6 move correct");
  t.end();
});

test('convert numeric coordinate to algebric', (t) => {
  t.assert(routes.covertToAlgebricCoordinate('2', '1') === 'A7', "Coordinate converted to algebric");
  t.end();
});

test('convert algebric coordinate to number', (t) => {
  t.assert(routes.covertToNumberCoordinate('B', '8') === '12', "Coordinate converted to numeric");
  t.end();
});

