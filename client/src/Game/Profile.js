import React, {Component} from 'react';
import {Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, Input, Form, FormGroup, Label, Row, Col, Alert} from 'reactstrap'
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
            gotProfile: false,
            newPassword: null,
            newEmail: null,
            errorMessage: null,
            confirmMessage: false,
        };

        this.retrieveInformation = this.retrieveInformation.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }

    retrieveInformation() {
        request(this.state,"retrieveProfile").then(profile => {
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

    validateEmail() {
        if (this.newEmail != null){
            let email = this.state.newEmail;
            let validation = /[\w.]+@[\w]+(.com|.org)$/;
            if (!email.includes("@") || email === "") {
                return false;
            }
            if (!validation.test(email)) {
                console.log("validating email!");
                return false;
            }
        }
        return true;
    }

    update(){
        if(this.validateEmail() === false) {
            this.setState({errorMessage: "Please enter a valid email."});
            console.log("email error");
            return;
        }
        request(this.state,"updateProfile").then(profile => {
            let state = this.state;
            state.password = profile.password;
            state.email = profile.email;
            state.gotProfile = true;
            state.errorMessage = null;
            this.setState( {state});
        });
    }

    updateValue(id, value) {
        let state = this.state;
        state[id] = value;
        this.setState({state});
    }

    dismissConfirmationMessage() {
        let state = this.state;
        state.confirmMessage = false;
        this.setState({state});
    }

    confirmationMessage() {
        return <Modal isOpen = {this.state.confirmMessage}>
            <ModalHeader>Confirm Unregister</ModalHeader>
            <ModalBody>Are you sure you want to unregister? All Profile information will be lost.</ModalBody>
            <ModalFooter>
                <Button outline color="success" style={{float: 'left', padding: '.5rem'}} onClick={this.unregister.bind(this)}>Unregister</Button>
                <Button outline color="success" style={{float: 'right', padding: '.5rem'}} onClick={this.dismissConfirmationMessage.bind(this)}>Cancel</Button>
            </ModalFooter>
        </Modal>
    }

    render() {
        if(this.state.gotProfile === false) {
            this.retrieveInformation();
        }
        let errorMessage;
        if(this.state.errorMessage !== null){
            errorMessage = <Alert color="danger">{this.state.errorMessage}</Alert>
        }

        let unregisterButton = <Button outline color="success" style={{float: 'right', padding: '.5rem'}} onClick={() => this.setState({confirmMessage: true})}>Unregister</Button>;
        let updateButton = <Button outline color="success" style={{float: 'left', padding: '.5rem'}} onClick={this.update.bind(this)}>Update Info</Button>;

        return (
            <div style={{display: "inline-block", width: "1200px"}}>
                <div>
                    <Card>
                        <Container>
                            <Row>
                                <Col xs="6">

                                    <Form>
                                        <br></br>
                                        <FormGroup style={{padding: '.5rem', width: "550px"}}>
                                            <Label style={{float: 'left'}}>Nickname</Label>
                                            <br/>
                                            <Label style={{float: 'left'}}>{this.state.nickname}</Label>
                                            <br></br>
                                            <br/>
                                            <Label style={{float: 'left'}}>Password</Label>
                                            <Input type="password" placeholder={"********"} onChange={(input) => this.updateValue("newPassword", input.target.value)}/>
                                            <br></br>
                                            <Label style={{float: 'left'}}>Email</Label>
                                            <Input type="email" placeholder={this.state.email} onChange={(input) => this.updateValue("newEmail", input.target.value)}/>
                                        </FormGroup>
                                    </Form>
                                </Col>
                                <Col xs="6">

                                    <br></br>
                                    <div style={{padding: '.5rem', float: 'left'}}>
                                    <h2 style={{float: 'left'}}>Wins: {this.state.wins}</h2>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                    <h2 style={{float: 'left'}}>Losses: {this.state.losses}</h2>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                    <h2 style={{float: 'left'}}>W/L Ratio: {this.state.ratio}</h2>
                                    </div>
                                </Col>
                            </Row>
                        </Container>

                    </Card>
                    <br></br>
                    {this.confirmationMessage()}
                    {errorMessage}
                    {updateButton}
                    {unregisterButton}
                </div>

            </div>
        );
    }
}

export default Profile;