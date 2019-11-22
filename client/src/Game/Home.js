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
            startGame: {
                playerBlue: "Player 1",
                playerRed: "Player 2",
                createNewBoard: true
            },
            nickname: this.props.nickname,
            homeState : 'Active',
            activeMatches: [
                {ID: 1, opponent: "stuffity", turn: this.props.nickname, state: "active", winner: null},
                {ID: 2, opponent: "Dave Matthews", turn: "Dave Matthews", state: "active", winner: null},
                {ID: 3, opponent: "Kim Possible", turn: "Kim Possible", state: "active", winner: null}
            ],
            pendingMatches: [
                {ID: 123, opponent: "Toucan Sam", turn: this.props.nickname, state: "pending", winner: null},
                {ID: 124, opponent: "Aang", turn: "Aang", state: "pending", winner: null},
                {ID: 125, opponent: "Tony Frank", turn: this.props.nickname, state: "pending", winner: null}
            ],
            finishedMatches: [
                {ID: 43, opponent: "Stitch", turn: null, state: "finished", winner: "Stitch"},
                {ID: 45, opponent: "Zuko", turn: null, state: "finished", winner: this.props.nickname},
                {ID: 76, opponent: "Ash Ketchum", turn: null, state: "finished", winner: "Ash Ketchum"}
            ]
        };

        this.showBoard = this.showBoard.bind(this);
        this.beginGame = this.beginGame.bind(this);
        this.updatePlayerNames = this.updatePlayerNames.bind(this);
        this.currentGames = this.currentGames.bind(this);
        this.finishedGames = this.finishedGames.bind(this);
        this.pendingGames = this.pendingGames.bind(this);
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
                    <Col xs="6" style={{borderLeft: "1px solid black"}}><Button color={"success"} style={{margin: "3px"}}>ACCEPT</Button><Button color={"danger"} style={{margin: "3px"}}>DECLINE</Button></Col>
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
        if(turn === this.state.nickname) {
            turn = "Your turn!"
        }
        else {
            turn = turn + "'s turn!"
        }
        return (
            <div>
                <Card style={{display: "inline-block", height: "45px", width: "600px"}}>
                    <Row>
                        <Col xs="4"><div style={{marginTop: "10px"}}>{match.opponent}</div></Col>
                        <Col xs="4" style={{borderLeft: "1px solid black"}}><div style={{marginTop: "10px"}}>{turn}</div></Col>
                        <Col xs="4" style={{borderLeft: "1px solid black"}}><Button color={"success"} style={{margin: "3px"}}>PLAY</Button></Col>
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
                        <Col xs="4" style={{borderLeft: "1px solid black"}}><Button color={"success"} style={{margin: "3px"}}>VIEW</Button></Col>
                    </Row>
                </Card>
                <br/>
                <br/>
            </div>);
    }

    render() {
        this.updatePlayerNames();

        let gameTabs = ['Active', 'Pending', 'Finished'];

        let board = <div> </div>;
        let startButton = <Button onClick={this.beginGame}>Start a new game</Button>;
        if(this.state.displayBoard === true) {
            board = <GamePage board={this.state.board} newGame={this.state.newGame} startGame={this.state.startGame}/>;
        }

        let activeGames = [];
        for(let i = 0; i < this.state.activeMatches.length; i++) {
            activeGames.push(this.currentGames(this.state.activeMatches[i]));
        }

        let pendingGames = [];
        for(let i = 0; i < this.state.pendingMatches.length; i++) {
            pendingGames.push(this.pendingGames(this.state.pendingMatches[i]));
        }

        let finishedGames = [];
        for(let i = 0; i < this.state.finishedMatches.length; i++) {
            finishedGames.push(this.finishedGames(this.state.finishedMatches[i]));
        }

        return(
            <Card>
                <CardBody>
                    <Invite nickname={this.props.nickname} beginGame={this.beginGame} startGame={this.state.startGame}/>
                    {startButton}
                    <br/><br/>
                    <Container>
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
                                                    <p>{tab} Games Here</p>
                                                    {activeGames}
                                                    {pendingGames}
                                                    {finishedGames}
                                                    {board}
                                                </Jumbotron>
                                            </TabPane>
                                        </TabContent>
                                    );
                                })}
                            </Col>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
        );
    }
}
export default Home;