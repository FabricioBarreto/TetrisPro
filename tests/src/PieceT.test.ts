import { describe, test, expect } from 'vitest';
import { PieceT } from '../../src/models/pieces/PieceT';

describe('PieceT Tests', () => {
    test('Debe crearse con el nombre "T" y su forma inicial', () => {
        const piece = new PieceT();

        expect(piece.name).toBe('T');
        expect(piece.shape).toEqual([
            [0, 1, 0],
            [1, 1, 1]
        ]);
    });

    test('Debe rotar 90 grados a la derecha', () => {
        const piece = new PieceT();

        piece.rotateRight();

        expect(piece.shape).toEqual([
            [1, 0],
            [1, 1],
            [1, 0]
        ]);
    });

    test('Debe rotar 90 grados a la izquierda', () => {
        const piece = new PieceT();

        piece.rotateLeft();

        expect(piece.shape).toEqual([
            [0, 1],
            [1, 1],
            [0, 1]
        ]);
    });
});