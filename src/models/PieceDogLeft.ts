import { PieceBase } from '../PieceBase';

export class PieceDogLeft extends PieceBase {
    constructor() {
        super('DogLeft', [
            [1, 1, 0],
            [0, 1, 1]
        ]);
    }
}