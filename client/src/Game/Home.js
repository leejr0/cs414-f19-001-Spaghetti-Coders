import React, {Component} from 'react';
import classnames from 'classnames';
import {Button, Card, CardBody, Col, Container, Jumbotron, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import {request} from "../api/api";
import GamePage from "./GamePage";
import Invite from "./Invite";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            board: null,
            displayBoard: false,
            newGame: true,
            nickname: this.props.nickname,
            homeState : 'Active',
            activeMatches: [
                {ID: 1, color: "red", opponent: "stuffity", turn: this.props.nickname, state: "active", winner: null},
                {ID: 2, color: "red", opponent: "Dave Matthews", turn: "Dave Matthews", state: "active", winner: null},
                {ID: 3, color: "blue", opponent: "Kim Possible", turn: "Kim Possible", state: "active", winner: null}
            ],
            pendingMatches: [
                {ID: 123, color: "blue", opponent: "Toucan Sam", turn: this.props.nickname, state: "pending", winner: null},
                {ID: 124, color: "blue", opponent: "Aang", turn: "Aang", state: "pending", winner: null},
                {ID: 125, color: "red", opponent: "Tony Frank", turn: this.props.nickname, state: "pending", winner: null}
            ],
            finishedMatches: [
                {ID: 43, color: "blue", opponent: "Stitch", turn: null, state: "finished", winner: "Stitch"},
                {ID: 45, color: "red", opponent: "Zuko", turn: null, state: "finished", winner: this.props.nickname},
                {ID: 76, color: "red", opponent: "Ash Ketchum", turn: null, state: "finished", winner: "Ash Ketchum"}
            ],
            startGame: {
                playerBlue: "Player 1",
                playerRed: "Player 2",
                createNewBoard: true
            },
            getGame: {
                nickname: this.props.nickname,
                type: "active"
            }
        };

        this.showBoard = this.showBoard.bind(this);
        this.beginGame = this.beginGame.bind(this);
        this.updatePlayerNames = this.updatePlayerNames.bind(this);
        this.currentGames = this.currentGames.bind(this);
        this.finishedGames = this.finishedGames.bind(this);
        this.pendingGames = this.pendingGames.bind(this);
        this.getTabContents = this.getTabContents.bind(this);
        this.setType = this.setType.bind(this);
        this.getGames = this.getGames.bind(this);
        this.getMatch = this.getMatch.bind(this);
        this.declineInvite = this.declineInvite.bind(this);
    }

    updatePlayerNames() {
        if(this.state.startGame.playerBlue === "") {
            let state = this.state;
            state.startGame.player1 = this.props.nickname + "_1";
            state.startGame.player2 = this.props.nickname + "_2";
            this.setState({state});
        }
    }

    beginGame() {
        request(this.state.startGame, "newMatch").then(serverResponse => {
            this.showBoard(serverResponse);
        });
    }

    showBoard(response) {
        let state = this.state;
        state.board = response;
        state.displayBoard = true;
        this.setState({state});
    }

    getGames() {
        // TODO: Make mock backend call to get the games based on type
        request(this.state.getGame,"getMatches").then(gameState => {

        });
    }

    setType(type) {
        this.setState({getGame:{type: type}}, () => this.getGames());
    }

    setGame(type, index, response) {
        let state = this.state;
        state.board = response;
        state.displayBoard = true;
        state.newGame = true;
        if(state[type][index].color === "red") {
            state.startGame.playerBlue = state[type][index].opponent;
            state.startGame.playerRed = state.nickname;
        }
        else {
            state.startGame.playerRed = state[type][index].opponent;
            state.startGame.playerBlue = state.nickname;
        }

        this.setState({state});
    }

    getMatch(ID, type) {
        console.log("Let's get match: " + ID + "  of this type: " + type);
        // TODO: Send call to back-end to get this match
        let index = -1;
        if(type === "pending") {
            for(let i = 0; i < this.state.pendingMatches.length; i++) {
                if(this.state.pendingMatches[i].ID === ID) {
                    index = i;
                    break;
                }
            }

            request(this.state.pendingMatches[index],"retrieveMatch").then(gameState => {
                this.setGame("pendingMatches", index, gameState);
            });
        }

        if(type === "active") {
            console.log("active");
            for(let i = 0; i < this.state.activeMatches.length; i++) {
                if(this.state.activeMatches[i].ID === ID) {
                    index = i;
                    break;
                }
            }

            request(this.state.activeMatches[index],"retrieveMatch").then(gameState => {
                this.setGame("activeMatches", index, gameState);
            });
        }

        if(type === "finished") {
            for(let i = 0; i < this.state.finishedMatches.length; i++) {
                if(this.state.finishedMatches[i].ID === ID) {
                    index = i;
                    break;
                }
            }

            request(this.state.finishedMatches[index],"retrieveMatch").then(gameState => {
                this.setGame("finishedMatches", index, gameState);
            });
        }
    }

    removeInvite(index) {
        let pendingMatches = [];
        for(let i = 0; i < this.state.pendingMatches.length; i++) {
            if(index !== i) {
                pendingMatches.push(this.state.pendingMatches[i]);
            }

        }

        this.setState({pendingMatches: pendingMatches});
    }

    declineInvite(ID) {
        console.log("I'm declining this match: " + ID);
        // TODO: Send call to back-end to decline this match
        let index = -1;
        for(let i = 0; i < this.state.pendingMatches.length; i++) {
            if(this.state.pendingMatches[i].ID === ID) {
                index = i;
                break;
            }
        }

        request(this.state.pendingMatches[index],"declineMatch").then(status => {
            if(!status) {
                //Error or something?
                //Refresh page without the game?
            }
            else {
                this.removeInvite(index);
            }
        });
    }

    pendingGames(match) {
        let display = <p> </p>;
        if(match.turn === this.state.nickname) {
            display = (
                <Row>
                    <Col><div style={{marginTop: "10px"}}>Waiting for {match.opponent} to accept or decline!</div></Col>
                </Row>);
        }
        else {
            display = (
                <Row>
                    <Col xs="6"><div style={{marginTop: "10px"}}>{match.opponent} wants to play!</div></Col>
                    <Col xs="6" style={{borderLeft: "1px solid black"}}>
                        <Button onClick={() => this.getMatch(match.ID, "pending")} color={"success"} style={{margin: "3px"}}>ACCEPT</Button>
                        <Button onClick={() => this.declineInvite(match.ID)}color={"danger"} style={{margin: "3px"}}>DECLINE</Button></Col>
                </Row>);
        }
        return (
            <div>
                <Card style={{display: "inline-block", height: "45px", width: "600px"}}>
                    {display}
                </Card>
                <br/>
                <br/>
            </div>);
    }

    currentGames(match) {
        let turn = match.turn;
        let play = "PLAY";
        if(turn === this.state.nickname) {
            turn = "Your turn!";
        }
        else {
            turn = turn + "'s turn!";
            play = "VIEW BOARD";
        }
        return (
            <div>
                <Card style={{display: "inline-block", height: "45px", width: "600px"}}>
                    <Row>
                        <Col xs="4"><div style={{marginTop: "10px"}}>{match.opponent}</div></Col>
                        <Col xs="4" style={{borderLeft: "1px solid black"}}><div style={{marginTop: "10px"}}>{turn}</div></Col>
                        <Col xs="4" style={{borderLeft: "1px solid black"}}><Button onClick={() => this.getMatch(match.ID,"active")} color={"success"} style={{margin: "3px"}}>{play}</Button></Col>
                    </Row>
                </Card>
                <br/>
                <br/>
            </div>);
    }

    finishedGames(match) {
        let winner = match.winner;
        if(winner === this.state.nickname) {
            winner = "You won!"
        }
        else {
            winner = winner + " won!"
        }
        return (
            <div>
                <Card style={{display: "inline-block", height: "45px", width: "600px"}}>
                    <Row>
                        <Col xs="4"><div style={{marginTop: "10px"}}>{match.opponent}</div></Col>
                        <Col xs="4" style={{borderLeft: "1px solid black"}}><div style={{marginTop: "10px"}}>{winner}</div></Col>
                        <Col xs="4" style={{borderLeft: "1px solid black"}}><Button onClick={() => this.getMatch(match.ID, "finished")} color={"success"} style={{margin: "3px"}}>VIEW</Button></Col>
                    </Row>
                </Card>
                <br/>
                <br/>
            </div>);
    }

    getTabContents(type) {
        if(type === "Active") {
            let activeGames = [];
            for(let i = 0; i < this.state.activeMatches.length; i++) {
                activeGames.push(this.currentGames(this.state.activeMatches[i]));
            }

            return activeGames;
        }

        if(type === "Pending") {
            let pendingGames = [];
            for(let i = 0; i < this.state.pendingMatches.length; i++) {
                pendingGames.push(this.pendingGames(this.state.pendingMatches[i]));
            }

            return pendingGames;
        }

        if(type === "Finished") {
            let finishedGames = [];
            for(let i = 0; i < this.state.finishedMatches.length; i++) {
                finishedGames.push(this.finishedGames(this.state.finishedMatches[i]));
            }

            return finishedGames;
        }

    }

    render() {
        this.updatePlayerNames();

        let gameTabs = ['Active', 'Pending', 'Finished'];

        let board = <div> </div>;
        let startButton = <Button onClick={this.beginGame}>Start a new game</Button>;
        if(this.state.displayBoard === true) {
            board = <GamePage board={this.state.board} newGame={this.state.newGame} startGame={this.state.startGame}/>;
        }


        return(
            <Card>
                <CardBody>
                    <Invite nickname={this.props.nickname} beginGame={this.beginGame} startGame={this.state.startGame}/>
                    {startButton}
                    <br/><br/>
                        <Nav tabs>
                            {gameTabs.map((tab) => {
                                return (
                                    <Col sm={{size:3, offset:1}}>
                                        <NavItem key={tab}>
                                            <NavLink
                                                className={classnames({active: this.state.homeState === tab})}
                                                onClick={() => {
                                                    if (this.state.homeState !== tab){
                                                        this.setState({homeState : tab});
                                                    }
                                                    this.getGames(tab)
                                                }}
                                            >
                                                {tab} Games
                                            </NavLink>
                                        </NavItem>
                                    </Col>
                                );
                            })}
                        </Nav>
                        <Row>
                            <Col md={{size:8, offset:2}}>
                                {gameTabs.map((tab) => {
                                    return (
                                        <TabContent activeTab={this.state.homeState}>
                                            <TabPane tabId={tab}>
                                                <br/><br/><br/>
                                                <Jumbotron>
                                                    <p>{tab} Games</p>
                                                    {this.getTabContents(tab)}
                                                    {board}
                                                </Jumbotron>
                                            </TabPane>
                                        </TabContent>
                                    );
                                })}
                            </Col>
                        </Row>
                </CardBody>
            </Card>
        );
    }
}
export default Home;