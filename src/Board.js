import React from 'react';
import board from './board.png';
import './Board.css';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {x: 0, y: 0};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {

        this.setState(

            this.posicionamento(e.screenX,e.screenY)
        );

    }
    posicionamento(x,y) {
        x = Math.trunc((-window.innerWidth/2+x+450)/254);
        y = Math.trunc((-window.innerHeight/2+y+450)/256);
        return {x:x,y:y};
    }


    render() {
        return (
            <div className="Board">
                <header className="Board-header">
                    <img className="Board-chess" src={board} onClick={this.handleClick}/>
                    <h1>X: {this.state.x}</h1>
                    <h1>Y: {this.state.y}</h1>
                </header>
            </div>
        );
    }

}

export default Board;