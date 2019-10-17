import React, {Component} from 'react';
import {Button, Card, CardBody, Input} from 'reactstrap';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nickname: "",
            password: "",
            verifyPassword: "",
            email: ""
        };

        this.createProfile = this.createProfile.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.updateVerifyPassword = this.updateVerifyPassword.bind(this);

        this.validateNickName = this.validateNickName.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }

    createProfile() {
        if(this.validatePassword() === false) {
            //TODO: Output an error seen by the user that the passwords aren't the same
            console.log("wow");
        }
        if(this.validateNickName() === false) {
            //TODO: Output an error seen by the user that the username is already taken
        }
        if(this.validateEmail() === false) {
            //TODO: Output an error seen by the user that the email isn't correctly formatted
        }

        else {
            //TODO: Communicate with the back-end to create a new user
        }
    }

    validateNickName() {
        if(this.state.nickname === ""){
            return false;
        }
        //TODO: Communicate with back-end to check if nickname is unique
        return true;
    }

    validateEmail() {
        if(!this.state.email.includes("@") || this.state.email === ""){
            return false;
        }

        return true;
    }

    validatePassword() {
        if(this.state.password !== this.state.verifyPassword || this.state.password === ""){
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
                <Button onClick={this.createProfile}>Submit</Button>
            </div>
        );
    }
}

export default Register;