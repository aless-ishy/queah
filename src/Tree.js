class Tree {
    constructor(comeu, matrizExternaPlayer, matrizInternaPlayer, jogada) {
        this.valorIndividual = comeu;
        for (let i = 0; i < matrizExternaPlayer.length; i++)
            this.matrizExternaPlayer = [...matrizExternaPlayer[i]];
        for (let i = 0; i < matrizInternaPlayer.length; i++)
            this.matrizInternaPlayer = [...matrizInternaPlayer[i]];
        this.jogada = jogada;
        this.valorTotal = 0;
        this.filhos = [];
    }

    criarArvore(Profundidade) {

    }
    static nextMoves(i, j, matrizExternaPlayer,matrizInternaPlayer,matrizExterna) {
        let a = [];
        let A = matrizExternaPlayer;
        let B = matrizInternaPlayer;
        let player = A[i][j];

        for (let k = 0; k < 2; k++)
            for (let l = 0; l < 2; l++) {
                if (matrizExterna) {

                    if (Tree.validar(i - k, j - l, false)) {
                        switch (B[i - k][j - l]) {
                            case 0:
                                a.push({i: i - k, j: j - l, player: player, matrizExterna: false});
                                break;
                            case player:
                                break;
                            default:
                                let auxi = i - k, auxj = j - l;

                                if (i === auxi && j === auxj && Tree.validar(i + 1, j + 1, true)) {
                                    if (A[i + 1][j + 1] === 0)
                                        a.push({i: i + 1, j: j + 1, player: player, matrizExterna: true});
                                } else if (i - 1 === auxi && j === auxj && Tree.validar(i - 1, j + 1, true)) {
                                    if (A[i - 1][j + 1] === 0)
                                        a.push({i: i - 1, j: j + 1, player: player, matrizExterna: true});
                                } else if (i - 1 === auxi && j - 1 === auxj && Tree.validar(i - 1, j - 1, true)) {
                                    if (A[i - 1][j - 1] === 0)
                                        a.push({i: i - 1, j: j - 1, player: player, matrizExterna: true});
                                } else if (i === auxi && j - 1 === auxj && Tree.validar(i + 1, j - 1, true)) {
                                    if (A[i + 1][j - 1] === 0)
                                        a.push({i: i + 1, j: j - 1, player: player, matrizExterna: true});
                                }
                        }
                    }

                } else if (Tree.validar(i + k, j + l, true))
                    switch (A[i + k][j + l]) {
                        case 0:
                            a.push({i: i + k, j: j + l, player: player, matrizExterna: true});
                            break;
                        case player:
                            break;
                        default:
                            let auxi = i + k, auxj = j + l;
                            if (i + 1 === auxi && j + 1 === auxj && Tree.validar(i + 1, j + 1, false)) {
                                if (B[i + 1][j + 1] === 0)
                                    a.push({i: i + 1, j: j + 1, player: player, matrizExterna: false});
                            } else if (i === auxi && j + 1 === auxj && Tree.validar(i - 1, j + 1, false)) {
                                if (B[i - 1][j + 1] === 0)
                                    a.push({i: i - 1, j: j + 1, player: player, matrizExterna: false});
                            } else if (i === auxi && j === auxj && Tree.validar(i - 1, j - 1, false)) {
                                if (B[i - 1][j - 1] === 0)
                                    a.push({i: i - 1, j: j - 1, player: player, matrizExterna: false});
                            } else if (i + 1 === auxi && j === auxj && Tree.validar(i + 1, j - 1, false)) {
                                if (A[i + 1][j - 1] === 0)
                                    a.push({i: i + 1, j: j - 1, player: player, matrizExterna: false});
                            }
                    }
            }
        return a;
    }

    static copiarMatiz(A){
        let novaMatriz = [];
        for(let i = 0; i < A.length; i++) {
            novaMatriz.push([]);
            for (let j = 0; j < A[i].length; j++)
                novaMatriz[i].push(A[i][j].player);
        }
        return novaMatriz;
    }

    nextMoves(i, j, matrizExterna) {
        let a = [];
        let A = this.matrizExternaPlayer;
        let B = this.matrizInternaPlayer;
        let player = A[i][j];

        for (let k = 0; k < 2; k++)
            for (let l = 0; l < 2; l++) {
                if (matrizExterna) {

                    if (Tree.validar(i - k, j - l, false)) {
                        switch (B[i - k][j - l]) {
                            case 0:
                                a.push({i: i - k, j: j - l, player: player, matrizExterna: false});
                                break;
                            case player:
                                break;
                            default:
                                let auxi = i - k, auxj = j - l;

                                if (i === auxi && j === auxj && Tree.validar(i + 1, j + 1, true)) {
                                    if (A[i + 1][j + 1] === 0)
                                        a.push({i: i + 1, j: j + 1, player: player, matrizExterna: true});
                                } else if (i - 1 === auxi && j === auxj && Tree.validar(i - 1, j + 1, true)) {
                                    if (A[i - 1][j + 1] === 0)
                                        a.push({i: i - 1, j: j + 1, player: player, matrizExterna: true});
                                } else if (i - 1 === auxi && j - 1 === auxj && Tree.validar(i - 1, j - 1, true)) {
                                    if (A[i - 1][j - 1] === 0)
                                        a.push({i: i - 1, j: j - 1, player: player, matrizExterna: true});
                                } else if (i === auxi && j - 1 === auxj && Tree.validar(i + 1, j - 1, true)) {
                                    if (A[i + 1][j - 1] === 0)
                                        a.push({i: i + 1, j: j - 1, player: player, matrizExterna: true});
                                }
                        }
                    }

                } else if (Tree.validar(i + k, j + l, true))
                    switch (A[i + k][j + l]) {
                        case 0:
                            a.push({i: i + k, j: j + l, player: player, matrizExterna: true});
                            break;
                        case player:
                            break;
                        default:
                            let auxi = i + k, auxj = j + l;
                            if (i + 1 === auxi && j + 1 === auxj && Tree.validar(i + 1, j + 1, false)) {
                                if (B[i + 1][j + 1] === 0)
                                    a.push({i: i + 1, j: j + 1, player: player, matrizExterna: false});
                            } else if (i === auxi && j + 1 === auxj && Tree.validar(i - 1, j + 1, false)) {
                                if (B[i - 1][j + 1] === 0)
                                    a.push({i: i - 1, j: j + 1, player: player, matrizExterna: false});
                            } else if (i === auxi && j === auxj && Tree.validar(i - 1, j - 1, false)) {
                                if (B[i - 1][j - 1] === 0)
                                    a.push({i: i - 1, j: j - 1, player: player, matrizExterna: false});
                            } else if (i + 1 === auxi && j === auxj && Tree.validar(i + 1, j - 1, false)) {
                                if (A[i + 1][j - 1] === 0)
                                    a.push({i: i + 1, j: j - 1, player: player, matrizExterna: false});
                            }
                    }
            }
        return a;
    }


    static validar(i, j, matrizExterna) {
        if (i < 0 || j < 0) return false;
        if (i > 2 || j > 2) return false;
        if (!matrizExterna && (i > 1 || j > 1)) return false;
        return true
    }

}