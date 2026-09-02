import { describe, test, expect } from 'vitest';
import { PieceLRight } from '../../src/models/pieces/PieceLRight';

describe('PieceLRight Tests', () => {
    test('Debe crearse con el nombre "LRight" y su forma inicial', () => {
        const piece = new PieceLRight();

        expect(piece.name).toBe('LRight');
        expect(piece.shape).toEqual([
            [1, 0],
            [1, 0],
            [1, 1]
        ]);
    });

    test('Debe rotar 90 grados a la derecha', () => {
        const piece = new PieceLRight();

        piece.rotateRight();

        expect(piece.shape).toEqual([
            [1, 1, 1],
            [1, 0, 0]
        ]);
    });

    test('Debe rotar 90 grados a la izquierda', () => {
        const piece = new PieceLRight();

        piece.rotateLeft();

        expect(piece.shape).toEqual([
            [0, 0, 1],
            [1, 1, 1]
        ]);
    });
});