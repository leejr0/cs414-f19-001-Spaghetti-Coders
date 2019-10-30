import React, {Component} from 'react';
import { Jumbotron } from 'reactstrap';

class Rules extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

    }

    rules() {
        //MODIFY RULES BELOW
        return <div style={{textAlign: 'left'}}>
            <h5 style={{color: "ecc530"}}>Pieces</h5>
            <p>Each player has eight pieces, different animals, with different degrees of power.</p>
            <p>Rat=1, Cat=2, Wolf=3, Dog=4, Leopard=5, Tiger=6, Lion=7, Elephant=8</p>
                <hr/>
            <h5 style={{color: "ecc530"}}>Object of the Game</h5>
            <p>To win the game, one player must successfully move any animal into the Den of the opponent.</p>
                <hr/>
            <h5 style={{color: "ecc530"}}>Movement</h5>
            <p>All pieces have the same basic move, although some have special powers (described below). The basic move is just one space either forward, backward, left or right. The pieces never move diagonally.</p>
            <p>The Rat, although it is the least powerful piece, has the power to capture the Elephant. The Elephant can not capture the Rat.</p>
            <p>The Rat, and no other animal, can move freely in the water. It can not, however, attack the Elephant from the water.</p>
            <p>Both the Lion and the Tiger can jump over the water, moving from one bank straight forward, backward, left or right (like a rook in chess) to the first square of dry land on the other side. They may capture in this move as well. The Lion and Tiger may not, however, jump over a rat if it is in the way, in the water.</p>
                <hr/>
            <h5 style={{color: "ecc530"}}>Capturing</h5>
            <p>An animal is captured (or “eaten”) by an opposing animal moving onto its square, as in chess or Stratego. But the attacking animal must be of equal or higher power than the one being captured. For instance, the Tiger (6) can capture the Tiger (6), Leopard (5) or Dog (4), but the Dog can not capture the Leopard or Tiger.</p>
                <hr/>
            <h5 style={{color: "ecc530"}}>Traps</h5>
            <p>Each side has three Trap squares surrounding its Den. A player may move on and off of his own Trap squares with no effect. If, however, a player moves onto the opponent’s trap square, that piece loses all of its power, and may be captured by any of the defending pieces.</p>
                <hr/>
            <h5 style={{color: "ecc530"}}>The Den</h5>
            <p>Animals are not allowed to move into their own Dens. When an animal moves into the opponent’s Den, it has won the game.</p>
                <hr/>
            <a href='http://ancientchess.com/page/play-doushouqi.htm'>[from ancientchess.com/page/play-doushouqi.htm]</a>
        </div>;
    }

    render() {
        return <div>
            <Jumbotron style={{backgroundColor: '323031', color: "white"}}>
                <h3 style={{color: "ecc530"}}>THE LAW OF THE JUNGLE [RULES]</h3>
                {this.rules()}
            </Jumbotron></div>
    }
}

export default Rules