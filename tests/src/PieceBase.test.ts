import { describe, test, expect } from 'vitest';
import { PieceBase } from '../../src/models/PieceBase';

class TestPiece extends PieceBase {
    constructor(name: string, shape: number[][]) {
        super(name, shape);
    }
}

describe('PieceBase Tests', () => {
    test('Debe crearse correctamente con su nombre y forma inicial mediante getters', () => {
        const shape = [
            [1, 1],
            [1, 1]
        ];
        const piece = new TestPiece('TestShape', shape);

        expect(piece.name).toBe('TestShape');
        expect(piece.shape).toEqual(shape);
    });

    test('Debe permitir modificar el nombre y la forma mediante setters', () => {
        const shape = [
            [1, 1],
            [1, 1]
        ];
        const piece = new TestPiece('TestShape', shape);

        piece.name = 'NewPieceName';
        piece.shape = [
            [0, 1],
            [1, 0]
        ];

        expect(piece.name).toBe('NewPieceName');
        expect(piece.shape).toEqual([
            [0, 1],
            [1, 0]
        ]);
    });

    test('Debe rotar la matriz 90 grados a la derecha', () => {
        const shape = [
            [1, 0],
            [1, 1]
        ];
        const piece = new TestPiece('TestShape', shape);
        
        piece.rotateRight();

        expect(piece.shape).toEqual([
            [1, 1],
            [1, 0]
        ]);
    });

    test('Debe rotar la matriz 90 grados a la izquierda', () => {
        const shape = [
            [1, 0],
            [1, 1]
        ];
        const piece = new TestPiece('TestShape', shape);
        
        piece.rotateLeft();

        expect(piece.shape).toEqual([
            [0, 1],
            [1, 1]
        ]);
    });
});