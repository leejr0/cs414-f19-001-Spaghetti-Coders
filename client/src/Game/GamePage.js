import React, {Component} from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {request} from "../api/api";
import PieceGuide from "./PieceGuide";

import bRat from "./assets/40BR.png";
import bRatWater from "./assets/40BRWater.png";
import wRat from "./assets/40WR.png";
import wRatWater from "./assets/40WRWater.png";
import bCat from "./assets/40BC.png";
import wCat from "./assets/40WC.png";
import bWolf from "./assets/40BW.png";
import wWolf from "./assets/40WW.png";
import bDog from "./assets/40BD.png";
import wDog from "./assets/40WD.png";
import bPanther from "./assets/40BP.png";
import wPanther from "./assets/40WP.png";
import bTiger from "./assets/40BT.png";
import wTiger from "./assets/40WT.png";
import bLion from "./assets/40BL.png";
import wLion from "./assets/40WL.png";
import bElephant from "./assets/40BE.png";
import wElephant from "./assets/40WE.png";
import bDen from "./assets/40BDen.png";
import wDen from "./assets/40WDen.png";
import water from "./assets/40Water.png";
import trap from "./assets/40Trap.png";


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
            nickname: this.props.nickname,
            gameID: this.props.startGame.gameID,
            status: this.props.startGame.status,
            //TODO: get values from server for winner, playerBlue, playerRed, turnAction, playerTurn and display relevant info
            winner: null,
            playerBlue: null,
            playerRed: null,
            turnAction: null,
            playerTurn: null,
            isActive: true,
            announceWinner: false,
            winMessage: "But winning isn't everything. It's just the only thing that matters.",
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
        this.stopPolling = this.stopPolling.bind(this);
        this.checkWinner = this.checkWinner.bind(this);
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
                playerTurn: gameState.playerTurn,
                isActive: gameState.isActive,
                announceWinner: (gameState.winner !== undefined) //evaluates to true if there is a winner}
            }, () => this.checkWinner(gameState.winner, this.state.winMessage));
        });

        //reset selections after move attempt
        piece.row = null;
        piece.col = null;
        move.toRow = null;
        move.toCol = null;
        this.setState({board: updatedBoard, selectedPiece: piece, chosenMove: move}, () => this.stopPolling);
    }

    checkWinner(winner, winMessage) {
        console.log("Winner(for testing): " + this.state.winner);
        if(winner !== undefined && winner !== null && winner !== "") {
            this.props.showWinner(winner, winMessage);
        }
    }

    stopPolling() {
        if(this.state.winner !== undefined) {
            clearInterval(this.interval);
        }
    }

    forfeitMatch(forfeiter) {
        console.log("winner: " + this.state.winner);
        request(this.state, "forfeitMatch").then(gameState => {
            this.setState({winner: gameState.winner, announceWinner: (gameState.winner !== undefined), winMessage: forfeiter + " didn't want to play anymore..."}, () => this.props.showWinner(gameState.winner, this.state.winMessage));
        });
    }

    setWinnerAndForfeit() {
        let forfeiter = this.state.nickname;

        if (forfeiter === this.state.playerBlue) {
            this.setState({winner: this.state.playerRed}, () => this.forfeitMatch(forfeiter));
        } else if (forfeiter === this.state.playerRed) {
            this.setState({winner: this.state.playerBlue}, () => this.forfeitMatch(forfeiter));
        } else {
            console.log("Invalid Forfeit");
        }
        console.log(forfeiter + " has forfeited the match.");
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
                    let legalMoves = board[i][j].legalMoves;
                    board[i][j] = new Piece(color, rank, isTrapped, row, column, legalMoves, redTraps, blueTraps, waterTiles);
                }
            }
        }
        return board;
    }

    playerOwnsPiece(pieceIndices) {
        if(this.state.status === "Finished") {
            return false;
        }

        let piece = this.state.board[pieceIndices.row][pieceIndices.col];
        if(this.state.playerTurn === this.state.nickname) {
            if (piece !== null) {
                if (this.state.playerBlue === this.state.nickname) {
                    if (piece.pieceColor === "BLUE") {
                        return true;
                    } else {
                        console.log("Player selected the other player's piece");
                        return false;
                    }
                } else if (this.state.nickname === this.state.playerRed) {
                    if (piece.pieceColor === "RED") {
                        return true;
                    } else {
                        console.log("Player selected the other player's piece");
                        return false;
                    }
                } else {
                    console.log("Invalid value for 'playerTurn'");
                    return false;
                }
            } else {
                console.log("Player selected nothing");
                return false;
            }
        }
        else{
            console.log("Not player's turn.");
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
        const lightLand = ['00', '20', '40', '60', '80', '11', '71', '22', '62', '33', '53', '24', '64', '15', '75', '06', '26', '46', '66', '86'];
        const darkLand = ['10', '30', '50', '70', '01', '21', '61', '81', '12', '72', '23', '43', '63', '14', '74', '05', '25', '65', '85', '16', '36', '56', '76'];
        const lightWater = ['31', '51', '42', '44', '35', '55'];
        const darkWater = ['41', '32', '52', '34', '54', '45'];
        const dens = ['03', '83'];
        
        //selection
        if (i === this.state.selectedPiece.row && j === this.state.selectedPiece.col) { //selection (yellow)
            return 'ecc530';
        }

        let ij = ''+ i + j;

        //legal moves
        if (this.state.selectedPiece.row !== null && this.state.selectedPiece.col !== null) {
            let piece = this.state.board[this.state.selectedPiece.row][this.state.selectedPiece.col];
            if (piece.legalMoves.includes(ij)) {
                return 'eff556';
            }
        }
        
        //land
        if (lightLand.includes(ij)) {
            return 'f2ca8a';
        }
        if (darkLand.includes(ij)) {
            return 'd19764';
        }
        
        //water
        if (lightWater.includes(ij)) {
            return '96bbbb';
        }
        if (darkWater.includes(ij)) {
            return '618985';
        }

        //dens
        if (dens.includes(ij)) {
            return '666666';
        }

        //traps
        return 'bbbbbb';
    }

    getIcon(color, name, i, j) {
        if (color === 'blue') {
            if (name === 'rat') {
                if (i === 3 ||i === 4 ||i === 5) {
                    if (j === 1 || j === 2 || j === 4 || j === 5) {
                        return wRatWater;
                    }
                }
                return wRat;
            }
            if (name === 'cat') {return wCat;}
            if (name === 'wolf') {return wWolf;}
            if (name === 'dog') {return wDog;}
            if (name === 'panther') {return wPanther;}
            if (name === 'tiger') {return wTiger;}
            if (name === 'lion') {return wLion;}
            if (name === 'elephant') {return wElephant;}
        }
        if (color === 'red') {
            if (name === 'rat') {
                if (i === 3 ||i === 4 ||i === 5) {
                    if (j === 1 || j === 2 || j === 4 || j === 5) {
                        return bRatWater;
                    }
                }
                return bRat;
            }
            if (name === 'cat') {return bCat;}
            if (name === 'wolf') {return bWolf;}
            if (name === 'dog') {return bDog;}
            if (name === 'panther') {return bPanther;}
            if (name === 'tiger') {return bTiger;}
            if (name === 'lion') {return bLion;}
            if (name === 'elephant') {return bElephant;}
        }

        //renders alt text with 'broken' image if icon cannot be found
        return null;
    }

    getBorder(i, j) {
        let border = '1px solid #1e4d2b';
        if (i === 0) {
            if (j === 2 || j === 4) {
                border = '3px solid #8e2914';
            }
        }
        if (i === 1) {
            if (j === 3) {
                border = '3px solid #8e2914';
            }
        }
        if (i === 7) {
            if (j === 3) {
                border = '3px solid #000078';
            }
        }
        if (i === 8) {
            if (j === 2 || j === 4) {
                border = '3px solid #000078';
            }
        }
        return border;
    }

    renderSquare(i, j) {
        let square = this.state.board[i][j];
        //renders the square at the given position, using the board 2d array
        return <div style={{height: '40px', width: '40px'}}
            onClick={this.handleClick.bind(this, i, j)}>
            {(square != null) ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div>
                <img  src={this.getIcon(square.pieceColor.toLowerCase(), square.name, i, j)} alt={square.pieceColor.toLowerCase() + ' ' + square.name}/>
                </div>
                <h5 style={{color: square.pieceColor}}>{square.rank}</h5>
            </div> : null}
        </div>
    }

    renderBoard() {
        //responsible for rendering all 63 squares within the board

        let board = [];
        if (this.state.nickname === this.state.playerBlue) {
            for (let i=0; i<9; i++) {
                let row = [];
                for (let j=0; j<7; j++) {
                    row.push(<td style={{
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        height: 'inherit',
                        border: this.getBorder(i, j),
                        width: '50px',
                        backgroundColor: this.colorSquare(i,j)}}>
                        {this.renderSquare(i, j)}</td>);
                }
                board.push(<tr style={{height: '50px'}}>{row}</tr>);
            }
        } else {
            for (let i=8; i>=0; i--) {
                let row = [];
                for (let j=6; j>=0; j--) {
                    row.push(<td style={{
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        height: 'inherit',
                        border: this.getBorder(i, j),
                        width: '50px',
                        backgroundColor: this.colorSquare(i,j)}}>
                        {this.renderSquare(i, j)}</td>);
                }
                board.push(<tr style={{height: '50px'}}>{row}</tr>);
            }
        }

        return <Table borderless style={{width: '280px', height: '360px', backgroundColor: '1e4d2b'}}><tbody>{board}</tbody></Table>
    }

    newBoard() {
        let state = this.state;
        state.board = this.props.board;
        this.props.changeGame();
        state.newGame = false;
        state.playerTurn = this.props.startGame.playerTurn;
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
            <ModalBody>{this.state.winMessage}</ModalBody>
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
            <h4 style={(this.state.playerTurn === this.state.playerBlue ?
                {color: 'blue', textAlign: 'left'} :
                {color: 'red', textAlign: 'right'})}>
                {this.state.playerTurn}{status}
            </h4></div>);
    }

    componentDidMount() {
        if (this.state.status === "Active" || this.state.status === "Pending") {
            this.interval = setInterval(() => this.props.refresh(this.state.gameID, this.state.playerTurn, this.state.nickname, this.state.status), 1500);
        }
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        console.log(this.state.gameID);
        if(this.state.newGame) {
            this.newBoard()
        }
        let forfeitButton = <Button color="danger" onClick={() => {
            window.confirm("Are you sure you want to give up, "+ this.state.nickname + "?") && this.setWinnerAndForfeit();}}>FORFEIT</Button>;
        if(this.state.winner !== "") {
            forfeitButton = <div/>
        }
        let yourTurn = this.state.playerTurn === this.state.nickname ? <h5>It's your turn. Make a move!</h5> : <h5>Waiting for opponent...</h5>;
        return (<div>
            <Container style={{display: 'inline-block'}}>
                <div style={{display: 'inline-block'}} id="GamePage">
                    {/*this.winMessage()*/}
                    {yourTurn}
                    {this.turnMonitor()}
                    {this.renderBoard()}
                    <PieceGuide playerBlue={this.state.playerBlue} playerRed={this.state.playerRed}/>
                </div>
            </Container>
        <br/><br/><br/>
        {forfeitButton}
        </div>);
    }
}

export default GamePage;
