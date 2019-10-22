import React, {Component} from 'react';
import GamePage from "./GamePage";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: true
        }
    }

    render() {
        if(!this.state.display) {
            return (<h5></h5>);
        }

        return (
            <div>
                <h5>This is the home page.</h5>
                <h5>The game lives here for now.</h5>
                <div id="GamePage">
                    <GamePage/>
                </div>
            </div>
        );
    }
}

export default Main;