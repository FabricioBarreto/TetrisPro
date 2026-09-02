import { describe, test, expect } from 'vitest';
import { PieceLLeft } from '../../src/models/pieces/PieceLLeft';

describe('PieceLLeft Tests', () => {
    test('Debe crearse con el nombre "LLeft" y su forma inicial', () => {
        const piece = new PieceLLeft();

        expect(piece.name).toBe('LLeft');
        expect(piece.shape).toEqual([
            [0, 1],
            [0, 1],
            [1, 1]
        ]);
    });

    test('Debe rotar 90 grados a la derecha', () => {
        const piece = new PieceLLeft();

        piece.rotateRight();

        expect(piece.shape).toEqual([
            [1, 0, 0],
            [1, 1, 1]
        ]);
    });

    test('Debe rotar 90 grados a la izquierda', () => {
        const piece = new PieceLLeft();

        piece.rotateLeft();

        expect(piece.shape).toEqual([
            [1, 1, 1],
            [0, 0, 1]
        ]);
    });
});