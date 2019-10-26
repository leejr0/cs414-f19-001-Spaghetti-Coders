## Login
Upon login, the entered `nickname` and `password` are sent to the server. If a match for both `nickname` and `password` is found in the database, the server sends **true** back to the client to indicate that the login was successful.
*In the future, the password will be hashed before it is sent to the server for security.*
```json
"loginInfo"    : {
                    "nickname" : "junglePlayer1",
                    "password" : "spaghetti"
                 }
```
Server-side validation handled by: **RetrieveProfile.establishProfileIdentity()**

## Register
When a user registers, their `nickname`, `password`, `verifyPassword`, and `email` are sent to the server to create an account. The following criteria must be met for an account to be created:
- `nickname` is not already taken, fits within our constraints (i.e length, characters)
- `password` == `verifyPassword`, both fit within our constraints (i.e length, characters)
- `email` is correctly formatted

If all the above criteria are met, the server sends **true** back to the client to indicate success.
*In the future, the password and verifyPassword will be hashed before they are sent to the server for security.*
```json
"profileInfo"  : {
                    "nickname"       : "junglePlayer1",
                    "password"       : "spaghetti",
                    "verifyPassword" : "spaghetti",
                    "email"          : "email@gmail.com"
                 }
```
Server-side validation handled by: **RetrieveProfile() -default constructor**

## GamePage
When a game is opened, the server sends the current gamestate in `board` as a 2d Object array. The client also needs the following information from the server to display:

|State Var|Description|
|---|---|
|`winner`| Used for displaying the winner of the game once it is finished (*null* while game is in progress) |
|`player1`| Nickname of player 1 |
|`player2`| Nickname of player 2 |
|`turnAction`| Used for displaying the last *successful* **move** (i.e. highlight most recent move) |
|`whoseTurn`| Contains the nickname of the player whose turn it is |

**Server -> Client**
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
  "winner"             : null,
  "player1"            : "junglePlayer1",
  "player2"            : "junglePlayer2",
  "turnAction"         : {
                             "selectedPiece" : {
                                                   "row": i, 
                                                   "col": j
                                               },
                             "chosenMove"    : {
                                                   "toRow": i, 
                                                   "toCol": j
                                               }           
                         },
  "whoseTurn"          : { "junglePlayer2" }
```
Once a move is made client-side, the following move JSON is sent to the server. All move validation happens on the server, so the server will send the old gamestate if the move failed, or the updated gamestate if the move was successful.

**Client -> Server**

```json
"move"                 : {
                            "selectedPiece" : {
                                                  "row": i, 
                                                  "col": j
                                              },
                            "chosenMove"    : {
                                                  "toRow": i, 
                                                  "toCol": j
                                              }
                         }
```
