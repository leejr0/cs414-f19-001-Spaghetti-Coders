import React, {Component} from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {request} from "../api/api";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nickname: this.props.nickname,
            password: "",
            ratio: null,
            wins: null,
            losses: null,
            email: "",
            gotProfile: false
        };

        this.retrieveInformation = this.retrieveInformation.bind(this);
    }

    retrieveInformation() {
        request(this.state,"retrieveProfile").then(profile => {
            console.log(profile);
            let state = this.state;
            state.nickname = profile.nickname;
            state.password = profile.password;
            state.ratio = profile.ratio;
            state.wins = profile.wins;
            state.losses = profile.losses;
            state.email = profile.email;
            state.gotProfile = true;
            this.setState( {state});
        });
    }

    render() {
        if(this.state.gotProfile === false) {
            this.retrieveInformation();
        }

        return (
            <Container style={{display: 'inline-block'}}>
                <h2>This is {this.state.nickname}'s profile!</h2>
                <p>You've won {this.state.wins} games, and you have lost {this.state.losses}</p>
                <p>Your win/loss ratio {this.state.ratio}</p>
                <p>{this.state.email}</p>
            </Container>
        );
    }
}

export default Profile;