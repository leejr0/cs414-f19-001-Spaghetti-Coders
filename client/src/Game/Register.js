import React, {Component} from 'react';
import {Button, Card, CardBody, Input} from 'reactstrap';

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
            validation: false
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
            this.props.updateLogin(true);
        }
        else {
            //TODO: Display an error message that the credentials are incorrect
        }
    }

    createProfile(status) {
        let state = this.state;
        state["validation"] = status;
        this.setState({state}, () => this.login());
    }

    validateCredentials(){
        if(this.validatePassword() === false) {
            //TODO: Output an error seen by the user that the passwords aren't the same
            console.log("password error");
        }
        if(this.validateEmail() === false) {
            //TODO: Output an error seen by the user that the email isn't correctly formatted
            console.log("email error");
        }

        if(this.validateNickName() === false) {
            console.log("nickname error");
        }

        //TODO: Communicate with back-end to check if nickname is unique
        request(this.state.profileInfo,"register").then(serverResponse => {
            this.createProfile(serverResponse);
        });
    }

    validateNickName() {
        if(this.state.nickname.length < 3){
            //TODO: Output an error seen by the user that the nickname is invalid
        }
    }

    updateValidation(value) {
        let state = this.state;
        state["validation"] = value;
        this.setState({state}, () => this.createProfile());
    }

    validateEmail() {
        if(!this.state.email.includes("@") || this.state.email === ""){
            return false;
        }

        return true;
    }

    validatePassword() {
        if(this.state.password !== this.state.verifyPassword || this.state.password === "") {
            return false;
        }
        if(this.state.password.length < 3) {
            return false;
        }
        return true;
    }

    updateValue(id, value) {
        let state = this.state;
        state[id] = value;
        this.setState({state});
    }

    updatePassword(password) {
        let state = this.state;
        state.password = password;
        this.setState({state});
        //TODO: Hash the given password for security
    }

    updateVerifyPassword(password) {
        let state = this.state;
        state.verifyPassword = password;
        this.setState({state});
        //TODO: Hash the given password verification for security
    }

    render() {
        return (
            <div id="Register">
                <h5>Register with a new username, email, and password!</h5>
                <Input type="text" placeholder="nickname" onChange={(input) => this.updateValue("nickname", input.target.value)}/>
                <Input type="password" placeholder="password" onChange={(input) => this.updatePassword(input.target.value)}/>
                <Input type="password" placeholder="confirm password" onChange={(input) => this.updateVerifyPassword(input.target.value)}/>
                <Input type="text" placeholder="email address" onChange={(input) => this.updateValue("email", input.target.value)}/>
                <Button onClick={this.validateCredentials}>Submit</Button>
            </div>
        );
    }
}

export default Register;