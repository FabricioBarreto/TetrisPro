import { describe, test, expect } from 'vitest';
import { PieceStick } from '../../src/models/pieces/PieceStick';

describe('PieceStick Tests', () => {
    test('Debe crearse con el nombre "Stick" y su forma inicial horizontal', () => {
        const piece = new PieceStick();

        expect(piece.name).toBe('Stick');
        expect(piece.shape).toEqual([
            [1, 1, 1, 1]
        ]);
    });

    test('Debe rotar a la derecha y quedar vertical', () => {
        const piece = new PieceStick();

        piece.rotateRight();

        expect(piece.shape).toEqual([
            [1],
            [1],
            [1],
            [1]
        ]);
    });

    test('Debe rotar a la izquierda y quedar vertical', () => {
        const piece = new PieceStick();

        piece.rotateLeft();

        expect(piece.shape).toEqual([
            [1],
            [1],
            [1],
            [1]
        ]);
    });
});