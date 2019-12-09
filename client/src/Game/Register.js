import React, {Component} from 'react';
import {Button, Input, Alert, Form, FormGroup, Label, Card} from 'reactstrap';

import {get, request} from '../api/api'

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profileInfo: {
                nickname: "",
                password: "",
                verifyPassword: "",
                email: ""
            },
            validation: false,
            errorMessage: ""
        };

        this.login = this.login.bind(this);
        this.createProfile = this.createProfile.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.updateVerifyPassword = this.updateVerifyPassword.bind(this);
        this.validateNickName = this.validateNickName.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateCredentials = this.validateCredentials.bind(this);
        this.updateValidation = this.updateValidation.bind(this);
    }

    login() {
        if(this.state.validation === true) {
            this.props.updateLogin(true, this.state.profileInfo.nickname);
        }
        else {
            this.setState({errorMessage: "Nickname is already taken."});
        }
    }

    createProfile(status) {
        let state = this.state;
        state["validation"] = status;
        this.setState({state}, () => this.login());
    }

    validateCredentials(){
        if(this.validatePassword() === false) {
            if(this.state.profileInfo.password.length < 3) {
                this.setState({errorMessage: "Passwords must be over 3 characters."});
            }
            else{
                this.setState({errorMessage: "Passwords must match"});
            }
            console.log("password error");
            return;
        }
        if(this.validateEmail() === false) {
            this.setState({errorMessage: "Please enter a valid email."});
            console.log("email error");
            return;
        }

        if(this.validateNickName() === false) {
            this.setState({errorMessage: "Nickname must be between 3 and 15 characters."});
            console.log("nickname error");
            return;
        }

        request(this.state.profileInfo,"register").then(serverResponse => {
            this.createProfile(serverResponse);
        });
    }

    validateNickName() {
        if(this.state.profileInfo.nickname.length < 3 || this.state.profileInfo.nickname.length > 15){
            return false;
        }
    }

    validateEmail() {
        let email = this.state.profileInfo.email;
        //let validation = /[\w.]+@[\w]+(.com|.org|.net|.edu|.gov)$/;
        let validation = /(?:[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        if(email === ""){
            return false;
        }
        if(!validation.test(email)) {
            console.log("validating email!");
            return false;
        }

        return true;
    }

    validatePassword() {
        if(this.state.profileInfo.password !== this.state.profileInfo.verifyPassword || this.state.profileInfo.password === "") {
            return false;
        }
        if(this.state.profileInfo.password.length < 3) {
            return false;
        }
        return true;
    }

    updateValidation(value) {
        let state = this.state;
        state["validation"] = value;
        this.setState({state}, () => this.createProfile());
    }

    updateValue(id, value) {
        let state = this.state;
        state.profileInfo[id] = value;
        this.setState({state});
    }

    updatePassword(password) {
        let state = this.state;
        state.profileInfo.password = password;
        this.setState({state});
    }

    updateVerifyPassword(password) {
        let state = this.state;
        state.profileInfo.verifyPassword = password;
        this.setState({state});
    }

    back2home(){
        let state = this.state;
        state.profileInfo.nickname = "";
        state.profileInfo.password = "";
        state.profileInfo.verifyPassword= "";
        state.profileInfo.email = "";
        state.validation = false;
        state.errorMessage = "";
        window.location.reload()
    }

    render() {
        let errorMessage;
        if(this.state.errorMessage !== ""){
            errorMessage = <Alert color="danger">{this.state.errorMessage}</Alert>
        }
        return (
            <div id="Register" style={{width: "600px", display: "inline-block"}}>
                <Card>
                    <div style={{width: "400px", margin: "auto"}}>
                        <Form>
                            <FormGroup>
                                <br/>
                                <Label for="nickname">Nickname</Label>
                                <Input type="text" placeholder="nickname" id="nickname" onChange={(input) => this.updateValue("nickname", input.target.value)}/>
                                <br/>
                                <Label for="password">Password</Label>
                                <Input type="password" placeholder="password" id="password" onChange={(input) => this.updatePassword(input.target.value)}/>
                                <br/>
                                <Label for="confirmPassword">Confirm Password</Label>
                                <Input type="password" placeholder="confirm password" id="confirmPassword" onChange={(input) => this.updateVerifyPassword(input.target.value)}/>
                                <br/>
                                <Label for="email">Email Address</Label>
                                <Input type="text" placeholder="email address" id="email" onChange={(input) => this.updateValue("email", input.target.value)}/>
                                <br/>
                                <Button color="success" onClick={this.validateCredentials}>REGISTER</Button>
                                {errorMessage}
                            </FormGroup>
                        </Form>
                    </div>
                </Card>
                <br/>
                <Button outline color="success" onClick={this.back2home.bind(this)}> Back </Button>
            </div>
        );
    }
}

export default Register;