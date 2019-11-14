import React, {Component} from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, Input, InputGroup, InputGroupAddon } from 'reactstrap'
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

    unregister() {
        request(this.state, "unregister").then(serverResponse => {
            if (serverResponse) {
                let state = this.state;
                state.nickname = null;
                state.password = null;
                state.ratio = null;
                state.wins = null;
                state.losses = null;
                state.email = null;
                state.gotProfile = false;
                this.setState(({state}, window.location.reload()));
            }
        });
    }

    render() {
        if(this.state.gotProfile === false) {
            this.retrieveInformation();
        }

        let unregisterButton = <Button outline color="success" style={{float: 'right', padding: '.5rem'}} onClick={this.unregister.bind(this)}>Unregister</Button>;

        return (
            <div>
                <div>
                    <h4 style={{float: 'left'}}>Search for another player:</h4>
                    <InputGroup>
                        <InputGroupAddon addonType="append">
                            <Button outline color="success">Search</Button>
                        </InputGroupAddon>
                        <Input/>
                    </InputGroup>
                    <br/>
                </div>
                <div>
                    <Card>
                        <div align={"left"} style={{ padding: '.5rem' }}>
                        <h2>Player: {this.state.nickname}</h2>
                        <h3>Wins: {this.state.wins}</h3>
                        <h3>Losses: {this.state.losses}</h3>
                        <h3>W/L Ratio: {this.state.ratio}</h3>
                        <h3>Email: {this.state.email}</h3>
                        </div>
                        </Card>
                    {unregisterButton}
                </div>

            </div>
        );
    }
}

export default Profile;