import React, {Component} from 'react';
import {Button, Input, Alert, Form, FormGroup, Card, Label, Col} from "reactstrap";

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
            this.setState({errorMessage: "Incorrect username/password combination."});
        }
    }

    validateCredentials() {
        //TODO: Hash given password
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
            <div id="logIn" style={{width: "600px", display: "inline-block"}}>
                <h5 style={{color: "black"}}>Login and continue playing!</h5>
                <Card>
                    <div style={{width: "400px", margin: "auto"}}>
                        <Form>
                            <FormGroup>
                                <Label for="nickname">Nickname</Label>
                                <Input type="text" placeholder="nickname" id="nickname" onChange={(input) => this.updateValue("nickname", input.target.value)}/>
                                <Label for="password">Password</Label>
                                <Input type="password" placeholder="password" id="password" onChange={(input) => this.updateValue("password", input.target.value)}/>
                                <br></br>
                                <Button color="success" onClick={this.validateCredentials}>Login</Button>
                                {errorMessage}
                            </FormGroup>
                        </Form>
                    </div>
                </Card>
            </div>
        );
    }
}

export default Login;