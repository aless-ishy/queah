class Tree {
    constructor(externalPlayerMatrix, internalPlayerMatrix, movement, player, peças, depth, heuristic) {
        this.externalPlayerMatrix = Tree.cloneMatrix(externalPlayerMatrix);
        this.internalPlayerMatrix = Tree.cloneMatrix(internalPlayerMatrix);
        this.movement = movement;
        this.heuristic = heuristic;
        if (movement.type){
            let add = player === 2 ? -1 : 1;
            this.heuristic += add;
        }

        this.childrenMovement = [];
        this.peças = peças;
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


}