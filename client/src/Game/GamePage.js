import React, {Component} from 'react';
import {Container, Table} from 'reactstrap'

class GamePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //TODO: upon opening game, set state from server-side gamestate in DB
            //empty until board is retrieved from server
            board: this.getState(),
            //TODO: get values from server for winner, player1, player2, turnAction, whoseTurn and display relevant info
            winner: null,
            player1: null,
            player2: null,
            turnAction: null,
            whoseTurn: null,
            selectedPiece: {
                row: null,
                col: null,
            },
            chosenMove: {
                toRow: null,
                toCol: null
            }
        };
    }

    getState() {
        //TODO: Communicate with backend to retrieve board from server (remove the below code)
        //temporary client side null-initialization for testing
        let retrievedBoard = [[],[],[],[],[],[],[],[],[]];
        for (let i=0; i<9; i++) {
            for (let j=0; j<7; j++) {
                retrievedBoard[i][j] = null;
            }
        }
        return retrievedBoard;
    }

    makeMove() {
        let piece = this.state.selectedPiece;
        let move = this.state.chosenMove;

        //send move to server and retrieve new board
        //TODO: Communicate with backend to attempt the move and retrieve new board, server will determine if player gets to redo their move (invalid move), or if the turn is over
        let updatedBoard = this.state.board; //TODO: change to whatever server returns
        console.log("Attempting to make move: " + piece.row + ',' + piece.col + '->' + move.toRow + ',' + move.toCol);


        //reset selections after move attempt
        piece.row = null;
        piece.col = null;
        move.toRow = null;
        move.toCol = null;
        this.setState({board: updatedBoard, selectedPiece: piece, chosenMove: move});
    }

    saveGame() {
        //TODO: save the game when the user leaves the session
    }

    handleClick(i, j) {
        let piece = this.state.selectedPiece;
        let move = this.state.chosenMove;
        //start new selection process if no piece is selected
        if (piece.row === null || piece.col === null) {
            //select piece
            piece.row = i;
            piece.col = j;
            //ensure no move is set, since new piece was selected
            move.toRow = null;
            move.toCol = null;
            //update selected piece
            this.setState({selectedPiece: piece, chosenMove: move});
        } else {
            //select move
            move.toRow = i;
            move.toCol = j;
        }
        //execute the move if the selection/move process is complete
        if (move.toRow !== null && move.toCol !== null) {
            //try to make the move
            this.setState({selectedPiece: piece, chosenMove: move}, this.makeMove);
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
        //land (light green)
        return '7ec850'
    }

    renderSquare(i, j) {
        let square = this.state.board[i][j];
        //renders the square at the given position, using the board 2d array
        return <div style={{
                    height: '40px',
                    width: '40px'}}
                    onClick={this.handleClick.bind(this, i, j)}>
                    {(square != null) ? square.name[0].toUpperCase() : null}
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

    render() {
        return (
            <Container>
            <div style={{display: 'inline-block'}} id="GamePage">
                {this.renderBoard()}
            </div>
            </Container>);
    }
}

export default GamePage