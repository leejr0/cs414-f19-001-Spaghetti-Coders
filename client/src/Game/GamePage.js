import React, {Component} from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {request} from "../api/api";
import Rules from "./Rules";

class Piece {
    constructor(color, rank, isTrapped, row, column, legalMoves, redTraps, blueTraps, waterTiles) {
        this.pieceColor = color;
        switch(rank) {
            case 1:
                this.name = 'rat';
                break;
            case 2:
                this.name = 'cat';
                break;
            case 3:
                this.name = 'wolf';
                break;
            case 4:
                this.name = 'dog';
                break;
            case 5:
                this.name = 'panther';
                break;
            case 6:
                this.name = 'tiger';
                break;
            case 7:
                this.name = 'lion';
                break;
            case 8:
                this.name = 'elephant';
                break;
        }
        this.isTrapped = isTrapped;
        this.rank = rank;
        this.row = row;
        this.column = column;
        this.legalMoves = legalMoves;
        this.redTraps = redTraps;
        this.blueTraps = blueTraps;
        this.waterTiles = waterTiles;
    }
}

class JungleBoard {
    constructor(board) {
        this.board = board;
    }
}

class GamePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //TODO: upon opening game, set state from server-side gamestate in DB
            //empty until board is retrieved from server
            jungleBoard: null,
            board: null,
            //TODO: get values from server for winner, playerBlue, playerRed, turnAction, whoseTurn and display relevant info
            winner: null,
            playerBlue: null,
            playerRed: null,
            turnAction: null,
            whoseTurn: null,
            isActive: true,
            announceWinner: false,
            newGame: true,
            selectedPiece: {
                row: null,
                col: null,
            },
            chosenMove: {
                toRow: null,
                toCol: null
            },
            move: {
                row : null,
                col : null,
                toRow : null,
                toCol : null
            }
        };

        this.newBoard = this.newBoard.bind(this);
    }

    setPieces(retrievedBoard) {
        retrievedBoard[0][0] = new Piece("red", "lion");
        retrievedBoard[0][6] = new Piece("red", "tiger");
        retrievedBoard[1][1] = new Piece("red", "dog");
        retrievedBoard[1][5] = new Piece("red", "cat");
        retrievedBoard[2][0] = new Piece("red", "rat");
        retrievedBoard[2][2] = new Piece("red", "panther");
        retrievedBoard[2][4] = new Piece("red", "wolf");
        retrievedBoard[2][6] = new Piece("red", "elephant");

        retrievedBoard[8][0] = new Piece("blue", "tiger");
        retrievedBoard[8][6] = new Piece("blue", "lion");
        retrievedBoard[7][1] = new Piece("blue", "cat");
        retrievedBoard[7][5] = new Piece("blue", "dog");
        retrievedBoard[6][0] = new Piece("blue", "elephant");
        retrievedBoard[6][2] = new Piece("blue", "wolf");
        retrievedBoard[6][4] = new Piece("blue", "panther");
        retrievedBoard[6][6] = new Piece("blue", "rat");
        return retrievedBoard;
    }

    makeMove() {
        let piece = this.state.selectedPiece;
        let move = this.state.chosenMove;

        //send move to server and retrieve new board
        let updatedBoard = this.state.board;
        console.log("Attempting to make move: " + piece.row + ',' + piece.col + '->' + move.toRow + ',' + move.toCol);

        request(this.state,"updateMatch").then(gameState => {
            let newBoard = this.resetPieces(gameState.jungleBoard.board);
            this.setState({
                jungleBoard: gameState.jungleBoard,
                board: newBoard,
                winner: gameState.winner,
                playerBlue: gameState.playerBlue,
                playerRed: gameState.playerRed,
                whoseTurn: gameState.whoseTurn,
                isActive: gameState.isActive,
                announceWinner: (gameState.winner !== undefined) //evaluates to true if there is a winner}
            });
        });

        //reset selections after move attempt
        piece.row = null;
        piece.col = null;
        move.toRow = null;
        move.toCol = null;
        this.setState({board: updatedBoard, selectedPiece: piece, chosenMove: move});
    }

    resetPieces(board) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if(board[i][j] !== null) {
                    let color = board[i][j].pieceColor;
                    let rank = board[i][j].rank;
                    let isTrapped = board[i][j].isTrapped;
                    let row = board[i][j].row;
                    let column = board[i][j].column;
                    let redTraps = board[i][j].redTraps;
                    let blueTraps = board[i][j].blueTraps;
                    let waterTiles = board[i][j].waterTiles;
                    board[i][j] = new Piece(color, rank, isTrapped, row, column, redTraps, blueTraps, waterTiles);
                }
            }
        }
        return board;
    }

    saveGame() {
        //TODO: save the game when the user leaves the session
    }

    playerOwnsPiece(pieceIndices) {
        let piece = this.state.board[pieceIndices.row][pieceIndices.col];
        if (piece !== null) {
            if (this.state.whoseTurn === this.state.playerBlue) {
                if (piece.pieceColor === "BLUE") {
                    return true;
                } else {
                    console.log("Player 1 selected the other player's piece");
                    return false;
                }
            } else if (this.state.whoseTurn === this.state.playerRed) {
                if (piece.pieceColor === "RED") {
                    return true;
                } else {
                    console.log("Player 2 selected the other player's piece");
                    return false;
                }
            } else {
                console.log("Invalid value for 'whoseTurn'");
                return false;
            }
        } else {
            console.log("Player selected nothing");
            return false;
        }
    }

    handleClick(i, j) {
        let piece = this.state.selectedPiece;
        let move = this.state.chosenMove;
        let updateMove = this.state.move;
        //start new selection process if no piece is selected
        if (piece.row === null || piece.col === null) {
            //select piece
            piece.row = i;
            piece.col = j;
            //ensure no move is set, since new piece was selected
            move.toRow = null;
            move.toCol = null;
            if (!this.playerOwnsPiece(piece)) {
                //player is moving the wrong piece or no piece
                piece.row = null;
                piece.col = null;
            }
            //update selected piece
            this.setState({selectedPiece: piece, chosenMove: move});
        } else {
            //select move
            move.toRow = i;
            move.toCol = j;
            if (move.toRow === piece.row && move.toCol === piece.col) {
                //user wants to cancel move
                piece.row = null;
                piece.col = null;
                move.toRow = null;
                move.toCol = null;
                this.setState({selectedPiece: piece, chosenMove: move});
            }
        }
        //execute the move if the selection/move process is complete
        if (move.toRow !== null && move.toCol !== null) {
            //try to make the move
            updateMove.row = this.state.selectedPiece.row;
            updateMove.col = this.state.selectedPiece.col;
            updateMove.toRow = this.state.chosenMove.toRow;
            updateMove.toCol = this.state.chosenMove.toCol;
            this.setState({selectedPiece: piece, chosenMove: move,
                move: updateMove}, this.makeMove);
        }
    }

    colorSquare(i, j) {
        //pick a background color for square based on type, selection, or hover (priority: selection, hover, type)
        //independent of server, since the coloring is always the same except for the (client-side) piece selection
        if (i === this.state.selectedPiece.row && j === this.state.selectedPiece.col) { //selection (yellow)
            return 'ecc530'
        }
        //water (light blue)
        if (i===3 || i===4 || i===5) {
            if (j===1 || j===2 || j===4 || j===5) {
                return '12a4b6'
            }
        }

        if (i===0 || i===8){
            if(j===2  || j===4) {
                return '47100D';
            }
        }

        if (i===1 || i===7) {
            if(j===3) {
                return '47100D';
            }
        }

        if(i===0 || i===8) {
            if(j===3) {
                return '000000'
            }
        }
        //land (light green)
        return '7ec850'
    }

    renderSquare(i, j) {
        let square = this.state.board[i][j];
        //renders the square at the given position, using the board 2d array
        return <div style={{height: '40px', width: '40px'}}
            onClick={this.handleClick.bind(this, i, j)}>
            {(square != null) ? <div>
                <h4 style={{color: square.pieceColor}}>{square.name[0].toUpperCase()}</h4>
                <p style={{color: 'black'}}>{square.rank}</p>
            </div> : null}
        </div>
    }

    renderBoard() {
        //responsible for rendering all 63 squares within the board
        let board = [];
        for (let i=0; i<9; i++) {
            let row = [];
            for (let j=0; j<7; j++) {
                row.push(<td style={{
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    height: 'inherit',
                    border: '1px solid #1e4d2b',
                    width: '50px',
                    backgroundColor: this.colorSquare(i,j)}}>
                    {this.renderSquare(i, j)}</td>);
            }
            board.push(<tr style={{height: '50px'}}>{row}</tr>);
        }
        return <Table borderless style={{width: '280px', height: '360px', backgroundColor: '1e4d2b'}}><tbody>{board}</tbody></Table>
    }

    newBoard() {
        let state = this.state;
        state.board = this.props.board;
        state.newGame = false;
        state.whoseTurn = this.props.startGame.playerBlue;
        state.playerBlue = this.props.startGame.playerBlue;
        state.playerRed = this.props.startGame.playerRed;

        for (let i = 0; i < state.board.length; i++) {
            for (let j = 0; j < state.board[i].length; j++) {
                if(state.board[i][j] !== null) {
                    let color = state.board[i][j].pieceColor;
                    let rank = state.board[i][j].rank;
                    let isTrapped = state.board[i][j].isTrapped;
                    let row = state.board[i][j].row;
                    let column = state.board[i][j].column;
                    let legalMoves = state.board[i][j].legalMoves;
                    let redTraps = state.board[i][j].redTraps;
                    let blueTraps = state.board[i][j].blueTraps;
                    let waterTiles = state.board[i][j].waterTiles;
                    state.board[i][j] = new Piece(color, rank, isTrapped, row, column, legalMoves, redTraps, blueTraps, waterTiles);
                }
            }
        }
        state.jungleBoard = new JungleBoard(state.board);

        this.setState({state});
    }

    dismissWinMessage() {
        let state = this.state;
        state.announceWinner = false;
        this.setState({state});
    }

    winMessage() {
        return <Modal isOpen={this.state.announceWinner}>
            <ModalHeader>{this.state.winner} wins!</ModalHeader>
            <ModalBody>But winning isn't everything. It's just the only thing that matters.</ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={this.dismissWinMessage.bind(this)}>Exit</Button>
            </ModalFooter>
        </Modal>
    }

    turnMonitor() {
        let row = this.state.selectedPiece.row;
        let col = this.state.selectedPiece.col;

        //determine name of selected piece, if any
        let pieceName = "nothing";
        if (row !== null || col !== null) {
            if (this.state.board[row][col] !== null) {
                pieceName = this.state.board[row][col].name;
            }
        }
        //change status if piece is selected
        let status = (row === null && col === null) ?
            "'s turn." :
            " selected their " + pieceName + "...";

        //change color and position by player
        return (<div style={{backgroundColor: 'ecc530', border: '1px solid #1e4d2b'}} id="TurnMonitor">
            <h4 style={(this.state.whoseTurn === this.state.playerBlue ?
                {color: 'blue', textAlign: 'left'} :
                {color: 'red', textAlign: 'right'})}>
                {this.state.whoseTurn}{status}
            </h4></div>);
    }

    render() {
        if(this.props.newGame && this.state.newGame === true) {
            this.newBoard()
        }
        return (
            <Container style={{display: 'inline-block'}}>
                <div style={{display: 'inline-block'}} id="GamePage">
                    {this.winMessage()}
                    {this.turnMonitor()}
                    {this.renderBoard()}
                </div>
                <Rules/>
            </Container>);
    }
}

export default GamePage;