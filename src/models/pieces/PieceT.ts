import { PieceBase } from '../PieceBase';

export class PieceT extends PieceBase {
    constructor() {
        super('T', [
            [0, 1, 0],
            [1, 1, 1]
        ]);
    }
}