import React, {Component} from 'react';
import classnames from 'classnames';
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Jumbotron,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from "reactstrap";
import {request} from "../api/api";
import GamePage from "./GamePage";

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
            homeState : 'Active'
        };

        this.showBoard = this.showBoard.bind(this);
        this.beginGame = this.beginGame.bind(this);
        this.updatePlayerNames = this.updatePlayerNames.bind(this);
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
                    {startButton}
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
                            <Col md={{size:6, offset:3}}>
                                {gameTabs.map((tab) => {
                                    return (
                                        <TabContent activeTab={this.state.homeState}>
                                            <TabPane tabId={tab}>
                                                <Jumbotron>
                                                    <p>{tab} Games Here</p>
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
export default Home