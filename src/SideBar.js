import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider"
import board from "./board.png";
import hat from "./hat_12-512.png";
import hatIa from "./hatIa.png";
import './SideBar.css';
import empty from "./empty.png";
import Grid from "@material-ui/core/Grid";
import {GridList} from "@material-ui/core";

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
            jogador: {pontuação: 100},
            iA: {pontuação: 0},
            posição: {i: 0, j: 0, jogador: true},
            matrizExterna: this.matrizInicialExterna(),
            matrizInterna: this.matrizInicialInterna(),
            resolução: {height: (window.innerHeight -10) + "px", width: (window.innerHeight -10) + "px"}
        };

        this.handleClick = this.handleClick.bind(this);
        this.setMatrizExterna = this.setMatrizExterna.bind(this);
    }

    matrizInicialExterna() {
        let resolução = window.innerHeight -10;
        let ppq = 254*resolução/1200;
        let x = window.innerWidth * 0.5 - resolução/2;
        let y = window.innerHeight * 0.5 - resolução/2;
        let A = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++) {
                let x_ = x + 346*resolução/1200 - 50 + (j) * ppq;
                let y_ = y + 346*resolução/1200 - 50 + (i) * ppq;
                x_ = x_ + "px";
                y_ = y_ + "px";
                A[i][j] = {
                    player: 0,
                    posição: {
                        left: x_, top: y_, height: "100px",
                        width: "100px", position: "absolute"
                    }
                };
            }
        for (let i = 0; i < 2; i++) {
            let j = 2;
            let x_ = x + 346*resolução/1200 - 50 + (j) * ppq;
            let y_ = y + 346*resolução/1200 - 50 + (i) * ppq;
            x_ = x_ + "px";
            y_ = y_ + "px";
            A[i][j] = {
                player: 1,
                posição: {
                    left: x_, top: y_, height: "100px",
                    width: "100px", position: "absolute"
                }
            };
        }
        for (let i = 1; i < 3; i++) {
            let j = 0;
            let x_ = x + 346*resolução/1200 - 50 + (j) * ppq;
            let y_ = y + 346*resolução/1200 - 50 + (i) * ppq;
            x_ = x_ + "px";
            y_ = y_ + "px";
            A[i][j] = {
                player: 2,
                posição: {
                    left: x_, top: y_, height: "100px",
                    width: "100px", position: "absolute"
                }
            };
        }

        return A;

    }

    matrizInicialInterna() {
        let resolução = window.innerHeight -10;
        let ppq = 254*resolução/1200;
        let x = window.innerWidth * 0.5 - resolução/2;
        let y = window.innerHeight * 0.5 - resolução/2;
        let B = [
            [null, null],
            [null, null]

        ];

        for (let i = 0; i < 2; i++) {
            let j = 1;
            let x_ = x + 473*resolução/1200-50 + (j) * ppq;
            let y_ = y + 473*resolução/1200-50 + (i) * ppq;
            x_ = x_ + "px";
            y_ = y_ + "px";
            B[i][j] = {
                player: 1,
                posição: {
                    left: x_, top: y_, height: "100px",
                    width: "100px", position: "absolute"
                }
            };
        }

        for (let i = 0; i < 2; i++) {
            let j = 0;
            let x_ = x + 473*resolução/1200-50 + (j) * ppq;
            let y_ = y + 473*resolução/1200-50 + (i) * ppq;
            x_ = x_ + "px";
            y_ = y_ + "px";
            B[i][j] = {
                player: 2,
                posição: {
                    left: x_, top: y_, height: "100px",
                    width: "100px", position: "absolute"
                }
            };
        }

        return B;

    }


    handleClick(e) {

        this.setState(
            {
                jogador: {pontuação: 0},
                iA: {pontuação: 0},
                posição: this.posicionamento(e.clientX, e.clientY)
            },
        );

    }

    posicionamento(x, y) {
        let resolução = window.innerHeight -10;
        let ppq = 254*resolução/1200;
        let x_ = x - (window.innerWidth * 0.5 - resolução);
        let y_ = y - (window.innerHeight * 0.5 - resolução);
        if (x_ > (resolução/1200*346) && x_ < (resolução/1200*854) && y_ > (resolução/1200*346) && y_ < (resolução/1200*854) ) {
            //Posicão do Vértice do 1° quadrado interno
            //x = y = 346*tamanho_do_lado__da_imagem/tamanho_do_lado__da_imagem_original = 346*900/1200 = 259.5
            //Pixel por Quadrado = 254*900/1200 = 190.5
            let a = Math.trunc((x_ - resolução/1200*346) / ppq);
            let b = Math.trunc((y_ - resolução/1200*346) / ppq);

            if ((y_ - resolução/1200 * (346 + b * 254)) > Math.abs(x_ - resolução/1200 * (473 + a * 254)) &&
                (y_ - resolução/1200 * (600 + b * 254)) < -Math.abs(x_ - resolução/1200 * (473 + a * 254)))

                return {i: a, j: b, player: false};

        }
        //Posicão do Vértice do 1° quadrado externo
        //x = y = (346-254/2)*3/4=164.25
        x = Math.trunc((x_ - 219*resolução/1200) / 190.5);
        y = Math.trunc((y_ - 219*resolução/1200) / 190.5);
        return {i: x, j: y, player: true};
    }

    nextMove(i, j, matrizExterna, player) {
        let a = [];

        for (let k = 0; k < 2; k++)
            for (let l = 0; l < 2; l++) {
                if (k != 0 && l != 0)
                    if (matrizExterna) {
                        if (this.validar(i - k, j - l, false))
                            a.push({i: i - k, j: j - l, player: player});
                    } else if (this.validar(i + k, j + l, true))
                        a.push({i: i + k, j: j + l, player: player});

            }
        return a;

    }

    alterarMatriz(a, matrizExterna){
        let A;
        if(matrizExterna)
            A = this.state.matrizExterna;
        else
            A = this.state.matrizInterna;
        for(let k in a)
            A[k.i][k.j] = {
                player: k.player,
                posição: {
                    left: A[k.i][k.j].posição.left, top: A[k.i][k.j].posição.top, height: "100px",
                    width: "100px", position: "absolute"
                }
            };
        return A;
    }

    validar(i, j, matrizExterna) {
        if (i < 0 || j < 0) return false;
        if (i > 2 || j > 2) return false;
        if (!matrizExterna && (i > 1 || j > 1)) return false;
        return true
    }

    setMatrizExterna() {

        this.setState({matrizExterna: this.criar(this.state.matrizExterna)});
    }

    criar(A) {
        let k = {
            player: 1,
            posição: {
                left: A[0][0].posição.left, top: A[0][0].posição.top, height: "100px",
                width: "100px", position: "absolute"
            }
        };
        A[0][0] = k;
        return A;
    }

    render() {


        return (
            <div>
                <Drawer anchor="left" variant="permanent">
                    <h2>Jogador</h2>
                    <Divider/>
                    <h3>Pontuação: {this.state.jogador.pontuação} </h3>
                    <Divider/>
                    <h2>IA</h2>
                    <Divider/>
                    <h3>Pontuação: {this.state.iA.pontuação} </h3>
                    <Divider/>
                    <h2>Posição</h2>
                    <Divider/>
                    <h3>Matriz = ({this.state.posição.i},{this.state.posição.j})</h3>
                    <h3>{this.state.posição.jogador ? "Externo" : "Interno"}</h3>


                </Drawer>
                <div className={"Board"}>
                    <header className="Board-header">
                        <img className="Board-chessA" style={this.state.resolução} src={board} onClick={e => this.handleClick(e)} alt={"tabuleiro"}/>
                        <img className={"Hata"} src={[empty, hatIa, hat][this.state.matrizExterna[0][0].player]}
                             alt={"hat"}
                             style={this.state.matrizExterna[0][0].posição} onClick={this.setMatrizExterna}/>
                        <img className={"Hata"} src={[empty, hatIa, hat][this.state.matrizExterna[0][1].player]}
                             alt={"hat"}
                             style={this.state.matrizExterna[0][1].posição}/>
                        <img className={"Hata"} src={[empty, hatIa, hat][this.state.matrizExterna[0][2].player]}
                             alt={"hat"}
                             style={this.state.matrizExterna[0][2].posição}/>
                        <img className={"Hata"} src={[empty, hatIa, hat][this.state.matrizExterna[1][0].player]}
                             alt={"hat"}
                             style={this.state.matrizExterna[1][0].posição}/>
                        <img className={"Hata"} src={[empty, hatIa, hat][this.state.matrizExterna[1][1].player]}
                             alt={"hat"}
                             style={this.state.matrizExterna[1][1].posição}/>
                        <img className={"Hata"} src={[empty, hatIa, hat][this.state.matrizExterna[1][2].player]}
                             alt={"hat"}
                             style={this.state.matrizExterna[1][2].posição}/>
                        <img className={"Hata"} src={[empty, hatIa, hat][this.state.matrizExterna[2][0].player]}
                             alt={"hat"}
                             style={this.state.matrizExterna[2][0].posição}/>
                        <img className={"Hata"} src={[empty, hatIa, hat][this.state.matrizExterna[2][1].player]}
                             alt={"hat"}
                             style={this.state.matrizExterna[2][1].posição}/>
                        <img className={"Hata"} src={[empty, hatIa, hat][this.state.matrizExterna[2][2].player]}
                             alt={"hat"}
                             style={this.state.matrizExterna[2][2].posição}/>
                        <img className={"Hata"} src={[empty, hatIa, hat][this.state.matrizInterna[0][0].player]}
                             alt={"hat"}
                             style={this.state.matrizInterna[0][0].posição}/>
                        <img className={"Hata"} src={[empty, hatIa, hat][this.state.matrizInterna[0][1].player]}
                             alt={"hat"}
                             style={this.state.matrizInterna[0][1].posição}/>
                        <img className={"Hata"} src={[empty, hatIa, hat][this.state.matrizInterna[1][0].player]}
                             alt={"hat"}
                             style={this.state.matrizInterna[1][0].posição}/>
                        <img className={"Hata"} src={[empty, hatIa, hat][this.state.matrizInterna[1][1].player]}
                             alt={"hat"}
                             style={this.state.matrizInterna[1][1].posição}/>

                    </header>
                </div>
            </div>
        );
    }
}

export default SideBar;
