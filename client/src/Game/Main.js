import React, {Component} from 'react';
import {Button} from 'reactstrap';

import {request} from '../api/api';
import GamePage from "./GamePage";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: true,
            displayBoard: false,
            board: null,
            newGame: true,
            startGame: {
                player1: "Player 1",
                player2: "Player 2",
                createNewBoard: true
            }
        };

        this.showBoard = this.showBoard.bind(this);
        this.beginGame = this.beginGame.bind(this);
        this.updatePlayerNames = this.updatePlayerNames.bind(this);
    }

    beginGame() {
        request(this.state.startGame, "startGame").then(serverResponse => {
            this.showBoard(serverResponse)
        });
    }

    showBoard(response) {
        let state = this.state;
        state.board = response.board;
        state.displayBoard = true;
        console.log(response);
        this.setState({state});
    }

    updatePlayerNames() {
        //give both players the user's nickname with a number once the game is started
        if (this.state.startGame.player1 === "Player 1") {
            let state = this.state;
            state.startGame.player1 = this.props.nickname + "_1";
            state.startGame.player2 = this.props.nickname + "_2";
            this.setState({state});
        }
    }

    render() {
        this.updatePlayerNames();
        if(!this.state.display) {
            return (<h5> </h5>);
        }

        let board = <div> </div>;
        let startButton = <Button onClick={this.beginGame}>Start a new game</Button>;
        if(this.state.displayBoard === true) {
            board = <GamePage board={this.state.board} newGame={this.state.newGame} startGame={this.state.startGame}/>;
            startButton = <div> </div>
        }
        console.log("----");
        console.log(this.state.startGame.player1);
        console.log(this.state.startGame.player2);
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