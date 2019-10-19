import React, {Component} from 'react';
import {Container, Table} from 'reactstrap'

class GamePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gameBoard: [
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, 'P', null, null, null],
                [null, null, null, null, null, null, null],
            ],
            possibleMoves: [],
            selectedPiece: {
                row: null,
                col: null,
                rank: null
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
        if (piece.row === null || piece.col === null) {
            //selecting piece
            console.log("piece selected");
            piece.row = i;
            piece.col = j;
            this.setState({possibleMoves: this.generateMoves(i, j)});
            //ensure no move is set, since new piece was selected
            move.toRow = null;
            move.toCol = null;
        } else {
            //selecting move
            console.log("move selected");
            move.toRow = i;
            move.toCol = j;
        }
        //execute the move if the selection/move process is complete, move is not to same square, and move is considered valid
        if (move.toRow !== null && move.toCol !== null) {
            if (piece.row === move.toRow && piece.col === move.toCol) {
                //move is to same square, so reset selections to allow player to try again with valid move
                console.log("same square");
                piece.row = null;
                piece.col = null;
                move.toRow = null;
                move.toCol = null;
                this.setState({selectedPiece: piece, chosenMove: move});
            } else {
                console.log("good move, about to be validated");
                if (this.validateMove(piece.row, piece.col, move.toRow, move.toCol)) {
                    this.setState({selectedPiece: piece, chosenMove: move},
                        this.makeMove);
                }

            }
        }
    }

    colorSquare(i, j) {
        //selection
        if (i === this.state.selectedPiece.row && j === this.state.selectedPiece.col) {return 'ffe536'}
        //water
        if (i===3 || i===4 || i===5) {
            if (j===1 || j===2 || j===4 || j===5) {
                return '0077be'
            }
        }
        //land
        return '7ec850'
    }

    renderSquare(i, j) {

        return <div style={{width: '24px', height: '24px', backgroundColor: this.colorSquare(i,j)}} onClick={this.handleClick.bind(this, i, j)} >
            <h2>{this.state.gameBoard[i][j]}</h2>
        </div>
    }

    renderBoard() {
        let board = [];
        for (let i=0; i<9; i++) {
            let row = [];
            for (let j=0; j<7; j++) {
                row.push(<td>{this.renderSquare(i, j)}</td>);
            }
            board.push(<tr>{row}</tr>);
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