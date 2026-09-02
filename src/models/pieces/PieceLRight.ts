import { PieceBase } from '../PieceBase';

export class PieceLRight extends PieceBase {
    constructor() {
        super('LRight', [
            [1, 0],
            [1, 0],
            [1, 1]
        ]);
    }
}