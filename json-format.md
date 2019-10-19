## Login
Upon login, the entered `nickname` and `password` are sent to the server,. If a match for both `nickname` and `password` is found in the database, the server sends **true** back to the client to indicate that the login was successful.
*In the future, the password will be hashed before it is sent to the server for security.*
```javascript
{
  "nickname"           : "junglePlayer1",
  "password"           : "spaghetti"
}
```

## Register
When a user registers, their `nickname`, `password`, `verifyPassword`, and `email` are sent to the server to create an account. The following criteria must be met for an account to be created:
- `nickname` is not already taken, fits within our constraints (i.e length, characters)
- `password` == `verifyPassword`, both fit within our constraints (i.e length, characters)
- `email` is correctly formatted 
If all the above criteria are met, the server sends **true** back to the client to indicate success.
*In the future, the password and verifyPassword will be hashed before they are sent to the server for security.*
```javascript
{
  "nickname"           : "junglePlayer1",
  "password"           : "spaghetti",
  "verifyPassword"     : "spaghetti",
  "email"              : "email@gmail.com"
}
```

## GamePage
When a game is opened, the server sends the current gamestate in `gameBoard` as a 2d character array. The encodings for every piece type can be found below.

When the user selects a piece, the client sends `gameBoard`, `possibleMoves`, and `selectedPiece` to the server, which populates `possibleMoves` containing every potential move for the selected piece, and sends the json back to the client.

When the user moves a piece, the client sends `gameBoard`, `possibleMoves`, `selectedPiece`, and `chosenMove` as in the following json example. If the move is deemed valid by the server (based on jungle rules), the server returns **true** and the move is made client-side. The newly modified `gameBoard` is then sent from the client to the server and stored in the database. 
```javascript
{
  "gameBoard"          : [
                            ['L' , null, 'X' , 'O' , 'X' , null, 'T' ],
                            [null, 'D' , null, 'X' , null, 'C', null ],
                            ['M' , null, 'Q' , null, 'W' , null, 'E' ],
                            [null, null, null, null, null, null, null],
                            [null, null, null, null, null, null, null],
                            [null, null, null, null, null, null, null],
                            ['e' , null, 'w' , null, 'q' , null, 'm' ],
                            [null, 'c' , null, 'x' , null, 'd', null ],
                            ['t' , null, 'x' , 'o' , 'x' , null, 'l' ]
                         ],
  "possibleMoves"      : [{"row": 9, "col": 6}, {"row": 8, "col": 7}],
  "selectedPiece"      : {"row": 9, "col": 7, "rank": 7},
  "chosenMove"         : {"toRow": 8, "toCol": 7}
}
```

### Decoding the gameBoard
|Piece/Space|Character encoding|Piece/Space|Character encoding|
|---|---|---|---|
|Blue Mouse|'m'|Red Mouse|'M'|
|Blue Cat|'c'|Red Cat|'C'|
|Blue Wolf|'w'|Red Wolf|'W'|
|Blue Dog|'d'|Red Dog|'D'|
|Blue Leopard|'q'|Red Leopard|'Q'|
|Blue Tiger|'t'|Red Tiger|'T'|
|Blue Lion|'l'|Red Lion|'L'|
|Blue Elephant|'e'|Red Elephant|'E'|
|Blue TRAP|'x'|Red TRAP|'X'|
|Blue DEN|'o'|Red DEN|'O'|
