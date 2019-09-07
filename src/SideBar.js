import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Tree from "./Tree";
import board from "./board.png";
import hat from "./hat_12-512.png";
import hatIa from "./hatIa.png";
import hatMov from "./hatmov.png";
import './SideBar.css';
import "./Board.css";
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
            posição: {i: 0, j: 0, matrizExterna: true},
            matrizExterna: this.matrizInicialExterna(),
            matrizInterna: this.matrizInicialInterna(),
            resolução: {
                height: (window.innerHeight - 10) + "px",
                width: (window.innerHeight - 10) + "px",
                position: "absolute"
            },
            jogadas: [],
            ultimoClick: null
        };

        this.handleClick = this.handleClick.bind(this);
    }


    matrizInicialExterna() {
        let resolução = window.innerHeight - 10;
        let ppq = 254 * resolução / 1200;
        let x = window.innerWidth * 0.5 - resolução / 2;
        let y = window.innerHeight * 0.5 - resolução / 2;
        let A = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++) {
                let x_ = x + 346 * resolução / 1200 - 50 + (j) * ppq;
                let y_ = y + 346 * resolução / 1200 - 50 + (i) * ppq;
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
            let x_ = x + 346 * resolução / 1200 - 50 + (j) * ppq;
            let y_ = y + 346 * resolução / 1200 - 50 + (i) * ppq;
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
            let x_ = x + 346 * resolução / 1200 - 50 + (j) * ppq;
            let y_ = y + 346 * resolução / 1200 - 50 + (i) * ppq;
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
        let resolução = window.innerHeight - 10;
        let ppq = 254 * resolução / 1200;
        let x = window.innerWidth * 0.5 - resolução / 2;
        let y = window.innerHeight * 0.5 - resolução / 2;
        let B = [
            [null, null],
            [null, null]

        ];

        for (let i = 0; i < 2; i++) {
            let j = 1;
            let x_ = x + 473 * resolução / 1200 - 50 + (j) * ppq;
            let y_ = y + 473 * resolução / 1200 - 50 + (i) * ppq;
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
            let x_ = x + 473 * resolução / 1200 - 50 + (j) * ppq;
            let y_ = y + 473 * resolução / 1200 - 50 + (i) * ppq;
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

    copiarMatiz(A) {
        let novaMatriz = [];
        for (let i = 0; i < A.length; i++) {
            novaMatriz.push([]);
            for (let j = 0; j < A[i].length; j++)
                novaMatriz[i].push(A[i][j].player);
        }
        return novaMatriz;
    }

    validar(i, j, matrizExterna) {
        if (i < 0 || j < 0) return false;
        if (i > 2 || j > 2) return false;
        if (!matrizExterna && (i > 1 || j > 1)) return false;
        return true
    }

    nextMoves(i, j, matrizExternaPlayer, matrizInternaPlayer, matrizExterna) {
        let a = [];
        let A = matrizExternaPlayer;
        let B = matrizInternaPlayer;
        let player;

        if (matrizExterna)
            player = A[i][j];
        else
            player = B[i][j];


        if (player != 0)
            for (let k = 0; k < 2; k++)
                for (let l = 0; l < 2; l++) {
                    if (matrizExterna) {

                        if (this.validar(i - k, j - l, false)) {
                            switch (B[i - k][j - l]) {
                                case 0:
                                    a.push({
                                        i: i - k,
                                        j: j - l,
                                        player: (player == 2 ? 3 : player),
                                        matrizExterna: false
                                    });
                                    break;
                                case player:
                                    break;
                                default:
                                    let auxi = i - k, auxj = j - l;

                                    if (i === auxi && j === auxj && this.validar(i + 1, j + 1, true)) {
                                        if (A[i + 1][j + 1] === 0)
                                            a.push({
                                                i: i + 1,
                                                j: j + 1,
                                                player: (player == 2 ? 3 : player),
                                                matrizExterna: true
                                            });
                                    } else if (i - 1 === auxi && j === auxj && this.validar(i - 1, j + 1, true)) {
                                        if (A[i - 1][j + 1] === 0)
                                            a.push({
                                                i: i - 1,
                                                j: j + 1,
                                                player: (player == 2 ? 3 : player),
                                                matrizExterna: true
                                            });
                                    } else if (i - 1 === auxi && j - 1 === auxj && this.validar(i - 1, j - 1, true)) {
                                        if (A[i - 1][j - 1] === 0)
                                            a.push({
                                                i: i - 1,
                                                j: j - 1,
                                                player: (player == 2 ? 3 : player),
                                                matrizExterna: true
                                            });
                                    } else if (i === auxi && j - 1 === auxj && this.validar(i + 1, j - 1, true)) {
                                        if (A[i + 1][j - 1] === 0)
                                            a.push({
                                                i: i + 1,
                                                j: j - 1,
                                                player: (player == 2 ? 3 : player),
                                                matrizExterna: true
                                            });
                                    }
                            }
                        }

                    } else if (this.validar(i + k, j + l, true))
                        switch (A[i + k][j + l]) {
                            case 0:
                                a.push({i: i + k, j: j + l, player: (player == 2 ? 3 : player), matrizExterna: true});
                                break;
                            case player:
                                break;
                            default:
                                let auxi = i + k, auxj = j + l;
                                if (i + 1 === auxi && j + 1 === auxj && this.validar(i + 1, j + 1, false)) {
                                    if (B[i + 1][j + 1] === 0)
                                        a.push({
                                            i: i + 1,
                                            j: j + 1,
                                            player: (player == 2 ? 3 : player),
                                            matrizExterna: false
                                        });
                                } else if (i === auxi && j + 1 === auxj && this.validar(i - 1, j + 1, false)) {
                                    if (B[i - 1][j + 1] === 0)
                                        a.push({
                                            i: i - 1,
                                            j: j + 1,
                                            player: (player == 2 ? 3 : player),
                                            matrizExterna: false
                                        });
                                } else if (i === auxi && j === auxj && this.validar(i - 1, j - 1, false)) {
                                    if (B[i - 1][j - 1] === 0)
                                        a.push({
                                            i: i - 1,
                                            j: j - 1,
                                            player: (player == 2 ? 3 : player),
                                            matrizExterna: false
                                        });
                                } else if (i + 1 === auxi && j === auxj && this.validar(i + 1, j - 1, false)) {
                                    if (A[i + 1][j - 1] === 0)
                                        a.push({
                                            i: i + 1,
                                            j: j - 1,
                                            player: (player == 2 ? 3 : player),
                                            matrizExterna: false
                                        });
                                }
                        }
                }
        return a;
    }

    limparJogadas(jogadas) {
        for (let k = 0; k < jogadas.length; k++)
            jogadas[k].player = 0;
        let novaMatriz = this.alterarMatriz(jogadas);
        this.setState(
            {
                matrizExterna: novaMatriz.matrizExterna,
                matrizInterna: novaMatriz.matrizInterna,
                jogadas: []
            },
        );

    }

    isJogadaInVector(jogada, jogadas) {
        for (let k = 0; k < jogadas.length; k++)
            if (jogadas[k].i === jogada.i && jogadas[k].j === jogada.j && jogada.matrizExterna === jogadas[k].matrizExterna)
                return jogadas[k];
        return null;
    }

    handleClick(e, a = this.state.matrizExterna, b = this.state.matrizInterna, jogadas = this.state.jogadas, ultimo = this.state.ultimoClick) {
        // B[i][j] = {
        //     player: 2,
        //     posição: {
        //         left: x_, top: y_, height: "100px",
        //         width: "100px", position: "absolute"
        //     }
        // };

        let position = this.posicionamento(e.clientX, e.clientY);
        let d = this.copiarMatiz(a);
        let c = this.copiarMatiz(b);

        let mov = this.isJogadaInVector(position, jogadas);
        if(mov != null){
            mov = {i: mov.i, j: mov.j, matrizExterna: mov.matrizExterna, player: ultimo.player};
            ultimo = {i: ultimo.i, j: ultimo.j, matrizExterna: ultimo.matrizExterna, player: 0};
            jogadas.push(ultimo);
        }

        if (jogadas.length > 0)
            this.limparJogadas(jogadas);

        if(mov != null){
            let novaMatriz = this.alterarMatriz([mov]);
            this.setState({
                matrizExterna: novaMatriz.matrizExterna,
                matrizInterna: novaMatriz.matrizInterna,
                ultimoClick: null
            });
            return;
        }

        let movimentos = this.nextMoves(position.i, position.j, d, c, position.matrizExterna);
        let novaMatriz = this.alterarMatriz(movimentos, a, b);
        this.setState(
            {
                jogador: {pontuação: 0},
                iA: {pontuação: 0},
                posição: position,
                matrizExterna: novaMatriz.matrizExterna,
                matrizInterna: novaMatriz.matrizInterna,
                jogadas: movimentos,
                ultimoClick: {
                    i: position.i,
                    j: position.j,
                    matrizExterna: position.matrizExterna,
                    player: position.matrizExterna ? d[position.i][position.j] : c[position.i][position.j]}
            },
        );

    }

    posicionamento(x, y) {
        let resolução = window.innerHeight - 10;
        let ppq = 254 * resolução / 1200;
        let x_ = 0.5 * (window.innerWidth - resolução);
        let y_ = 0.5 * (window.innerHeight - resolução);
        if (x - x_ > (resolução / 1200 * 346) && x - x_ < (resolução / 1200 * 854) && y - y_ > (resolução / 1200 * 346) && y - y_ < (resolução / 1200 * 854)) {
            //Posicão do Vértice do 1° quadrado interno
            //x = y = 346*tamanho_do_lado__da_imagem/tamanho_do_lado__da_imagem_original = 346*900/1200 = 259.5
            //Pixel por Quadrado = 254*900/1200 = 190.5
            let a = Math.trunc((x - x_ - resolução / 1200 * 346) / ppq);
            let b = Math.trunc((y - y_ - resolução / 1200 * 346) / ppq);

            if (((y - y_) - resolução / 1200 * (346 + b * 254)) > Math.abs(x - x_ - resolução / 1200 * (473 + a * 254)) &&
                ((y - y_) - resolução / 1200 * (600 + b * 254)) < -Math.abs(x - x_ - resolução / 1200 * (473 + a * 254)))

                return {i: b, j: a, matrizExterna: false};

        }
        //Posicão do Vértice do 1° quadrado externo
        //x = y = (346-254/2)*3/4=164.25
        x = Math.trunc((x - x_ - 219 * resolução / 1200) / ppq);
        y = Math.trunc((y - y_ - 219 * resolução / 1200) / ppq);
        return {i: y, j: x, matrizExterna: true};
    }

    alterarMatriz(a, A = this.state.matrizExterna, B = this.state.matrizInterna) {
        for (let k = 0; k < a.length; k++)

            if (a[k].matrizExterna)
                A[a[k].i][a[k].j] = {
                    player: a[k].player,
                    posição: {
                        left: A[a[k].i][a[k].j].posição.left, top: A[a[k].i][a[k].j].posição.top, height: "100px",
                        width: "100px", position: "absolute"
                    }
                };
            else {
                let p = B[a[k].i][a[k].j];
                B[a[k].i][a[k].j] = {
                    player: a[k].player,
                    posição: p
                };
            }
        return {matrizExterna: A, matrizInterna: B};
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
                    <h3>{this.state.posição.matrizExterna ? "Externo" : "Interno"}</h3>


                </Drawer>
                <div className={"Board"}>
                    <header className="Board-header">
                        <img className="Board-chessA" style={this.state.resolução} src={board} alt={"tabuleiro"}/>
                        <img className={"Hata"} src={[empty, hatIa, hat, hatMov][this.state.matrizExterna[0][0].player]}
                             alt={"hat"}
                             style={this.state.matrizExterna[0][0].posição} onClick={this.setMatrizExterna}/>
                        <img className={"Hata"} src={[empty, hatIa, hat, hatMov][this.state.matrizExterna[0][1].player]}
                             alt={"hat"}
                             style={this.state.matrizExterna[0][1].posição}/>
                        <img className={"Hata"} src={[empty, hatIa, hat, hatMov][this.state.matrizExterna[0][2].player]}
                             alt={"hat"}
                             style={this.state.matrizExterna[0][2].posição}/>
                        <img className={"Hata"} src={[empty, hatIa, hat, hatMov][this.state.matrizExterna[1][0].player]}
                             alt={"hat"}
                             style={this.state.matrizExterna[1][0].posição}/>
                        <img className={"Hata"} src={[empty, hatIa, hat, hatMov][this.state.matrizExterna[1][1].player]}
                             alt={"hat"}
                             style={this.state.matrizExterna[1][1].posição}/>
                        <img className={"Hata"} src={[empty, hatIa, hat, hatMov][this.state.matrizExterna[1][2].player]}
                             alt={"hat"}
                             style={this.state.matrizExterna[1][2].posição}/>
                        <img className={"Hata"} src={[empty, hatIa, hat, hatMov][this.state.matrizExterna[2][0].player]}
                             alt={"hat"}
                             style={this.state.matrizExterna[2][0].posição}/>
                        <img className={"Hata"} src={[empty, hatIa, hat, hatMov][this.state.matrizExterna[2][1].player]}
                             alt={"hat"}
                             style={this.state.matrizExterna[2][1].posição}/>
                        <img className={"Hata"} src={[empty, hatIa, hat, hatMov][this.state.matrizExterna[2][2].player]}
                             alt={"hat"}
                             style={this.state.matrizExterna[2][2].posição}/>
                        <img className={"Hata"} src={[empty, hatIa, hat, hatMov][this.state.matrizInterna[0][0].player]}
                             alt={"hat"}
                             style={this.state.matrizInterna[0][0].posição}/>
                        <img className={"Hata"} src={[empty, hatIa, hat, hatMov][this.state.matrizInterna[0][1].player]}
                             alt={"hat"}
                             style={this.state.matrizInterna[0][1].posição}/>
                        <img className={"Hata"} src={[empty, hatIa, hat, hatMov][this.state.matrizInterna[1][0].player]}
                             alt={"hat"}
                             style={this.state.matrizInterna[1][0].posição}/>
                        <img className={"Hata"} src={[empty, hatIa, hat, hatMov][this.state.matrizInterna[1][1].player]}
                             alt={"hat"}
                             style={this.state.matrizInterna[1][1].posição}/>
                        <img className="emp" style={this.state.resolução} src={empty}
                             onClick={(e) => this.handleClick(e)} alt={"tabuleiro"}/>

                    </header>
                </div>
            </div>
        );
    }
}

export default SideBar;
