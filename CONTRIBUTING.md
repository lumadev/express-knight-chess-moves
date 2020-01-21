
# express-knight-chess-moves
Web server made with Node.js and Express built to validate knight chess moves on algebric notation.

#Project dependencies
- *Node.js version v10.15.3*
- *npm version 6.13.6*
- *For more dependencies please check* https://nodejs.org/en/docs/meta/topics/dependencies/

# Contributing
When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change. 

#Algorithm Structure
- Basically the board was mapped in numeric format to make it easy the calculation of possible moviments.

[11, 12, 13, 14, 15, 16, 17, 18]<br/>
[21, 22, 23, 24, 25, 26, 27, 28]<br/>
[31, 32, 33, 34, 35, 36, 37, 38]<br/>
[41, 42, 43, 44, 45, 46, 47, 48]<br/>
[51, 52, 53, 54, 55, 56, 57, 58]<br/>
[61, 62, 63, 64, 65, 66, 67, 68]<br/>
[71, 72, 73, 74, 75, 76, 77, 78]<br/>
[81, 82, 83, 84, 85, 86, 87, 88]<br/>

The calculation of possible moves was done by this way:<br/>

```
  const xMinus1 = x - 1;
  const xPlus1 = x + 1;
  const xMinus2 = x - 2;
  const xPlus2 = x + 2;

  const yMinus1 = y - 1;
  const yPlus1 = y + 1;
  const yMinus2 = y - 2;
  const yPlus2 = y + 2;``
```

- As Api only accepts algebric notation, a numeric conversion is done after passing algebric coordinates.

- For second turn moves, coordinates of possible moves given on first place *(ex. [A6, D7])*
are passed again for the same function that calulates the possible moves, but at this time iterating over it.
