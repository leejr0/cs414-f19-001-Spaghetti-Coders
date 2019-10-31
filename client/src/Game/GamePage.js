import React, {Component} from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {request} from "../api/api";
import Rules from "./Rules";


class Piece {
    constructor(color, rank, isTrapped, row, column) {
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
    }
}
class GamePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //TODO: upon opening game, set state from server-side gamestate in DB
            //empty until board is retrieved from server
            board: null,//this.getState(),
            //TODO: get values from server for winner, player1, player2, turnAction, whoseTurn and display relevant info
            winner: null,
            player1: null,
            player2: null,
            turnAction: null,
            whoseTurn: null,
            isActive: true,
            announceWinner: true,
            newGame: true,
            selectedPiece: {
                row: null,
                col: null,
            },
            chosenMove: {
                toRow: null,
                toCol: null
            }
        };

        this.newBoard = this.newBoard.bind(this);
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
        return this.setPieces(retrievedBoard);
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
        //TODO: Communicate with backend to attempt the move and retrieve new board, server will determine if player gets to redo their move (invalid move), or if the turn is over
        let updatedBoard = this.state.board; //TODO: change to whatever server returns
        console.log("Attempting to make move: " + piece.row + ',' + piece.col + '->' + move.toRow + ',' + move.toCol);
        request(this.state,"move").then(gameState => {
            this.setState({
                board: gameState.board,
                winner: gameState.winner,
                player1: gameState.player1,
                player2: gameState.player2,
                turnAction: gameState.turnAction,
                whoseTurn: gameState.whoseTurn,
                isActive: gameState.isActive});
        });

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
        return <div style={{
            height: '40px',
            width: '40px'}}
            onClick={this.handleClick.bind(this, i, j)}>
            {(square != null) ? <h4 style={{color: square.pieceColor}}>{square.name[0].toUpperCase()}</h4> : null}
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
        for (let i = 0; i < state.board.length; i++) {
            for (let j = 0; j < state.board[i].length; j++) {
                if(state.board[i][j] !== null) {
                    let color = state.board[i][j].pieceColor;
                    let rank = state.board[i][j].rank;
                    let isTrapped = state.board[i][j].isTrapped;
                    let row = state.board[i][j].row;
                    let column = state.board[i][j].column;
                    state.board[i][j] = new Piece(color, rank, isTrapped, row, column);
                }
            }
        }
        this.setState({state});
    }

    toggle() {
        let state = this.state;
        state.announceWinner = false;
        this.setState({state});
    }

    render() {
        if(this.props.newGame && this.state.newGame === true) {
            this.newBoard()
        }
        return (
            <Container style={{display: 'inline-block'}}><div style={{display: 'inline-block'}} id="GamePage">
                <Modal isOpen={this.state.announceWinner}>
                    <ModalHeader>You are the Winner!</ModalHeader>
                    <ModalBody>Winning isn't everything. It's just the only thing that matters.</ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle.bind(this)}>Exit</Button>
                    </ModalFooter>
                </Modal>
                {this.renderBoard()}
            </div><Rules/>
            </Container>);
    }
}

export default GamePage;