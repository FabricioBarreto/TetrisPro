import { PieceBase } from '../PieceBase';

export class PieceLLeft extends PieceBase {
    constructor() {
        super('LLeft', [
            [0, 1],
            [0, 1],
            [1, 1]
        ]);
    }
}