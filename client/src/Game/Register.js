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
        var validation = /[\w.]+@[\w]+(.com|.org)$/;
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
        //TODO: Hash the given password for security
    }

    updateVerifyPassword(password) {
        let state = this.state;
        state.profileInfo.verifyPassword = password;
        this.setState({state});
        //TODO: Hash the given password verification for security
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