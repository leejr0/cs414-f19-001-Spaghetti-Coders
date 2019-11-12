import React, {Component} from 'react';
import {Button, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';

import {request} from '../api/api';
import GamePage from "./GamePage";
import Profile from "./Profile";
import Rules from "./Rules";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            board: null,
            display: true,
            displayBoard: false,
            newGame: true,
            activeTab: "Home",
            nickname: this.props.nickname,
            startGame: {
                playerBlue: "Player 1",
                playerRed: "Player 2",
                createNewBoard: true
            }
        };

        this.showBoard = this.showBoard.bind(this);
        this.beginGame = this.beginGame.bind(this);
        this.updatePlayerNames = this.updatePlayerNames.bind(this);
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

    updatePlayerNames() {
        if(this.state.startGame.playerBlue === "") {
            let state = this.state;
            state.startGame.player1 = this.props.nickname + "_1";
            state.startGame.player2 = this.props.nickname + "_2";
            this.setState({state});
        }
    }

    toggleTab(tabID) {
        if (this.state.activeTab !== tabID) {
            this.setState({
                activeTab: tabID
            });
        }
    }

    renderTab(tabID) {
        return (
            <NavItem key={tabID}>
                <NavLink key={tabID}
                         onClick={() => {
                             this.toggleTab(tabID);
                         }}
                >
                    {tabID}
                </NavLink>
            </NavItem>
        );
    }

    renderTabContents(tabContents, tabID) {
        return (
            <TabContent key={tabID} activeTab={this.state.activeTab}>
                <TabPane key={tabID} tabId={tabID}>
                    {tabContents}
                </TabPane>
            </TabContent>
        );
    }

    render() {
        this.updatePlayerNames();
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

        let tabs = ["Home", "Profile", "Rules", "Invites"];

        let home = [
            <div>
                <br></br>
                <h5 style={{color: "black"}}>Here's the board! Make a move!</h5>
                {startButton}
                <div id="GamePage">
                    {board}
                </div>
            </div>];
        let profile = [
            <Card key="cardkey">
                <CardBody key="cardbodykey">
                    <br></br>
                    <Profile nickname={this.props.nickname}/>
                </CardBody>
            </Card>
        ];
        let rules = [
            <Card key="cardkey">
                <CardBody key="cardbodykey">
                    <br></br>
                    <Rules/>
                </CardBody>
            </Card>
        ];
        let invites = [
            <Card key="cardkey">
                <CardBody key="cardbodykey">
                    <br></br>
                    <p> I'm going to be an invite! </p>
                </CardBody>
            </Card>
        ];

        return (
            <div>
                <h1 style={{color: "black", textAlign: "left"}}>JUNGLE</h1>
                <Nav tabs key="2">
                    {tabs.map((tabToRender) => {
                        return this.renderTab(tabToRender);
                    })}
                </Nav>
                {this.renderTabContents(home, 'Home')}
                {this.renderTabContents(profile, 'Profile')}
                {this.renderTabContents(rules, 'Rules')}
                {this.renderTabContents(invites, 'Invites')}
            </div>
        );
    }
}

export default Main;