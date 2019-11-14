import React, {Component} from 'react';
import { ButtonGroup, Button} from 'reactstrap'
import Login from './Login';
import Register from './Register';

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
                <Button color="success" onClick={this.toggleRegister}>REGISTER</Button>
                <Button color="success" onClick={this.toggleLogIn}>LOG-IN</Button>
            </ButtonGroup>
        );
    }

    render() {
        if(this.state.registerBool) {
            return (
                <div id="Welcome">
                    <h3 style={{color: "black"}}>Welcome to the </h3>
                    <h2 style={{color: "black"}}>JUNGLE</h2>
                    <h3 style={{color: "black"}}>--------</h3>
                    <Register updateLogin={this.props.updateLogin}/>
                </div>
            );
        }
        else if(this.state.loginBool) {
            return (
                <div id="Welcome">
                    <h3 style={{color: "black"}}>Welcome to the </h3>
                    <h2 style={{color: "black"}}>JUNGLE</h2>
                    <h3 style={{color: "black"}}>--------</h3>
                    <Login updateLogin={this.props.updateLogin}/>
                </div>
            );
        }
        else {
            return (
                <div id="Welcome">
                    <h3 style={{color: "black"}}>Welcome to the </h3>
                    <h2 style={{color: "black"}}>JUNGLE</h2>
                    <h3 style={{color: "black"}}>--------</h3>
                    {this.renderButtons()}
                </div>
            );
        }
    }
}

export default Welcome