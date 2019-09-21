class Tree {
    constructor(externalPlayerMatrix, internalPlayerMatrix, movement, player, pieces, depth, heuristic) {
        this.externalPlayerMatrix = Tree.cloneMatrix(externalPlayerMatrix);
        this.internalPlayerMatrix = Tree.cloneMatrix(internalPlayerMatrix);
        Tree.updateMatrix(movement,this.externalPlayerMatrix,this.internalPlayerMatrix);

        this.movement = movement;
        this.heuristic = heuristic;
        if (movement.type){
            let add = player === 2 ? -1 : 1;
            this.heuristic += add;
        }

        this.childrenMovement = [];
        this.pieces = pieces;
        if(depth > 0)
            ;
    }

    nextMovement(){

    }


    static alphabeta(node, depth, alpha, beta, maximizingPlayer) {
        if (depth === 0 || node.childrenMovement.length === 0)
            return node.heuristic;
        if (maximizingPlayer) {
            let value = -Infinity, aux;
            for (let child in node.childrenMovement) {
                aux = this.alphabeta(child, depth - 1, alpha, beta, false);
                value = value > aux ? value : aux;
                alpha = alpha > value ? alpha : value;
                if (alpha >= beta)
                    break;
            }
            return value;
        } else {
            let value = Infinity, aux;
            for (let child in node.childrenMovement) {
                aux = this.alphabeta(child, depth - 1, alpha, beta, true);
                value = value < aux ? value : aux;
                beta = beta < value ? alpha : value;
                if (alpha >= beta)
                    break;
            }
            return value;
        }

    }


    static cloneMatrix(A){
        let a = [];
        for(let i = 0; i < A.length; i++)
            a.push([...A[i]]);
        return a;
    }

    static updateMatrix(movement, A,B){
        for(let k = 0; k < movement.length; k++){
            let i = movement[k].i, j = movement[k].j;
            if (movement[k].isExternalMatrix)
                A[i][j] = movement[k].player;
            else
                B[i][j] = movement[k].player;
        }
    }

    static isPossible(i, j, isExternalMatrix) {
        if (i < 0 || j < 0) return false;
        if (i > 2 || j > 2) return false;
        if (!isExternalMatrix && (i > 1 || j > 1)) return false;
        return true
    }

    nextMoves(i, j, isExternalMatrix) {
        let a = [];
        let A = this.externalPlayerMatrix;
        let B = this.internalPlayerMatrix;
        let player;

        if (isExternalMatrix)
            player = A[i][j];
        else
            player = B[i][j];


        if (player !== 0)
            for (let k = 0; k < 2; k++)
                for (let l = 0; l < 2; l++) {
                    if (isExternalMatrix) {

                        if (Tree.isPossible(i - k, j - l, false)) {
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

                                    if (i === auxi && j === auxj && Tree.isPossible(i + 1, j + 1, true)) {
                                        if (A[i + 1][j + 1] === 0)
                                            a.push({
                                                i: i + 1,
                                                j: j + 1,
                                                player: (player === 2 ? 3 : player),
                                                isExternalMatrix: true
                                            });
                                    } else if (i - 1 === auxi && j === auxj && Tree.isPossible(i - 1, j + 1, true)) {
                                        if (A[i - 1][j + 1] === 0)
                                            a.push({
                                                i: i - 1,
                                                j: j + 1,
                                                player: (player === 2 ? 3 : player),
                                                isExternalMatrix: true
                                            });
                                    } else if (i - 1 === auxi && j - 1 === auxj && Tree.isPossible(i - 1, j - 1, true)) {
                                        if (A[i - 1][j - 1] === 0)
                                            a.push({
                                                i: i - 1,
                                                j: j - 1,
                                                player: (player === 2 ? 3 : player),
                                                isExternalMatrix: true
                                            });
                                    } else if (i === auxi && j - 1 === auxj && Tree.isPossible(i + 1, j - 1, true)) {
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

                    } else if (Tree.isPossible(i + k, j + l, true))
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
                                if (i + 1 === auxi && j + 1 === auxj && Tree.isPossible(i + 1, j + 1, false)) {
                                    if (B[i + 1][j + 1] === 0)
                                        a.push({
                                            i: i + 1,
                                            j: j + 1,
                                            player: (player === 2 ? 3 : player),
                                            isExternalMatrix: false
                                        });
                                } else if (i === auxi && j + 1 === auxj && Tree.isPossible(i - 1, j + 1, false)) {
                                    if (B[i - 1][j + 1] === 0)
                                        a.push({
                                            i: i - 1,
                                            j: j + 1,
                                            player: (player === 2 ? 3 : player),
                                            isExternalMatrix: false
                                        });
                                } else if (i === auxi && j === auxj && Tree.isPossible(i - 1, j - 1, false)) {
                                    if (B[i - 1][j - 1] === 0)
                                        a.push({
                                            i: i - 1,
                                            j: j - 1,
                                            player: (player === 2 ? 3 : player),
                                            isExternalMatrix: false
                                        });
                                } else if (i + 1 === auxi && j === auxj && Tree.isPossible(i + 1, j - 1, false)) {
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


}