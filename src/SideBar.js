import React from "react";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import board from "./images/board.png";
import hat from "./images/hat_12-512.png";
import hatIa from "./images/hatIa.png";
import hatMov from "./images/hatmov.png";
import empty from "./images/empty.png";
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core/styles";

const styles = {
    PieceButtonNP: {
        background: 'linear-gradient(45deg, #FF8E53 30%, #2196F3 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px'
    },
    PieceButtonP: {
        background: 'linear-gradient(45deg, #2196F3 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px'
    },
    paper: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
    },
    Board: {
        textAlign: 'center'
    },
    BoardHeader: {
        backgroundColor: '#61dafb',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
    },
    BoardChess: {
        height: '900px',
        width: '900px'

    },
    Hat: {
        position: 'absolute',
        height: '100px',
        width: '100px'

    }
};

// 1200px X 1200px
// 254px/quadrado
// (346,346)       (600,346)       (854,346)
//         (473,473)       (727,473)
// (346,600)       (600,600)       (854,600)
//         (473,727)       (727,727)
// (346,854)       (600,854)       (854,854)
//

class SideBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            player: {score: 100},
            iA: {score: 0},
            position: {i: 0, j: 0, isExternalMatrix: true},
            externalMatrix: this.matrizInicialExterna(),
            internalMatrix: this.matrizInicialInterna(),
            imageResolution: {
                height: (window.innerHeight - 10) + "px",
                width: (window.innerHeight - 10) + "px",
                position: "absolute",
                left: window.innerWidth * 0.5 - (window.innerHeight - 10) * 0.5 + "px",
                top: window.innerHeight * 0.5 - (window.innerHeight - 10) * 0.5 + "px"
            },

            movements: [],
            ultimoClick: null,
            isPuttingPiece: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
    }

    getAllEmptySpaces(A = this.state.externalMatrix, B = this.state.internalMatrix) {
        let spaces = [];
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++) {
                if (A[i][j].player == 0)
                    spaces.push({i: i, j: j, isExternalMatrix: true, player: 3});
                if (i < 2 && j < 2)
                    if (B[i][j].player == 0)
                        spaces.push({i: i, j: j, isExternalMatrix: false, player: 3});
            }
        return spaces;

    }

    cancelAllMovements(A = this.state.externalMatrix, B = this.state.internalMatrix){
        for(let i = 0; i < 3; i++)
            for(let j = 0; j < 3; j++){
                A[i][j].player = A[i][j].player === 3 ? 0 : A[i][j].player;

                if(i < 2 && j < 2)
                    B[i][j].player = B[i][j].player === 3 ? 0 : B[i][j].player;
            }
        return {externalMatrix: A, internalMatrix: B};
    }

    pieceOptions(){
        this.updateMatrix(this.getAllEmptySpaces());
    }
    cancel(){
        this.setState(this.cancelAllMovements());
    }

    cloneMatrix(A) {
        let newMatrix = [];
        for (let i = 0; i < A.length; i++) {
            newMatrix.push([]);
            for (let j = 0; j < A[i].length; j++)
                newMatrix[i].push(A[i][j].player);
        }
        return newMatrix;
    }

    isPossible(i, j, isExternalMatrix) {
        if (i < 0 || j < 0) return false;
        if (i > 2 || j > 2) return false;
        if (!isExternalMatrix && (i > 1 || j > 1)) return false;
        return true
    }

    nextMoves(i, j, externalPlayerMatrix, internalPlayerMatrix, isExternalMatrix) {
        let a = [];
        let A = externalPlayerMatrix;
        let B = internalPlayerMatrix;
        let player;

        if (isExternalMatrix)
            player = A[i][j];
        else
            player = B[i][j];


        if (player !== 0)
            for (let k = 0; k < 2; k++)
                for (let l = 0; l < 2; l++) {
                    if (isExternalMatrix) {

                        if (this.isPossible(i - k, j - l, false)) {
                            switch (B[i - k][j - l]) {
                                case 0:
                                    a.push({
                                        i: i - k,
                                        j: j - l,
                                        player: (player === 2 ? 3 : player),
                                        isExternalMatrix: false
                                    });
                                    break;
                                case player:
                                    break;
                                default:
                                    let auxi = i - k, auxj = j - l;

                                    if (i === auxi && j === auxj && this.isPossible(i + 1, j + 1, true)) {
                                        if (A[i + 1][j + 1] === 0)
                                            a.push({
                                                i: i + 1,
                                                j: j + 1,
                                                player: (player === 2 ? 3 : player),
                                                isExternalMatrix: true
                                            });
                                    } else if (i - 1 === auxi && j === auxj && this.isPossible(i - 1, j + 1, true)) {
                                        if (A[i - 1][j + 1] === 0)
                                            a.push({
                                                i: i - 1,
                                                j: j + 1,
                                                player: (player === 2 ? 3 : player),
                                                isExternalMatrix: true
                                            });
                                    } else if (i - 1 === auxi && j - 1 === auxj && this.isPossible(i - 1, j - 1, true)) {
                                        if (A[i - 1][j - 1] === 0)
                                            a.push({
                                                i: i - 1,
                                                j: j - 1,
                                                player: (player === 2 ? 3 : player),
                                                isExternalMatrix: true
                                            });
                                    } else if (i === auxi && j - 1 === auxj && this.isPossible(i + 1, j - 1, true)) {
                                        if (A[i + 1][j - 1] === 0)
                                            a.push({
                                                i: i + 1,
                                                j: j - 1,
                                                player: (player === 2 ? 3 : player),
                                                isExternalMatrix: true
                                            });
                                    }
                            }
                        }

                    } else if (this.isPossible(i + k, j + l, true))
                        switch (A[i + k][j + l]) {
                            case 0:
                                a.push({
                                    i: i + k,
                                    j: j + l,
                                    player: (player === 2 ? 3 : player),
                                    isExternalMatrix: true
                                });
                                break;
                            case player:
                                break;
                            default:
                                let auxi = i + k, auxj = j + l;
                                if (i + 1 === auxi && j + 1 === auxj && this.isPossible(i + 1, j + 1, false)) {
                                    if (B[i + 1][j + 1] === 0)
                                        a.push({
                                            i: i + 1,
                                            j: j + 1,
                                            player: (player === 2 ? 3 : player),
                                            isExternalMatrix: false
                                        });
                                } else if (i === auxi && j + 1 === auxj && this.isPossible(i - 1, j + 1, false)) {
                                    if (B[i - 1][j + 1] === 0)
                                        a.push({
                                            i: i - 1,
                                            j: j + 1,
                                            player: (player === 2 ? 3 : player),
                                            isExternalMatrix: false
                                        });
                                } else if (i === auxi && j === auxj && this.isPossible(i - 1, j - 1, false)) {
                                    if (B[i - 1][j - 1] === 0)
                                        a.push({
                                            i: i - 1,
                                            j: j - 1,
                                            player: (player === 2 ? 3 : player),
                                            isExternalMatrix: false
                                        });
                                } else if (i + 1 === auxi && j === auxj && this.isPossible(i + 1, j - 1, false)) {
                                    if (A[i + 1][j - 1] === 0)
                                        a.push({
                                            i: i + 1,
                                            j: j - 1,
                                            player: (player === 2 ? 3 : player),
                                            isExternalMatrix: false
                                        });
                                }
                        }
                }
        return a;
    }

    cleanMoves(movements) {
        for (let k = 0; k < movements.length; k++)
            movements[k].player = 0;
        let newMatrix = this.updateMatrix(movements);
        this.setState(
            {
                externalMatrix: newMatrix.externalMatrix,
                internalMatrix: newMatrix.internalMatrix,
                movements: []
            },
        );

    }

    isMoveInVector(movement, movements) {
        for (let k = 0; k < movements.length; k++)
            if (movements[k].i === movement.i && movements[k].j === movement.j && movement.isExternalMatrix === movements[k].isExternalMatrix)
                return movements[k];
        return null;
    }

    handleClick(e, a = this.state.externalMatrix, b = this.state.internalMatrix, movements = this.state.movements, ultimo = this.state.ultimoClick) {
        // B[i][j] = {
        //     player: 2,
        //     position: {
        //         left: x_, top: y_, height: "100px",
        //         width: "100px", position: "absolute"
        //     }
        // };

        let position = this.posicionamento(e.clientX, e.clientY);
        let d = this.cloneMatrix(a);
        let c = this.cloneMatrix(b);

        let mov = this.isMoveInVector(position, movements);
        if (mov != null) {
            mov = {i: mov.i, j: mov.j, isExternalMatrix: mov.isExternalMatrix, player: ultimo.player};
            ultimo = {i: ultimo.i, j: ultimo.j, isExternalMatrix: ultimo.isExternalMatrix, player: 0};
            movements.push(ultimo);
        }

        if (movements.length > 0) {
            this.cleanMoves(movements);
            d = this.cloneMatrix(a);
            c = this.cloneMatrix(b);
        }

        if (mov != null) {
            let newMatrix = this.updateMatrix([mov]);
            this.setState({
                externalMatrix: newMatrix.externalMatrix,
                internalMatrix: newMatrix.internalMatrix,
                ultimoClick: null
            });
            return;
        }

        let nextMovements = this.nextMoves(position.i, position.j, d, c, position.isExternalMatrix);
        let newMatrix = this.updateMatrix(nextMovements, a, b);

        this.setState(
            {
                position: position,
                externalMatrix: newMatrix.externalMatrix,
                internalMatrix: newMatrix.internalMatrix,
                movements: nextMovements,
                ultimoClick: {
                    i: position.i,
                    j: position.j,
                    isExternalMatrix: position.isExternalMatrix,
                    player: position.isExternalMatrix ? d[position.i][position.j] : c[position.i][position.j]
                }
            },
        );

    }

    buttonClick() {
        if(this.state.isPuttingPiece) this.cancel();
        else this.pieceOptions();
        this.setState(state => ({isPuttingPiece: !state.isPuttingPiece}))
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Drawer anchor="left" variant="permanent" classes={{paper: classes.paper}}>
                    <h2>Jogador</h2>
                    <Divider/>
                    <h3>Pontuação: {this.state.player.score} </h3>
                    <Divider/>
                    <h2>IA</h2>
                    <Divider/>
                    <h3>Pontuação: {this.state.iA.score} </h3>
                    <Divider/>
                    <h2>Posição</h2>
                    <Divider/>
                    <h3>Matriz = ({this.state.position.i},{this.state.position.j})</h3>
                    <h3>{this.state.position.isExternalMatrix ? "Externo" : "Interno"}</h3>

                    {this.state.isPuttingPiece ?
                        (<Button className={classes.PieceButtonP} onClick={this.buttonClick}>Cancelar</Button>) :
                        (<Button className={classes.PieceButtonNP} onClick={this.buttonClick}>Colocar Peça</Button>)}


                </Drawer>
                <div className={classes.Board}>
                    <header className={classes.BoardHeader}>
                        <img className="Board-chessA" style={this.state.imageResolution} src={board} alt={"tabuleiro"}/>
                        <img
                            src={[empty, hatIa, hat, hatMov][this.state.externalMatrix[0][0].player]}
                            alt={"hat"}
                            style={this.state.externalMatrix[0][0].position}/>
                        <img
                            src={[empty, hatIa, hat, hatMov][this.state.externalMatrix[0][1].player]}
                            alt={"hat"}
                            style={this.state.externalMatrix[0][1].position}/>
                        <img
                            src={[empty, hatIa, hat, hatMov][this.state.externalMatrix[0][2].player]}
                            alt={"hat"}
                            style={this.state.externalMatrix[0][2].position}/>
                        <img
                            src={[empty, hatIa, hat, hatMov][this.state.externalMatrix[1][0].player]}
                            alt={"hat"}
                            style={this.state.externalMatrix[1][0].position}/>
                        <img
                            src={[empty, hatIa, hat, hatMov][this.state.externalMatrix[1][1].player]}
                            alt={"hat"}
                            style={this.state.externalMatrix[1][1].position}/>
                        <img
                            src={[empty, hatIa, hat, hatMov][this.state.externalMatrix[1][2].player]}
                            alt={"hat"}
                            style={this.state.externalMatrix[1][2].position}/>
                        <img
                            src={[empty, hatIa, hat, hatMov][this.state.externalMatrix[2][0].player]}
                            alt={"hat"}
                            style={this.state.externalMatrix[2][0].position}/>
                        <img
                            src={[empty, hatIa, hat, hatMov][this.state.externalMatrix[2][1].player]}
                            alt={"hat"}
                            style={this.state.externalMatrix[2][1].position}/>
                        <img
                            src={[empty, hatIa, hat, hatMov][this.state.externalMatrix[2][2].player]}
                            alt={"hat"}
                            style={this.state.externalMatrix[2][2].position}/>
                        <img
                            src={[empty, hatIa, hat, hatMov][this.state.internalMatrix[0][0].player]}
                            alt={"hat"}
                            style={this.state.internalMatrix[0][0].position}/>
                        <img
                            src={[empty, hatIa, hat, hatMov][this.state.internalMatrix[0][1].player]}
                            alt={"hat"}
                            style={this.state.internalMatrix[0][1].position}/>
                        <img
                            src={[empty, hatIa, hat, hatMov][this.state.internalMatrix[1][0].player]}
                            alt={"hat"}
                            style={this.state.internalMatrix[1][0].position}/>
                        <img
                            src={[empty, hatIa, hat, hatMov][this.state.internalMatrix[1][1].player]}
                            alt={"hat"}
                            style={this.state.internalMatrix[1][1].position}/>
                        <img className="emp" style={this.state.imageResolution} src={empty}
                             onClick={(e) => this.handleClick(e)} alt={"tabuleiro"}/>

                    </header>
                </div>
            </div>
        );
    }

    matrizInicialExterna() {
        let imageResolution = window.innerHeight - 10;
        let ppq = 254 * imageResolution / 1200;
        let x = window.innerWidth * 0.5 - imageResolution / 2;
        let y = window.innerHeight * 0.5 - imageResolution / 2;
        let A = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++) {
                let x_ = x + 346 * imageResolution / 1200 - 50 + (j) * ppq;
                let y_ = y + 346 * imageResolution / 1200 - 50 + (i) * ppq;
                x_ = x_ + "px";
                y_ = y_ + "px";
                A[i][j] = {
                    player: 0,
                    position: {
                        left: x_, top: y_, height: "100px",
                        width: "100px", position: "absolute"
                    }
                };
            }
        for (let i = 0; i < 2; i++) {
            let j = 2;
            let x_ = x + 346 * imageResolution / 1200 - 50 + (j) * ppq;
            let y_ = y + 346 * imageResolution / 1200 - 50 + (i) * ppq;
            x_ = x_ + "px";
            y_ = y_ + "px";
            A[i][j] = {
                player: 1,
                position: {
                    left: x_, top: y_, height: "100px",
                    width: "100px", position: "absolute"
                }
            };
        }
        for (let i = 1; i < 3; i++) {
            let j = 0;
            let x_ = x + 346 * imageResolution / 1200 - 50 + (j) * ppq;
            let y_ = y + 346 * imageResolution / 1200 - 50 + (i) * ppq;
            x_ = x_ + "px";
            y_ = y_ + "px";
            A[i][j] = {
                player: 2,
                position: {
                    left: x_, top: y_, height: "100px",
                    width: "100px", position: "absolute"
                }
            };
        }

        return A;

    }

    matrizInicialInterna() {
        let imageResolution = window.innerHeight - 10;
        let ppq = 254 * imageResolution / 1200;
        let x = window.innerWidth * 0.5 - imageResolution / 2;
        let y = window.innerHeight * 0.5 - imageResolution / 2;
        let B = [
            [null, null],
            [null, null]

        ];

        for (let i = 0; i < 2; i++) {
            let j = 1;
            let x_ = x + 473 * imageResolution / 1200 - 50 + (j) * ppq;
            let y_ = y + 473 * imageResolution / 1200 - 50 + (i) * ppq;
            x_ = x_ + "px";
            y_ = y_ + "px";
            B[i][j] = {
                player: 1,
                position: {
                    left: x_, top: y_, height: "100px",
                    width: "100px", position: "absolute"
                }
            };
        }

        for (let i = 0; i < 2; i++) {
            let j = 0;
            let x_ = x + 473 * imageResolution / 1200 - 50 + (j) * ppq;
            let y_ = y + 473 * imageResolution / 1200 - 50 + (i) * ppq;
            x_ = x_ + "px";
            y_ = y_ + "px";
            B[i][j] = {
                player: 2,
                position: {
                    left: x_, top: y_, height: "100px",
                    width: "100px", position: "absolute"
                }
            };
        }

        return B;

    }

    posicionamento(x, y) {
        let imageResolution = window.innerHeight - 10;
        let ppq = 254 * imageResolution / 1200;
        let x_ = 0.5 * (window.innerWidth - imageResolution);
        let y_ = 0.5 * (window.innerHeight - imageResolution);
        if (x - x_ > (imageResolution / 1200 * 346) && x - x_ < (imageResolution / 1200 * 854) && y - y_ > (imageResolution / 1200 * 346) && y - y_ < (imageResolution / 1200 * 854)) {
            //Posicão do Vértice do 1° quadrado interno
            //x = y = 346*tamanho_do_lado__da_imagem/tamanho_do_lado__da_imagem_original = 346*900/1200 = 259.5
            //Pixel por Quadrado = 254*900/1200 = 190.5
            let a = Math.trunc((x - x_ - imageResolution / 1200 * 346) / ppq);
            let b = Math.trunc((y - y_ - imageResolution / 1200 * 346) / ppq);

            if (((y - y_) - imageResolution / 1200 * (346 + b * 254)) > Math.abs(x - x_ - imageResolution / 1200 * (473 + a * 254)) &&
                ((y - y_) - imageResolution / 1200 * (600 + b * 254)) < -Math.abs(x - x_ - imageResolution / 1200 * (473 + a * 254)))

                return {i: b, j: a, isExternalMatrix: false};

        }
        //Posicão do Vértice do 1° quadrado externo
        //x = y = (346-254/2)*3/4=164.25
        x = Math.trunc((x - x_ - 219 * imageResolution / 1200) / ppq);
        y = Math.trunc((y - y_ - 219 * imageResolution / 1200) / ppq);
        return {i: y, j: x, isExternalMatrix: true};
    }

    updateMatrix(a, A = this.state.externalMatrix, B = this.state.internalMatrix) {
        for (let k = 0; k < a.length; k++)

            if (a[k].isExternalMatrix)
                A[a[k].i][a[k].j] = {
                    player: a[k].player,
                    position: {
                        left: A[a[k].i][a[k].j].position.left, top: A[a[k].i][a[k].j].position.top, height: "100px",
                        width: "100px", position: "absolute"
                    }
                };
            else {
                let p = B[a[k].i][a[k].j].position;
                B[a[k].i][a[k].j] = {
                    player: a[k].player,
                    position: p
                };
            }
        return {externalMatrix: A, internalMatrix: B};
    }

}

SideBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SideBar);
