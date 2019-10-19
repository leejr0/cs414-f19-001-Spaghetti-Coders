import React, {Component} from 'react';
import {Container, Table} from 'reactstrap'

class GamePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //TODO: reset initialization to all null, and set state from server-side gamestate in DB
            gameBoard: [
                [null, null, null, null, 'C', null, null],
                [null, null, null, null, null, null, null],
                [null, null, 'a', null, null, null, null],
                [null, null, null, null, 'b', null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, 'c', null, null, null],
                [null, null, null, null, null, null, null],
                ['A', null, null, null, null, null, null],
                [null, null, null, 'B', null, null, null],
            ],
            possibleMoves: [],
            selectedPiece: {
                row: null,
                col: null,
                rank: null //TODO: rank may need to be displayed for each piece
            },
            chosenMove: {
                toRow: null,
                toCol: null
            }
        };
    }

    makeMove() {
        let piece = this.state.selectedPiece;
        let move = this.state.chosenMove;
        let gb = this.state.gameBoard;
        gb[move.toRow][move.toCol] = gb[piece.row][piece.col];
        gb[piece.row][piece.col] = null;
        piece.row = null;
        piece.col = null;
        move.toRow = null;
        move.toCol = null;
        this.setState({gameBoard: gb, selectedPiece: piece, chosenMove: move});
    }

    generateMoves(i, j) {
        //TODO: Communicate with backend to retrieve set of possible moves for a given piece
        return []
    }

    validateMove(i1, j1, i2, j2) {
        //TODO: Communicate with backend to confirm move is valid (check if move present in possibleMoves previously generated by server)
        return true;
    }

    handleClick(i, j) {
        let piece = this.state.selectedPiece;
        let move = this.state.chosenMove;
        let gb = this.state.gameBoard;
        if (piece.row === null || piece.col === null) {
            //selecting piece
            piece.row = i;
            piece.col = j;
            if (gb[piece.row][piece.col] === null) {
                //selecting blank space is illegal, reset selection
                piece.row = null;
                piece.col = null;
                move.toRow = null;
                move.toCol = null;
                this.setState({selectedPiece: piece, chosenMove: move});
            }
            this.setState({possibleMoves: this.generateMoves(i, j)});
            //ensure no move is set, since new piece was selected
            move.toRow = null;
            move.toCol = null;
        } else {
            //selecting move
            move.toRow = i;
            move.toCol = j;
        }
        //execute the move if the selection/move process is complete, move is not to same square, and move is considered valid
        if (move.toRow !== null && move.toCol !== null) {
            if (piece.row === move.toRow && piece.col === move.toCol) {
                //move is to same square, so reset selections to allow player to try again with valid move
                piece.row = null;
                piece.col = null;
                move.toRow = null;
                move.toCol = null;
                this.setState({selectedPiece: piece, chosenMove: move});
            } else {
                if (this.validateMove(piece.row, piece.col, move.toRow, move.toCol)) {
                    this.setState({selectedPiece: piece, chosenMove: move},
                        this.makeMove);
                }

            }
        }
    }

    colorSquare(i, j) {
        //picks a background color for square based on type or selection
        //selection (yellow)
        if (i === this.state.selectedPiece.row && j === this.state.selectedPiece.col) {return 'ffe536'}
        //water (light blue)
        if (i===3 || i===4 || i===5) {
            if (j===1 || j===2 || j===4 || j===5) {
                return '0077be'
            }
        }
        //land (light green)
        return '7ec850'
    }

    renderSquare(i, j) {
        //renders the square at the given position, using the gameBoard 2d array
        return <div
            style={{width: '24px', height: '24px', backgroundColor: this.colorSquare(i,j)}}
            onClick={this.handleClick.bind(this, i, j)}>
            {this.state.gameBoard[i][j]}
        </div>
    }

    renderBoard() {
        //responsible for rendering all 63 squares within the board
        let board = [];
        for (let i=0; i<9; i++) {
            let row = [];
            for (let j=0; j<7; j++) {
                row.push(<td>{this.renderSquare(i, j)}</td>);
            }
            board.push(<tr style={{textAlign: 'center', verticalAlign: 'middle'}}>{row}</tr>);
        }
        return <Table borderless><tbody>{board}</tbody></Table>
    }

    render() {
        return (
            <Container>
            <h5>Position: {this.state.selectedPiece.row + ", " + this.state.selectedPiece.col}</h5>
            <div style={{display: 'inline-block', backgroundColor: '29ab87'}} id="GamePage">
                {this.renderBoard()}
            </div>
            </Container>);
    }
}

export default GamePage