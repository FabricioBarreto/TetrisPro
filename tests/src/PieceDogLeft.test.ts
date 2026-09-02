import { describe, test, expect } from 'vitest';
import { PieceDogLeft } from '../../src/models/pieces/PieceDogLeft';

describe('PieceDogLeft Tests', () => {
    test('Debe crearse con el nombre "DogLeft" y su forma inicial', () => {
        const piece = new PieceDogLeft();

        expect(piece.name).toBe('DogLeft');
        expect(piece.shape).toEqual([
            [1, 1, 0],
            [0, 1, 1]
        ]);
    });

    test('Debe rotar 90 grados a la derecha', () => {
        const piece = new PieceDogLeft();

        piece.rotateRight();

        expect(piece.shape).toEqual([
            [0, 1],
            [1, 1],
            [1, 0]
        ]);
    });

    test('Debe rotar 90 grados a la izquierda', () => {
        const piece = new PieceDogLeft();

        piece.rotateLeft();

        expect(piece.shape).toEqual([
            [0, 1],
            [1, 1],
            [1, 0]
        ]);
    });
});