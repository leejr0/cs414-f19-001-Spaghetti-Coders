import React, {Component} from 'react';
import classnames from 'classnames';
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Jumbotron,
    Modal, ModalBody, ModalFooter, ModalHeader,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from "reactstrap";
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
            homeState: 'Active',
            displayActive: false,
            displayFinished: false,
            gotGames: false,
            reset: false,
            activeBoard: null,
            finishedBoard: null,
            displayGames: true,
            showWinner: false,
            winner: "",
            winMessage: "But winning isn't everything. It's just the only thing that matters.",
            activeMatches: [],
            pendingMatches: [],
            finishedMatches: [],
            startGame: {
                gameID: "",
                status: "",
                playerBlue: "Player 1",
                playerRed: "Player 2",
                createNewBoard: true,
                playerTurn: "Player 1",
                showWinner: false
            },
            getGame: {
                nickname: this.props.nickname
            }
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
        this.clearGame = this.clearGame.bind(this);
        this.showWinner = this.showWinner.bind(this);
        this.dismissWinMessage = this.dismissWinMessage.bind(this);
        this.winMessage = this.winMessage.bind(this);
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

        this.setState({state}, () => this.checkWon());
    }

    checkWon() {
        console.log("checkWon");
        if(this.state.showWinner === false && this.state.startGame.gameID !== "" && this.state.activeBoard != null) {
            let gameID = this.state.startGame.gameID;
            let removed = false;
            let index = -1;
            for(let i = 0; i < this.state.finishedMatches.length; i++) {
                if(gameID === this.state.finishedMatches[i].gameID) {
                    removed = true;
                    index = i;
                }
            }

            if(removed === true && this.state.startGame.showWinner === true) {
                let state = this.state;
                state.showWinner = true;
                state.startGame.showWinner = false;
                state.activeBoard = null;
                state.winner = this.state.finishedMatches[index].winner;
                this.setState({state});
            }
        }
    }

    getGames() {
        console.log("Polling homepage");
        request(this.state.nickname, "retrieveMatches").then(serverResponse => {
            this.sortGames(serverResponse);
        });
    }

    setGame(type, index, response, ID, status) {
        let state = this.state;
        state.board = response.board;
        state.displayBoard = true;
        state.newGame = true;
        state.startGame.gameID = ID;
        state.startGame.status = status;
        state.startGame.createNewBoard = true;
        state.startGame.playerTurn = response.playerTurn;
        state.startGame.playerBlue = state[type][index].playerBlue;
        state.startGame.playerRed = state[type][index].playerRed;
        state.reset = true;
        state.startGame.showWinner = true;
        state.activeBoard = null;
        state.finishedBoard = null;

        if(status === "Active") {
            state.displayActive = true;
            state.displayFinished = false;
        }
        else {
            state.displayActive = false;
            state.displayFinished = true;
        }

        this.setState({state});

        return response;
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

    removeInvite(index, declined) {
        let pendingMatches = [];
        if(declined) {
            for (let i = 0; i < this.state.pendingMatches.length; i++) {
                console.log("Matches: " + this.state.pendingMatches[i]);
                if (index !== i) {
                    pendingMatches.push(this.state.pendingMatches[i]);
                }
            }

            this.setState({pendingMatches: pendingMatches});
        }
        else{
            let j = -1;
            for (let i = 0; i < this.state.pendingMatches.length; i++) {
                if (index !== this.state.pendingMatches[i].gameID) {
                    pendingMatches.push(this.state.pendingMatches[i]);
                }
                else{
                    j = i;
                }
            }

            let activeMatches = this.state.activeMatches;
            activeMatches.push(this.state.pendingMatches[j]);

            this.setState({pendingMatches: pendingMatches, activeMatches: activeMatches});
        }
    }

    declineInvite(ID) {
        let index = -1;
        for(let i = 0; i < this.state.pendingMatches.length; i++) {
            if(this.state.pendingMatches[i].gameID === ID) {
                index = i;
                break;
            }
        }

        request(this.state.pendingMatches[index].gameID,"declineMatch").then(status => {
            if(!status) {
                //Error or something?
                //Refresh page without the game?
            }
            else {
                this.removeInvite(index);
                this.getGames();
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
                                this.removeInvite(match.gameID, false);
                                this.getMatch(match.gameID, "active");
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
        if(this.state.displayActive === true && this.state.startGame.gameID === match.gameID) {
            play = "MINIMIZE"
        }
        else if(whoseTurn === this.state.nickname) {
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
                        <Col xs="4" md="4"><div style={{marginTop: "10px"}}>Opponent: {match.opponent} | Game: {match.gameID}</div></Col>
                        <Col xs="4" md="4" style={{borderLeft: "1px solid black"}}><div style={{marginTop: "10px"}}>{whoseTurn}</div></Col>
                        <Col xs="4" md="4" style={{borderLeft: "1px solid black"}}><Button onClick={() =>
                            this.state.displayActive === true && this.state.startGame.gameID === match.gameID ? this.setState({displayActive: false, activeBoard: null}) : this.getMatch(match.gameID,"active")
                                } color={this.state.displayActive === true && this.state.startGame.gameID === match.gameID ? "danger" : "success"} style={{margin: "3px"}}>{play}</Button></Col>
                    </Row>
                </Card>
                <br/>
                <br/>
            </div>);
    }

    finishedGames(match) {
        let view = "VIEW";
        if(this.state.displayFinished === true && this.state.startGame.gameID === match.gameID) {
            view = "MINIMIZE"
        }
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
                        <Col xs="4" md="4"><div style={{marginTop: "10px"}}>Opponent: {match.opponent} | Game: {match.gameID}</div></Col>
                        <Col xs="4" md="4" style={{borderLeft: "1px solid black"}}><div style={{marginTop: "10px"}}>{winner}</div></Col>
                        <Col xs="4" md="4" style={{borderLeft: "1px solid black"}}><Button onClick={() =>
                            this.state.displayFinished === true  && this.state.startGame.gameID === match.gameID ? this.setState({displayFinished: false, finishedBoard: null}) : this.getMatch(match.gameID,"finished")
                        } color={this.state.displayFinished === true  && this.state.startGame.gameID === match.gameID ? "danger" : "success"} style={{margin: "3px"}}>{view}</Button></Col>
                    </Row>
                </Card>
                <br/>
                <br/>
            </div>);
    }

    dismissWinMessage() {
        let state = this.state;
        state.showWinner = false;
        state.winner = "";
        this.setState({state});
    }

    winMessage() {
        return <Modal isOpen={this.state.showWinner}>
            <ModalHeader>{this.state.winner} wins!</ModalHeader>
            <ModalBody>{this.state.winMessage}</ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={this.dismissWinMessage.bind(this)}>Exit</Button>
            </ModalFooter>
        </Modal>
    }

    getTabContents(type, gameID) {
        if(type === "Active") {
            let activeGames = [];
            activeGames.push(this.winMessage());
            for(let i = 0; i < this.state.activeMatches.length; i++) {
                activeGames.push(this.currentGames(this.state.activeMatches[i]));
                if(gameID === this.state.activeMatches[i].gameID) {
                    activeGames.push(this.state.activeBoard)
                }
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
                if(gameID === this.state.finishedMatches[i].gameID) {
                    finishedGames.push(this.state.finishedBoard)
                }
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

    refresh(gameID, turn, nickname, status) {
        console.log("Trying to poll");
        if(nickname !== turn && status === "Active") {
            console.log("polling...");

            this.getMatch(gameID, "active");
            this.setState({state: this.state});
        }
    }

    clearGame() {
        this.setState({activeBoard: null, reset: false});
    }

    componentDidMount() {
        this.interval = setInterval(() => this.getGames(), 4000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    showWinner(winner, winMessage) {
        console.log("showing winner");
        let state = this.state;
        state.winner = winner;
        state.showWinner = true;
        state.winMessage = winMessage;
        state.displayActive = false;
        state.activeBoard = null;
        state.homeState = "Finished";
        this.setState({state});
    }

    render() {
        console.log(this.state);
        this.updatePlayerNames();
        if(!this.state.gotGames) {
            this.getGames();
        }

        let gameTabs = ['Active', 'Pending', 'Finished'];

        let board = <div> </div>;
        let startButton = <Button onClick={this.beginGame}>Start a new game</Button>;
        if(this.state.displayBoard === true) {
            board = <GamePage board={this.state.board} newGame={this.state.newGame} startGame={this.state.startGame} changeGame={this.changeGame}/>;
        }

        if(this.state.displayActive && this.state.reset) {
            this.setState({activeBoard: <GamePage board={this.state.board} newGame={this.state.newGame} showWinner={this.showWinner} updateTurn={this.updateTurn} clearGame={this.clearGame} startGame={this.state.startGame} changeGame={this.changeGame} nickname={this.state.nickname} refresh={this.refresh}/>,
                reset: false});
        }

        if(this.state.displayFinished && this.state.reset) {
            this.setState({finishedBoard: <GamePage board={this.state.board} newGame={this.state.newGame} startGame={this.state.startGame} changeGame={this.changeGame} nickname={this.state.nickname}/>,
                reset: false});
        }
        let active = [<div> {this.getTabContents("Active",this.state.startGame.gameID)}</div>];

        let pending = [<div> {this.getTabContents("Pending", "")} </div>];

        let finished =  [<div> {this.getTabContents("Finished",this.state.startGame.gameID)} </div>];

        return(
            <Card>
                <CardBody>
                    <Invite nickname={this.props.nickname} beginGame={this.beginGame} startGame={this.state.startGame}/>
                    {/*<Button onClick={this.getGames}>REFRESH</Button>*/}
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
                        <Col md={{size:10, offset:1}}>
                            <Jumbotron style={{display: "block"}}>
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
