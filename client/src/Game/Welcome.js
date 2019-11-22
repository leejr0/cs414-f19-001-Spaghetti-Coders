import React, {Component} from 'react';
import {ButtonGroup, Button, Card, CardBody} from 'reactstrap'
import Login from './Login';
import Register from './Register';

import icon from "./assets/jungleicon.png";

class Welcome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            registerBool: false,
            loginBool: false
        };

        this.toggleLogIn = this.toggleLogIn.bind(this);
        this.toggleRegister = this.toggleRegister.bind(this);
        this.renderButtons = this.renderButtons.bind(this);
    }

    toggleLogIn() {
        this.setState({
                registerBool: false,
                loginBool: true
            }
        )
    }

    toggleRegister() {
        this.setState({
                registerBool: true,
                loginBool: false
            }
        )
    }

    renderButtons() {
        return (
            <ButtonGroup>
                <Button color="success" onClick={this.toggleLogIn}>LOG IN</Button>
                <Button color="success" onClick={this.toggleRegister}>REGISTER</Button>
            </ButtonGroup>
        );
    }

    render() {
        if(this.state.registerBool) {
            return (
                <div id="Welcome">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <img  src={icon}/>
                    <br/>
                    <br/>
                    <br/>
                    <Register updateLogin={this.props.updateLogin}/>
                </div>
            );
        }
        else if(this.state.loginBool) {
            return (
                <div id="Welcome">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <img  src={icon}/>
                    <br/>
                    <br/>
                    <br/>
                    <Login updateLogin={this.props.updateLogin}/>
                </div>
            );
        }
        else {
            return (
                <div id="Welcome">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <img  src={icon}/>
                    <br/>
                    <br/>
                    <br/>
                    {this.renderButtons()}
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div style={{display: "inline-block", width: "800px"}}>
                        <div>
                            <Card>
                                <CardBody>
                                    <h3>About Jungle</h3>
                                    <br/>
                                    <p>Jungle, or Dou Shou Qi, is a modern Chinese board game. The game is played on a 7×9 board and is popular with children in the Far East.
                                        The Jungle gameboard represents a jungle terrain with dens, traps "set" around dens, and rivers. Each player controls eight game
                                        pieces representing different animals of various rank. Stronger-ranked animals can capture ("eat") animals of weaker or equal rank.
                                        The player who is first to maneuver any one of their pieces into the opponent's den wins the game. An alternative way to win is to capture all the opponent's pieces.</p>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Welcome