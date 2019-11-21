import React, {Component} from 'react';
import {
    Button,
    Card,
    CardBody,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Input,
    Modal,
    ButtonGroup,
    Alert
} from 'reactstrap';

import {get, request} from '../api/api';
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
            invitePlayer: false,
            startGame: {
                playerBlue: "Player 1",
                playerRed: "Player 2",
                createNewBoard: true
            },
            playerSearch: {
                opponentFound: false,
                nickname: "",
                errorMessage: "",
                invitationSent: false
            }
        };

        this.showBoard = this.showBoard.bind(this);
        this.beginGame = this.beginGame.bind(this);
        this.updatePlayerNames = this.updatePlayerNames.bind(this);
        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.searchOpponent = this.searchOpponent.bind(this);
        this.sendInvite = this.sendInvite.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.displayInvite = this.displayInvite.bind(this);
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

    logout() {
        let state = this.state;
        state.board = null;
        state.display = false;
        state.displayBoard = false;
        state.newGame = false;
        state.activeTab = null;
        state.nickname = null;
        state.startGame = null;
        this.setState(({state}, window.location.reload()));
    }

    updateSearchValue(id, value) {
        let state = this.state;
        state.playerSearch[id] = value;
        state.playerSearch.opponentFound = false;
        this.setState({state});
    }

    searchOpponent(random) {
        if(this.state.playerSearch.nickname === this.state.nickname) {
            let state = this.state;
            state.playerSearch.errorMessage = "You can't challenge yourself, silly!";
            state.playerSearch.opponentFound = false;
            this.setState({state});
        }
        else if(this.state.playerSearch.nickname === "") {
            let state = this.state;
            state.playerSearch.errorMessage = "Please type in a player to search.";
            state.playerSearch.opponentFound = false;
            this.setState({state});
        }
        else if(random) {
            get("getRandomPlayer").then(serverResponse => {
                let state = this.state;
                state.playerSearch.nickname = serverResponse.nickname;
                state.playerSearch.errorMessage = "";
                state.playerSearch.invitationSent = false;
                this.setState({state});
            });
        }
        else {
            request(this.state.playerSearch, "searchPlayer").then(serverResponse => {
                let state = this.state;
                state.playerSearch.invitationSent = false;
                if(!serverResponse){
                    state.playerSearch.errorMessage = this.state.playerSearch.nickname + " player not found!";
                    state.playerSearch.opponentFound = false;
                }
                else{
                    state.playerSearch.opponentFound = serverResponse;
                    state.playerSearch.errorMessage = "";
                }

                this.setState({state});
            });
        }
    }

    sendInvite() {
        if(this.state.playerSearch.opponentFound === false) {
            let state = this.state;
            state.playerSearch.errorMessage = "Please search for a player above.";

            this.setState({state});
        }
        else {
            request(this.state.playerSearch, "invitePlayer").then(serverResponse => {
                let state = this.state;
                if (!serverResponse) {
                    state.playerSearch.errorMessage = "Invitation failed!";
                    this.setState({state});
                }
                else {
                    state.playerSearch.errorMessage = "";
                    state.playerSearch.invitationSent = true;
                    state.startGame.playerRed = this.state.nickname;
                    state.startGame.playerBlue = this.state.playerSearch.nickname;
                    //Temporary callback to show functionality
                    this.setState({state}, () => {this.beginGame()});
                }
                //this.setState({state});
            });
        }
    }

    displayInvite() {
        let errorMessage;
        if(this.state.playerSearch.errorMessage !== ""){
            errorMessage = <Alert color="danger">{this.state.playerSearch.errorMessage}</Alert>
        }
        let foundOpponent = <p style={{textAlign: "center"}}>Select your opponent!</p>;
        if(this.state.playerSearch.opponentFound) {
            foundOpponent = <p style={{textAlign: "center"}}>Your opponent, {this.state.playerSearch.nickname}, has been found!</p>
        }
        let invitationSent = <p> </p>;
        if(this.state.playerSearch.invitationSent) {
            invitationSent = <Alert color="success">Your invitation was successfully sent!</Alert>
        }
        // TODO: Center top text in Modal
        return (
            <Modal isOpen={this.state.invitePlayer}>
                <ModalHeader><h5 style={{textAlign: "center"}}>Invite your friends or get a random opponent!</h5></ModalHeader>
                <ModalBody>
                    {foundOpponent}
                    <Input type="text" onChange={(input) => this.updateSearchValue("nickname", input.target.value)}/>
                    <br/>
                    <Button onClick={() => this.searchOpponent(false)}>SEARCH</Button>
                    <Button className="float-right" onClick={() => this.searchOpponent(true)}>RANDOM OPPONENT</Button>
                    <br/>
                    <br/>
                    {errorMessage}
                    {invitationSent}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.sendInvite}>INVITE</Button>
                    <Button onClick={this.toggleModal}>EXIT</Button>
                </ModalFooter>
            </Modal>
        );
    }

    toggleModal() {
        let state = this.state;
        state.invitePlayer = !state.invitePlayer;
        this.setState({state});
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
        console.log(this.state);
        let home = [
            <div>
                <br/>
                <h5 style={{color: "black"}}>Here's the board! Make a move!</h5>
                <Button onClick={this.toggleModal}>START</Button>
                {this.displayInvite()}
                {startButton}
                <div id="GamePage">
                    {board}
                </div>
            </div>];
        let profile = [
            <Card key="cardkey">
                <CardBody key="cardbodykey">
                    <br/>
                    <Profile nickname={this.props.nickname}/>
                </CardBody>
            </Card>
        ];
        let rules = [
            <Card key="cardkey">
                <CardBody key="cardbodykey">
                    <br/>
                    <Rules/>
                </CardBody>
            </Card>
        ];
        let invites = [
            <Card key="cardkey">
                <CardBody key="cardbodykey">
                    <br/>
                    <p> I'm going to be an invite! </p>
                </CardBody>
            </Card>
        ];

        let logoutButton = <Button outline color="success" style={{float: 'right'}} onClick={this.logout.bind(this)}>Logout</Button>;

        return (
            <div>
                <div>
                    <div style={{ padding: '.5rem' }}>
                        {logoutButton}
                    </div>
                    <h1 style={{color: "black", textAlign: "left"}}>JUNGLE</h1>
                </div>
                <div>
                    <Nav tabs key="2">
                        {tabs.map((tabToRender) => {
                            return this.renderTab(tabToRender);
                        })}
                    </Nav>
                </div>
                <div>
                    {this.renderTabContents(home, 'Home')}
                    {this.renderTabContents(profile, 'Profile')}
                    {this.renderTabContents(rules, 'Rules')}
                    {this.renderTabContents(invites, 'Invites')}
                </div>
            </div>
        );
    }
}

export default Main;