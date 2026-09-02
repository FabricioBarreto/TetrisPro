import { describe, test, expect } from 'vitest';
import { PieceSquare } from '../../src/models/pieces/PieceSquare';

describe('PieceSquare Tests', () => {
    test('Debe crearse con el nombre "Square" y su forma inicial de 2x2', () => {
        const piece = new PieceSquare();

        expect(piece.name).toBe('Square');
        expect(piece.shape).toEqual([
            [1, 1],
            [1, 1]
        ]);
    });

    test('No debe cambiar de forma al rotar (es simétrica)', () => {
        const piece = new PieceSquare();

        piece.rotateRight();
        piece.rotateLeft();

        expect(piece.shape).toEqual([
            [1, 1],
            [1, 1]
        ]);
    });
});