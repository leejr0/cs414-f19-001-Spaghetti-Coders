import React, {Component} from 'react';
import GamePage from "./GamePage";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: true,
            nickname: ""
        }
    }

    render() {
        if(this.state.nickname === "") {
            this.setState({nickname: this.props.nickname});
        }
        console.log(this.state.nickname);
        if(!this.state.display) {
            return (<h5></h5>);
        }

        return (
            <div>
                <h5>{this.state.display}</h5>
                <h5>{this.state.nickname}</h5>
                <h5 style={{color: "white"}}>This is the home page.</h5>
                <h5 style={{color: "white"}}>The game lives here for now. {this.state.nickname}</h5>
                <div id="GamePage">
                    <GamePage/>
                </div>
            </div>
        );
    }
}

export default Main;