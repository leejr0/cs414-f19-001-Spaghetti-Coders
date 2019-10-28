import React, {Component} from 'react';
import { Button, Collapse, Jumbotron } from 'reactstrap';

class Rules extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapse: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    rules() {
        //MODIFY RULES BELOW
        return <div>
            <h5>Rule 1</h5><p>Description 1..........................................................................</p><hr/>
            <h5>Rule 2</h5><p>Description 2..........................................................................</p><hr/>
            <h5>Rule 3</h5><p>Description 3..........................................................................</p><hr/>
            <h5>Rule 4</h5><p>Description 4..........................................................................</p><hr/>
            <h5>Rule 5</h5><p>Description 5..........................................................................</p><hr/>
        </div>;
    }

    render() {
        return <div>
            <Button color="secondary" onClick={this.toggle}>RULES</Button>
            <Collapse isOpen={this.state.collapse}><Jumbotron style={{backgroundColor: '323031', color: "white"}}>
                <h3 style={{color: "ecc530"}}>The Rules of Jungle</h3>
                {this.rules()}
            </Jumbotron></Collapse></div>
    }
}

export default Rules