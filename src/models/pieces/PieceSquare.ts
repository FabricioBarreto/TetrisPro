import { PieceBase } from '../PieceBase';

export class PieceSquare extends PieceBase {
    constructor() {
        super('Square', [
            [1, 1],
            [1, 1]
        ]);
    }

    public rotateRight(): void {
        // No-op: el cuadrado es simétrico, rotarlo no cambia su forma.
        // Evitamos el recálculo innecesario de PieceBase.rotateRight().
    }

    public rotateLeft(): void {
        // No-op: mismo motivo.
    }
}