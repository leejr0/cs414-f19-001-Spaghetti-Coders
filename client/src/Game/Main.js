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
        if(!this.state.display) {
            return (<h5></h5>);
        }

        return (
            <div>
                <h1 style={{color: "white", textAlign: "left"}}>JUNGLE</h1>
                <h5 style={{color: "white"}}>Here's the board! Make a move!</h5>
                <div id="GamePage">
                    <GamePage/>
                </div>
            </div>
        );
    }
}

export default Main;