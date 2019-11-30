import React, {Component} from 'react';
import {get, request} from "../api/api";
import {Alert, Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

class Invite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invitePlayer: false,
            nickname: this.props.nickname,
            playerSearch: {
                opponentFound: false,
                playerBlue: "",
                playerRed: this.props.nickname,
                errorMessage: "",
                invitationSent: false,
                nickname: ""
            }
        };


        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.searchOpponent = this.searchOpponent.bind(this);
        this.sendInvite = this.sendInvite.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.displayInvite = this.displayInvite.bind(this);
    }

    updateSearchValue(id, value) {
        let state = this.state;
        state.playerSearch[id] = value;
        state.playerSearch.nickname = value;
        state.playerSearch.opponentFound = false;
        this.setState({state});
    }

    searchOpponent(random) {
        if(this.state.playerSearch.playerBlue === this.state.nickname) {
            let state = this.state;
            state.playerSearch.errorMessage = "You can't challenge yourself, silly!";
            state.playerSearch.opponentFound = false;
            this.setState({state});
        }
        else if(this.state.playerSearch.playerBlue === "") {
            let state = this.state;
            state.playerSearch.errorMessage = "Please type in a player to search.";
            state.playerSearch.opponentFound = false;
            this.setState({state});
        }
        else if(random) {
            get("getRandomPlayer").then(serverResponse => {
                let state = this.state;
                state.playerSearch.playerBlue = serverResponse.playerBlue;
                state.playerSearch.errorMessage = "";
                state.playerSearch.invitationSent = false;
                this.setState({state});
            });
        }
        else {
            request(this.state.playerSearch, "searchPlayer").then(serverResponse => {
                let state = this.state;
                state.playerSearch.invitationSent = false;
                if(!serverResponse){
                    state.playerSearch.errorMessage = this.state.playerSearch.playerBlue + " player not found!";
                    state.playerSearch.opponentFound = false;
                }
                else{
                    state.playerSearch.opponentFound = serverResponse;
                    state.playerSearch.errorMessage = "";
                }

                this.setState({state});
            });
        }
    }

    sendInvite() {
        if(this.state.playerSearch.opponentFound === false) {
            let state = this.state;
            state.playerSearch.errorMessage = "Please search for a player above.";

            this.setState({state});
        }
        else {
            request(this.state.playerSearch, "invitePlayer").then(serverResponse => {
                let state = this.state;
                if (!serverResponse) {
                    state.playerSearch.errorMessage = "Invitation failed!";
                    state.playerSearch.invitationSent = false;
                    this.setState({state});
                }
                else {
                    state.playerSearch.errorMessage = "";
                    state.playerSearch.invitationSent = true;
                    this.props.startGame.playerRed = this.state.playerRed;
                    this.props.startGame.playerBlue = this.state.playerBlue;
                    //Temporary callback to show functionality
                    // this.setState({state}, () => {
                    //     this.props.beginGame();
                    // });
                }
                this.setState({state});
            });
        }
    }

    displayInvite() {
        let errorMessage;
        if(this.state.playerSearch.errorMessage !== ""){
            errorMessage = <Alert color="danger">{this.state.playerSearch.errorMessage}</Alert>
        }
        let foundOpponent = <p style={{textAlign: "center"}}>Select your opponent!</p>;
        if(this.state.playerSearch.opponentFound) {
            foundOpponent = <p style={{textAlign: "center"}}>Your opponent, {this.state.playerSearch.playerBlue}, has been found!</p>
        }
        let invitationSent = <p> </p>;
        if(this.state.playerSearch.invitationSent) {
            invitationSent = <Alert color="success">Your invitation was successfully sent!</Alert>
        }
        // TODO: Center top text in Modal
        return (
            <Modal isOpen={this.state.invitePlayer}>
                <ModalHeader><h5 style={{textAlign: "center"}}>Invite your friends or get a random opponent!</h5></ModalHeader>
                <ModalBody>
                    {foundOpponent}
                    <Input type="text" onChange={(input) => this.updateSearchValue("playerBlue", input.target.value)}/>
                    <br/>
                    <Button onClick={() => this.searchOpponent(false)}>SEARCH</Button>
                    <Button className="float-right" onClick={() => this.searchOpponent(true)}>RANDOM OPPONENT</Button>
                    <br/>
                    <br/>
                    {errorMessage}
                    {invitationSent}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.sendInvite}>INVITE</Button>
                    <Button onClick={this.toggleModal}>EXIT</Button>
                </ModalFooter>
            </Modal>
        );
    }

    toggleModal() {
        let state = this.state;
        state.invitePlayer = !state.invitePlayer;
        this.setState({state});
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggleModal}>Invite</Button>
                {this.displayInvite()}
            </div>
        );
    }
}
export default Invite;