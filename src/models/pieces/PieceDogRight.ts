import { PieceBase } from '../PieceBase';

export class PieceDogRight extends PieceBase {
    constructor() {
        super('DogRight', [
            [0, 1, 1],
            [1, 1, 0]
        ]);
    }
}