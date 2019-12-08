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
            updateBool: false,
        };

        this.retrieveInformation = this.retrieveInformation.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }

    retrieveInformation() {
        request(this.state,"retrieveProfile").then(profile => {
            let state = this.state;
            state.nickname = profile.nickname;
            state.password = profile.password;
            state.ratio = profile.ratio.toFixed(2);
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
        if (this.state.newEmail !== null){
            let email = this.state.newEmail;
            //let validation = /[\w.]+@[\w]+(.com|.org|.edu|.net|.gov)$/;
            let validation = /(?:[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
            if (!email.includes("@") || email === "") {
                return false;
            }
            if (!validation.test(email)) {
                return false;
            }
        }else{
            return true;
        }
        return true;
    }

    update(){
        if(this.validateEmail() === false) {
            this.setState({errorMessage: "Please enter a valid email."});
            return;
        }
        request(this.state,"updateProfile").then(profile => {
            let state = this.state;
            state.password = this.state.newPassword;
            state.email = this.state.newEmail;
            state.gotProfile = true;
            state.errorMessage = null;
            state.updateBool = false;
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

    updateModal(){
        let errorMessage;
        if(this.state.errorMessage !== null){
            errorMessage = <Alert color="danger">{this.state.errorMessage}</Alert>
        }
        return <Modal isOpen = {this.state.updateBool}>
            <ModalHeader>To change email or password, enter new information below and click submit</ModalHeader>
            <Form>
                <br></br>
                <FormGroup style={{padding: '.5rem', width: "400px"}}>
                    <Label style={{float: 'left'}}>New Password:</Label>
                    <Input type="password" placeholder={"new password"} onChange={(input) => this.updateValue("newPassword", input.target.value)}/>
                    <br></br>
                    <Label style={{float: 'left'}}>New Email:</Label>
                    <Input type="email" placeholder={"new email"} onChange={(input) => this.updateValue("newEmail", input.target.value)}/>
                </FormGroup>
                {errorMessage}
            </Form>
                <ModalFooter>
                    <Button color="success" style={{float: 'right', padding: '.5rem'}} onClick={this.update.bind(this)}>Submit</Button>
                    <Button outline color="success" style={{float: 'left', padding: '.5rem'}} onClick={this.dismissUpdate.bind(this)}>Back</Button>
                </ModalFooter>
        </Modal>
    }

    dismissUpdate(){
        let state = this.state;
        state.updateBool = false;
        this.setState({state});
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
        let updateButton = <Button outline color="success" style={{float: 'left', padding: '.5rem'}} onClick={() => this.setState({updateBool:true})}>Update Info</Button>;

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
                                            <h3 style={{float: 'left'}}>Nickname: {this.state.nickname}</h3>
                                            <br/>
                                            <br></br>
                                            <br/>
                                            <br/>
                                            <h3 style={{float: 'left'}}>Email: {this.state.email}</h3>
                                            <br></br>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <h3 style={{float: 'left'}}>Password: ***********</h3>
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
                    {updateButton}
                    {unregisterButton}
                    {this.updateModal()}
                </div>

            </div>
        );
    }
}

export default Profile;
