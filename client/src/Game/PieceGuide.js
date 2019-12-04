import React, {Component} from 'react';
import {Button, Table} from 'reactstrap';

import bRat from "./assets/40BR.png";
import wRat from "./assets/40WR.png";
import bCat from "./assets/40BC.png";
import wCat from "./assets/40WC.png";
import bWolf from "./assets/40BW.png";
import wWolf from "./assets/40WW.png";
import bDog from "./assets/40BD.png";
import wDog from "./assets/40WD.png";
import bPanther from "./assets/40BP.png";
import wPanther from "./assets/40WP.png";
import bTiger from "./assets/40BT.png";
import wTiger from "./assets/40WT.png";
import bLion from "./assets/40BL.png";
import wLion from "./assets/40WL.png";
import bElephant from "./assets/40BE.png";
import wElephant from "./assets/40WE.png";

class Rules extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            playerBlue: this.props.playerBlue,
            playerRed: this.props.playerRed
        };

    }

    toggleShow() {
        this.setState({show: !this.state.show});
    }

    pieceTable() {
        return <div style={{textAlign: 'left'}}>
            <Table>
                <thead>
                <tr>
                    <th>Rank/Type</th>
                    <th>Player 1 (Blue)</th>
                    <th>Player 2 (Red)</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>1</th>
                    <td style={{color: 'blue'}}><img  src={wRat} alt={"White Rat"}/>{this.state.playerBlue + '\'s Rat'}</td>
                    <td style={{color: 'red'}}><img  src={bRat} alt={"Black Rat"}/>{this.state.playerRed + '\'s Rat'}</td>
                </tr>
                <tr>
                    <th>2</th>
                    <td style={{color: 'blue'}}><img  src={wCat} alt={"White Cat"}/>{this.state.playerBlue + '\'s Cat'}</td>
                    <td style={{color: 'red'}}><img  src={bCat} alt={"Black Cat"}/>{this.state.playerRed + '\'s Cat'}</td>
                </tr>
                <tr>
                    <th>3</th>
                    <td style={{color: 'blue'}}><img  src={wWolf} alt={"White Wolf"}/>{this.state.playerBlue + '\'s Wolf'}</td>
                    <td style={{color: 'red'}}><img  src={bWolf} alt={"Black Wolf"}/>{this.state.playerRed + '\'s Wolf'}</td>
                </tr>
                <tr>
                    <th>4</th>
                    <td style={{color: 'blue'}}><img  src={wDog} alt={"White Dog"}/>{this.state.playerBlue + '\'s Dog'}</td>
                    <td style={{color: 'red'}}><img  src={bDog} alt={"Black Dog"}/>{this.state.playerRed + '\'s Dog'}</td>
                </tr>
                <tr>
                    <th>5</th>
                    <td style={{color: 'blue'}}><img  src={wPanther} alt={"White Panther"}/>{this.state.playerBlue + '\'s Panther'}</td>
                    <td style={{color: 'red'}}><img  src={bPanther} alt={"Black Panther"}/>{this.state.playerRed + '\'s Panther'}</td>
                </tr>
                <tr>
                    <th>6</th>
                    <td style={{color: 'blue'}}><img  src={wTiger} alt={"White Tiger"}/>{this.state.playerBlue + '\'s Tiger'}</td>
                    <td style={{color: 'red'}}><img  src={bTiger} alt={"Black Tiger"}/>{this.state.playerRed + '\'s Tiger'}</td>
                </tr>
                <tr>
                    <th>7</th>
                    <td style={{color: 'blue'}}><img  src={wLion} alt={"White Lion"}/>{this.state.playerBlue + '\'s Lion'}</td>
                    <td style={{color: 'red'}}><img  src={bLion} alt={"Black Lion"}/>{this.state.playerRed + '\'s Lion'}</td>
                </tr>
                <tr>
                    <th>8</th>
                    <td style={{color: 'blue'}}><img  src={wElephant} alt={"White Elephant"}/>{this.state.playerBlue + '\'s Elephant'}</td>
                    <td style={{color: 'red'}}><img  src={bElephant} alt={"Black Elephant"}/>{this.state.playerRed + '\'s Elephant'}</td>
                </tr>
                <tr>
                    <th>TRAP</th>
                    <td style={{color: 'blue'}}>
                        <td style={{height: '30px', width: '30px', border: '2px solid #000078', backgroundColor: 'bbbbbb'}}></td>{this.state.playerBlue + '\'s Trap'}
                    </td>
                    <td style={{color: 'red'}}>
                        <td style={{height: '30px', width: '30px', border: '2px solid #8e2914', backgroundColor: 'bbbbbb'}}></td>{this.state.playerRed + '\'s Trap'}
                    </td>
                </tr>
                <tr>
                    <th>DEN</th>
                    <td style={{color: 'blue'}}>
                        <td style={{height: '30px', width: '30px', border: '1px solid #1e4d2b', backgroundColor: '666666'}}></td>{this.state.playerBlue + '\'s Den'}
                    </td>
                    <td style={{color: 'red'}}>
                        <td style={{height: '30px', width: '30px', border: '1px solid #1e4d2b', backgroundColor: '666666'}}></td>{this.state.playerRed + '\'s Den'}
                    </td>
                </tr>
                </tbody>
            </Table>
        </div>;
    }

    render() {
        return  <div>
            <Button onClick={this.toggleShow.bind(this)}>PIECE GUIDE</Button>
            {this.state.show ? this.pieceTable() : null}
        </div>
    }
}

export default Rules