import React, {Component} from 'react';
import {Button} from 'reactstrap';

import {request} from '../api/api';
import GamePage from "./GamePage";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            board: null,
            display: true,
            displayBoard: false,
            newGame: true,
            startGame: {
                playerBlue: "",
                playerRed: "robotPlayer",
                createNewBoard: true
            }
        };

        this.showBoard = this.showBoard.bind(this);
        this.beginGame = this.beginGame.bind(this);
        this.updatePlayer1 = this.updatePlayer1.bind(this);
    }

    beginGame() {
        request(this.state.startGame, "newMatch").then(serverResponse => {
            console.log("Got this board back: ");
            console.log(serverResponse);
            this.showBoard(serverResponse);
        });
    }

    showBoard(response) {
        console.log("This board in showBoard: ");
        console.log(response);
        let state = this.state;
        state.board = response;
        state.displayBoard = true;

        this.setState({state});
    }

    updatePlayer1() {
        if(this.state.startGame.playerBlue === "") {
            let state = this.state;
            state.startGame.playerBlue = this.props.nickname;
            this.setState({state});
        }
    }

    render() {
        this.updatePlayer1();
        if(!this.state.display) {
            return (<h5> </h5>);
        }

        let board = <div> </div>;
        let startButton = <Button onClick={this.beginGame}>Start a new game</Button>;
        if(this.state.displayBoard === true) {
            console.log("Now state has board:");
            console.log(this.state.board);
            board = <GamePage board={this.state.board} newGame={this.state.newGame} startGame={this.state.startGame}/>;
            startButton = <div> </div>
        }
        // console.log("----");
        // console.log(this.state.startGame.player1);
        // console.log(this.state.startGame.player2);
        return (
            <div>
                <h1 style={{color: "white", textAlign: "left"}}>JUNGLE</h1>
                <h5 style={{color: "white"}}>Here's the board! Make a move!</h5>
                {startButton}
                <div id="GamePage">
                    {board}
                </div>
            </div>
        );
    }
}

export default Main;