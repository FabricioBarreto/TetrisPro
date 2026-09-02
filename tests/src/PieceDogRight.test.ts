import { describe, test, expect } from 'vitest';
import { PieceDogRight } from '../../src/models/pieces/PieceDogRight';

describe('PieceDogRight Tests', () => {
    test('Debe crearse con el nombre "DogRight" y su forma inicial', () => {
        const piece = new PieceDogRight();

        expect(piece.name).toBe('DogRight');
        expect(piece.shape).toEqual([
            [0, 1, 1],
            [1, 1, 0]
        ]);
    });

    test('Debe rotar 90 grados a la derecha', () => {
        const piece = new PieceDogRight();

        piece.rotateRight();

        expect(piece.shape).toEqual([
            [1, 0],
            [1, 1],
            [0, 1]
        ]);
    });

    test('Debe rotar 90 grados a la izquierda', () => {
        const piece = new PieceDogRight();

        piece.rotateLeft();

        expect(piece.shape).toEqual([
            [1, 0],
            [1, 1],
            [0, 1]
        ]);
    });
});