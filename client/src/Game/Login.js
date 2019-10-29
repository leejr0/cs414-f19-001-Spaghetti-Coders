import React, {Component} from 'react';
import {Button, Input, Alert} from "reactstrap";

import {get, request} from '../api/api'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginInfo: {
                nickname: "",
                password: ""
            },
            validation: false,
            errorMessage: ""
        };

        this.login = this.login.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.validateCredentials = this.validateCredentials.bind(this);
        this.updateValidation = this.updateValidation.bind(this);
    }

    login() {
        if(this.state.validation === true && this.state.loginInfo.nickname !== "") {
             this.props.updateLogin(true, this.state.loginInfo.nickname);
        }
        else {
            //TODO: Display an error message that the credentials are incorrect
            this.setState({errorMessage: "Incorrect username/password combination."});
        }
    }

    validateCredentials() {
        //TODO: Hash given password
        //TODO: Communicate with backend to confirm correct username/password combination
        request(this.state.loginInfo, "login").then(serverResponse => {
            this.updateValidation(serverResponse);
        });
    }
    updateValidation(value) {
        let state = this.state;
        state["validation"] = value;
        this.setState({state}, () => this.login());
    }

    updateValue(id, value) {
        let state = this.state;
        state.loginInfo[id] = value;
        this.setState({state});
    }

    render() {
        let errorMessage;
        if(this.state.errorMessage !== ""){
            errorMessage = <Alert color="danger">{this.state.errorMessage}</Alert>
        }

        return (
            <div id="logIn">
                <h5 style={{color: "white"}}>Login and continue playing!</h5>
                <Input type="text" placeholder="username" onChange={(input) => this.updateValue("nickname", input.target.value)}/>
                <Input type="password" placeholder="password" onChange={(input) => this.updateValue("password", input.target.value)}/>
                <Button onClick={this.validateCredentials}>Login</Button>
                {errorMessage}
            </div>
        );
    }
}

export default Login;