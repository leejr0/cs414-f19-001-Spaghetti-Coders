## Login
Upon login, the entered `nickname` and `password` are sent to the server,. If a match for both `nickname` and `password` is found in the database, the server sends **true** back to the client to indicate that the login was successful.
*In the future, the password will be hashed before it is sent to the server for security.*
```json
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
```json
{
  "nickname"           : "junglePlayer1",
  "password"           : "spaghetti",
  "verifyPassword"     : "spaghetti",
  "email"              : "email@gmail.com"
}
```

## GamePage
When a game is opened, the server sends the current gamestate in `board` as a 2d Object array. The following json is subject to change:


```json
{
  "board"              : [
                            [
                               {
                                  "name": pieceName,
                                  "player": pieceOwner,
                                  "legalMoves": [
                                      {
                                         "row": i,
                                         "col": j
                                      },
                                      {
                                         "row": i,
                                         "col": j
                                      }
                                  ],
                                  "spaceType": spaceType
                               },
                               { Object },
                               { Object },
                               "..."
                            ],
                            [
                               { Object },
                               { Object },
                               { Object },
                               "..."
                            ],
                            "..."
                         ],
  "winner"             : { Object },
  "player1"            : { Object },
  "player2"            : { Object },
  "turnAction"         : { Object },
  "whoseTurn"          : { Object },
  "selectedPiece"      : {"row": i, "col": j},
  "chosenMove"         : {"toRow": i, "toCol": j}
}
```
