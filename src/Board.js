class Board {

    constructor(innerWidth, innerHeight) {
        // Exemplo de item na Matriz
        // {
        //     player: 2,
        //         posição: {
        //     left: x_, top: y_, height: "100px",
        //         width: "100px", position: "absolute"
        // }
        this.matrizExterna = this.matrizInicialExterna(innerWidth, innerHeight);
        this.matrizInterna = this.matrizInicialInterna(innerWidth, innerHeight);

    }

    jogada(i, j, player, matrizExterna) {
        if (matrizExterna)
            this.matrizExterna[i][j] = {
                player: player,
                posição: this.matrizExterna[i][j].posição
            };
        else
            this.matrizInterna[i][j] = {
                player: player,
                posição: this.matrizInterna[i][j].posição
            };
    }

    matrizInicialExterna(innerWidth, innerHeight) {
        let resolução = innerHeight - 10;
        let ppq = 254 * resolução / 1200;
        let x = innerWidth * 0.5 - resolução / 2;
        let y = innerHeight * 0.5 - resolução / 2;
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

    matrizInicialInterna(innerWidth, innerHeight) {
        let resolução = innerHeight - 10;
        let ppq = 254 * resolução / 1200;
        let x = innerWidth * 0.5 - resolução / 2;
        let y = innerHeight * 0.5 - resolução / 2;
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

    copyMatrix() {

    }


}
