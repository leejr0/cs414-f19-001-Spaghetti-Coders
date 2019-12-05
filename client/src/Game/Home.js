import React, {Component} from 'react';
import classnames from 'classnames';
import {Button, Card, CardBody, Col, Container, Jumbotron, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import {request} from "../api/api";
import GamePage from "./GamePage";
import Invite from "./Invite";
import icon from "./assets/jungleicon.png";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            board: null,
            displayBoard: false,
            newGame: true,
            nickname: this.props.nickname,
            homeState : 'Active',
            displayActive: false,
            displayFinished: false,
            gotGames: false,
            reset: false,
            activeBoard: null,
            finishedBoard: null,
            activeMatches: [
                {gameID: 1, color: "red", opponent: "stuffity", playerTurn: this.props.nickname, state: "active", winner: null},
                {gameID: 2, color: "red", opponent: "Dave Matthews", playerTurn: "Dave Matthews", state: "active", winner: null},
                {gameID: 3, color: "blue", opponent: "Kim Possible", playerTurn: "Kim Possible", state: "active", winner: null}
            ],
            pendingMatches: [
                {gameID: 123, color: "blue", opponent: "Toucan Sam", playerTurn: this.props.nickname, state: "pending", winner: null},
                {gameID: 124, color: "blue", opponent: "Aang", playerTurn: "Aang", state: "pending", winner: null},
                {gameID: 125, color: "red", opponent: "Tony Frank", playerTurn: this.props.nickname, state: "pending", winner: null}
            ],
            finishedMatches: [
                {gameID: 43, color: "blue", opponent: "Stitch", playerTurn: null, state: "finished", winner: "Stitch"},
                {gameID: 45, color: "red", opponent: "Zuko", playerTurn: null, state: "finished", winner: this.props.nickname},
                {gameID: 76, color: "red", opponent: "Ash Ketchum", whoseTurn: null, state: "finished", winner: "Ash Ketchum"}
            ],
            startGame: {
                gameID: "",
                status: "",
                playerBlue: "Player 1",
                playerRed: "Player 2",
                createNewBoard: true,
                playerTurn: "Player 1"
            },
            getGame: {
                nickname: this.props.nickname
            },
            oldState1: null
        };

        this.showBoard = this.showBoard.bind(this);
        this.beginGame = this.beginGame.bind(this);
        this.updatePlayerNames = this.updatePlayerNames.bind(this);
        this.currentGames = this.currentGames.bind(this);
        this.finishedGames = this.finishedGames.bind(this);
        this.pendingGames = this.pendingGames.bind(this);
        this.getTabContents = this.getTabContents.bind(this);
        this.getGames = this.getGames.bind(this);
        this.getMatch = this.getMatch.bind(this);
        this.declineInvite = this.declineInvite.bind(this);
        this.sortGames = this.sortGames.bind(this);
        this.changeGame = this.changeGame.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    changeGame() {
        this.setState({createNewBoard: false})
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

    sortGames(serverResponse) {
        let state = this.state;
        state.activeMatches = [];
        state.pendingMatches = [];
        state.finishedMatches = [];
        state.gotGames = true;
        for(let i = 0; i < serverResponse.length; i++) {
            let match = serverResponse[i];
            if(match.playerRed === state.nickname) {
                match.opponent = match.playerBlue;
            }
            else{
                match.opponent = match.playerRed;
            }


            if(match.status.toLowerCase() === "active") {
                state.activeMatches.push(match);
            }
            else if(match.status.toLowerCase() === "pending") {
                state.pendingMatches.push(match);
            }
            else if(match.status.toLowerCase() === "finished") {
                state.finishedMatches.push(match);
            }
        }

        this.setState({state});
    }

    getGames() {
        if(!this.state.gotGames) {
            request(this.state.nickname, "retrieveMatches").then(serverResponse => {
                this.sortGames(serverResponse);
            });
        }
    }

    setGame(type, index, response, ID, status) {
        let state = this.state;
        state.board = response;
        state.displayBoard = true;
        state.newGame = true;
        state.startGame.gameID = ID;
        state.startGame.status = status;
        state.startGame.createNewBoard = true;
        state.startGame.playerTurn = state[type][index].playerTurn;
        state.startGame.playerBlue = state[type][index].playerBlue;
        state.startGame.playerRed = state[type][index].playerRed;
        state.reset = true;
        state.activeBoard = null;
        state.finishedBoard = null;
        // if(state[type][index].color === "red") {
        //     state.startGame.playerBlue = state[type][index].opponent;
        //     state.startGame.playerRed = state.nickname;
        // }
        // else {
        //     state.startGame.playerRed = state[type][index].opponent;
        //     state.startGame.playerBlue = state.nickname;
        // }

        // state.displayActive = true;
        // state.displayFinished = true;
        if(status === "Active") {
            state.displayActive = true;
            state.displayFinished = false;
        }
        else {
            state.displayActive = false;
            state.displayFinished = true;
        }

        this.setState({state});
    }

    getMatch(ID, type) {
        let index = -1;
        if(type === "pending") {
            for(let i = 0; i < this.state.pendingMatches.length; i++) {
                if(this.state.pendingMatches[i].gameID === ID) {
                    index = i;
                    break;
                }
            }
            request(this.state.pendingMatches[index].gameID,"retrieveMatch").then(gameState => {
                this.setGame("pendingMatches", index, gameState, ID, "Active");
            });
        }

        if(type === "active") {
            for(let i = 0; i < this.state.activeMatches.length; i++) {
                if(this.state.activeMatches[i].gameID === ID) {
                    index = i;
                    break;
                }
            }
            request(this.state.activeMatches[index].gameID,"retrieveMatch").then(gameState => {
                this.setGame("activeMatches", index, gameState, ID, "Active");
            });
        }

        if(type === "finished") {
            for(let i = 0; i < this.state.finishedMatches.length; i++) {
                if(this.state.finishedMatches[i].gameID === ID) {
                    index = i;
                    break;
                }
            }

            request(this.state.finishedMatches[index].gameID,"retrieveMatch").then(gameState => {
                this.setGame("finishedMatches", index, gameState, ID, "Finished");
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
        let index = -1;
        for(let i = 0; i < this.state.pendingMatches.length; i++) {
            if(this.state.pendingMatches[i].gameID === ID) {
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
        if(match.playerTurn !== this.state.nickname) {
            display = (
                <Card style={{display: "inline-block", height: "45px", minWidth: "100%"}}>
                    <Row>
                        <Col><div style={{marginTop: "10px"}}>Waiting for {match.opponent} to accept or decline!</div></Col>
                    </Row>
                </Card>);
        }
        else {
            display = (
                <Card style={{display: "inline-block", minWidth: "100%"}}>
                    <Row>
                        <Col xs="6"><div style={{marginTop: "10px"}}>{match.opponent} wants to play!</div></Col>
                        <Col xs="6" style={{borderLeft: "1px solid black"}}>
                            <Button onClick={() => {
                                this.setState({homeState: "Active"});
                                this.getMatch(match.gameID, "pending")
                            }} color={"success"} style={{margin: "3px"}}>ACCEPT</Button>
                            <Button onClick={() => this.declineInvite(match.gameID)} color={"danger"} style={{margin: "3px"}}>DECLINE</Button></Col>
                    </Row>
                </Card>);
        }
        return (
            <div>
                {display}
                <br/>
                <br/>
            </div>);
    }

    currentGames(match) {
        let whoseTurn = match.playerTurn;
        let play = "PLAY";
        if(whoseTurn === this.state.nickname) {
            whoseTurn = "Your turn!";
        }
        else {
            whoseTurn = whoseTurn + "'s turn!";
            play = "VIEW BOARD";
        }
        return (
            <div>
                <Card style={{display: "inline-block", minWidth: "100%"}}>
                    <Row>
                        <Col xs="4" md="4"><div style={{marginTop: "10px"}}>Opponent: {match.opponent}</div></Col>
                        <Col xs="4" md="4" style={{borderLeft: "1px solid black"}}><div style={{marginTop: "10px"}}>{whoseTurn}</div></Col>
                        <Col xs="4" md="4" style={{borderLeft: "1px solid black"}}><Button onClick={() => this.getMatch(match.gameID,"active")} color={"success"} style={{margin: "3px"}}>{play}</Button></Col>
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
                <Card style={{display: "inline-block", minWidth: "100%"}}>
                    <Row>
                        <Col xs="4" md="4"><div style={{marginTop: "10px"}}>{match.opponent}</div></Col>
                        <Col xs="4" md="4" style={{borderLeft: "1px solid black"}}><div style={{marginTop: "10px"}}>{winner}</div></Col>
                        <Col xs="4" md="4" style={{borderLeft: "1px solid black"}}><Button onClick={() => this.getMatch(match.gameID, "finished")} color={"success"} style={{margin: "3px"}}>VIEW</Button></Col>
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

    toggleTab(tabID) {
        if (this.state.homeState !== tabID) {
            this.setState({
                homeState: tabID
            });
        }
    }

    renderTab(tabID) {//style={{marginLeft: "10%", marginRight:"10%"}}
        return (
            <Col>
                <NavItem key={tabID}>

                    <NavLink key={tabID}
                             className={classnames({active: this.state.homeState === tabID})}
                             onClick={() => {
                                 this.toggleTab(tabID);
                                 this.getGames();
                             }}
                    >
                        {tabID}
                    </NavLink>
                </NavItem>
            </Col>
        );
    }

    renderTabContents(tabContents, tabID) {
        return (
            <Row>
                <Col md={{size:10, offset:1}}>
            <TabContent key={tabID} activeTab={this.state.homeState}>
                <TabPane key={tabID} tabId={tabID}>
                    {tabContents}
                </TabPane>
            </TabContent>
                </Col>
            </Row>
        );
    }

    refresh(gameID) {
        console.log("polling...");
        this.getMatch(gameID, "active");
        this.setState({state: this.state});
    }

    render() {
        this.updatePlayerNames();
        this.getGames();

        let gameTabs = ['Active', 'Pending', 'Finished'];

        let board = <div> </div>;
        let startButton = <Button onClick={this.beginGame}>Start a new game</Button>;
        if(this.state.displayBoard === true) {
            board = <GamePage board={this.state.board} newGame={this.state.newGame} startGame={this.state.startGame} changeGame={this.changeGame}/>;
        }

        console.log(this.state);
        if(this.state.displayActive && this.state.reset) {
            this.setState({activeBoard: <GamePage board={this.state.board} newGame={this.state.newGame} startGame={this.state.startGame} changeGame={this.changeGame} nickname={this.state.nickname} refresh={this.refresh}/>,
                reset: false});
        }

        if(this.state.displayFinished && this.state.reset) {
            this.setState({finishedBoard: <GamePage board={this.state.board} newGame={this.state.newGame} startGame={this.state.startGame} changeGame={this.changeGame} nickname={this.state.nickname}/>,
                reset: false});
            // finishedBoard = <GamePage board={this.state.board} newGame={this.state.newGame} startGame={this.state.startGame} changeGame={this.changeGame} nickname={this.state.nickname}/>;
        }
        let active = [<div> {this.getTabContents("Active")} {this.state.activeBoard} </div>];

        let pending = [<div> {this.getTabContents("Pending")} </div>];

        let finished =  [<div> {this.getTabContents("Finished")} {this.state.finishedBoard} </div>];

        return(
            <Card>
                <CardBody>
                    <Invite nickname={this.props.nickname} beginGame={this.beginGame} startGame={this.state.startGame}/>
                    {/*{startButton}*/}
                    <br/><br/>
                    <div>
                        <Col md={{size:6, offset:3}}>
                            <Nav tabs key="2">
                                {gameTabs.map((tabToRender) => {
                                    return this.renderTab(tabToRender);
                                })}
                            </Nav>
                        </Col>
                    </div>
                    <div>
                        <Col md={{size:6, offset:3}}>
                            <Jumbotron>
                                {this.renderTabContents(active, 'Active')}
                                {this.renderTabContents(pending, 'Pending')}
                                {this.renderTabContents(finished, 'Finished')}
                            </Jumbotron>
                        </Col>
                    </div>

                </CardBody>
            </Card>
        );
    }
}
export default Home;
