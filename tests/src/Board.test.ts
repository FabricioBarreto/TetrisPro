import { describe, test, expect, vi } from 'vitest';
import { Board } from '../../src/models/Board';
import { PieceSquare } from '../../src/models/pieces/PieceSquare';
import { PieceStick } from '../../src/models/pieces/PieceStick';
import { PieceLRight } from '../../src/models/pieces/PieceLRight';

describe('Board Tests', () => {
    test('Debe crearse con el formato por defecto de 20 filas y 10 columnas', () => {
        const board = new Board();

        expect(board.rows).toBe(20);
        expect(board.columns).toBe(10);
        expect(board.grid.length).toBe(20);
        expect(board.grid[0].length).toBe(10);
    });

    test('Debe empezar sin pieza actual, sin lineas y sin game over', () => {
        const board = new Board();

        expect(board.currentPiece).toBeNull();
        expect(board.lineCount).toBe(0);
        expect(board.gameOver).toBe(false);
        expect(board.pieces.length).toBe(7);
    });

    test('addPiece debe colocar una pieza completa en el primer renglon', () => {
        const board = new Board();

        const agregada = board.addPiece();

        expect(agregada).toBe(true);
        expect(board.currentPiece).not.toBeNull();
        expect(board.currentRow).toBe(0);
    });

    test('addPiece no debe ubicar la pieza fuera de los limites del tablero', () => {
        const board = new Board();

        for (let i = 0; i < 50; i++) {
            board.addPiece();

            const piece = board.currentPiece;
            if (piece === null) {
                continue;
            }

            const ancho = piece.shape[0].length;

            expect(board.currentColumn).toBeGreaterThanOrEqual(0);
            expect(board.currentColumn + ancho).toBeLessThanOrEqual(board.columns);
        }
    });

    test('addPiece debe poder rotar la pieza al azar antes de ubicarla completa', () => {
        const board = new Board();

        const randomEspia = vi.spyOn(Math, 'random');
        randomEspia.mockReturnValueOnce(0.3); // elige el Stick del catalogo (indice 2 de 7)
        randomEspia.mockReturnValueOnce(0.3); // 1 rotacion antes de ubicarla
        randomEspia.mockReturnValueOnce(0);   // columna 0

        const agregada = board.addPiece();

        const stickRotado = new PieceStick();
        stickRotado.rotateRight();

        expect(agregada).toBe(true);
        expect(board.currentPiece?.name).toBe('Stick');
        expect(board.currentPiece?.shape).toEqual(stickRotado.shape);
        expect(board.currentPiece?.shape).not.toEqual(new PieceStick().shape);

        randomEspia.mockRestore();
    });

    test('moveDown debe bajar la pieza actual una fila mientras pueda', () => {
        const board = new Board();
        board.addPiece();

        const filaInicial = board.currentRow;
        const pudoBajar = board.moveDown();

        expect(pudoBajar).toBe(true);
        expect(board.currentRow).toBe(filaInicial + 1);
    });

    test('moveDown debe fijar la pieza en el tablero cuando llega al fondo', () => {
        const board = new Board(4, 10);
        board.addPiece();

        // Con solo 4 filas, unos pocos "tick" alcanzan para tocar fondo
        for (let i = 0; i < 4; i++) {
            board.moveDown();
        }

        const hayCeldasOcupadas = board.grid.some((fila) => fila.some((celda) => celda !== 0));
        expect(hayCeldasOcupadas).toBe(true);
    });

    test('al completarse una fila se debe eliminar y sumar al contador de lineas', () => {
        const board = new Board(4, 4);

        board.grid = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 0]
        ];

        const piezaSuelta = new PieceSquare();
        piezaSuelta.shape = [[1]];

        board.currentPiece = piezaSuelta;
        board.currentRow = 3;
        board.currentColumn = 3;

        board.moveDown();

        expect(board.lineCount).toBe(1);
        expect(board.grid[3].every((celda) => celda === 0)).toBe(true);
    });

    test('no debe poder rotar si la rotacion hace colisionar la pieza con el borde', () => {
        const board = new Board(1, 4);

        const piece = new PieceStick();
        board.currentPiece = piece;
        board.currentRow = 0;
        board.currentColumn = 0;

        const shapeAntes = piece.shape;
        const giro = board.rotateRight();

        expect(giro).toBe(false);
        expect(piece.shape).toEqual(shapeAntes);
    });

    test('debe poder rotar la pieza actual cuando hay espacio libre', () => {
        const board = new Board(10, 10);

        const piece = new PieceStick();
        board.currentPiece = piece;
        board.currentRow = 0;
        board.currentColumn = 0;

        const giro = board.rotateRight();

        expect(giro).toBe(true);
        expect(piece.shape).toEqual([[1], [1], [1], [1]]);
    });

    test('addPiece debe marcar game over cuando no hay lugar para una pieza nueva', () => {
        const board = new Board(2, 2);

        board.grid = [
            [1, 1],
            [1, 1]
        ];

        const agregada = board.addPiece();

        expect(agregada).toBe(false);
        expect(board.gameOver).toBe(true);
        expect(board.currentPiece).toBeNull();
    });

    test('addPiece no debe hacer nada si el juego ya termino', () => {
        const board = new Board();
        board.gameOver = true;

        const agregada = board.addPiece();

        expect(agregada).toBe(false);
        expect(board.currentPiece).toBeNull();
    });

    test('rotateRight y rotateLeft no hacen nada si todavia no hay pieza actual', () => {
        const board = new Board();

        expect(board.rotateRight()).toBe(false);
        expect(board.rotateLeft()).toBe(false);
    });

    test('rotateLeft debe girar la pieza actual cuando hay espacio libre', () => {
        const board = new Board(10, 10);

        const piece = new PieceStick();
        board.currentPiece = piece;
        board.currentRow = 0;
        board.currentColumn = 0;

        const giro = board.rotateLeft();

        expect(giro).toBe(true);
        expect(piece.shape).toEqual([[1], [1], [1], [1]]);
    });

    test('rotateLeft no debe girar si la pieza no entra en el tablero', () => {
        const board = new Board(1, 4);

        const piece = new PieceStick();
        board.currentPiece = piece;
        board.currentRow = 0;
        board.currentColumn = 0;

        const shapeAntes = piece.shape;
        const giro = board.rotateLeft();

        expect(giro).toBe(false);
        expect(piece.shape).toEqual(shapeAntes);
    });

    test('no debe poder rotar si la pieza se sale del ancho del tablero', () => {
        const board = new Board(10, 3);

        const piece = new PieceLRight();
        board.currentPiece = piece;
        board.currentRow = 0;
        board.currentColumn = 1;

        const shapeAntes = piece.shape;
        const giro = board.rotateRight();

        expect(giro).toBe(false);
        expect(piece.shape).toEqual(shapeAntes);
    });

    test('las propiedades del tablero se pueden leer y modificar por getter/setter', () => {
        const board = new Board();

        board.rows = 15;
        board.columns = 8;
        board.lineCount = 3;
        board.gameOver = true;
        board.pieces = [new PieceSquare()];

        expect(board.rows).toBe(15);
        expect(board.columns).toBe(8);
        expect(board.lineCount).toBe(3);
        expect(board.gameOver).toBe(true);
        expect(board.pieces.length).toBe(1);
    });

    test('hasCollision detecta colision con los bordes y con el fondo', () => {
        const board = new Board();
        const piece = new PieceSquare();

        expect(board.hasCollision(piece, -1, 0)).toBe(true);
        expect(board.hasCollision(piece, 0, 20)).toBe(true);
        expect(board.hasCollision(piece, 9, 0)).toBe(true);
        expect(board.hasCollision(piece, 0, 0)).toBe(false);
    });

    test('drawWithPiece imprime el tablero con la pieza sin romper nada', () => {
        const board = new Board(4, 4);
        const piece = new PieceSquare();
        const espia = vi.spyOn(console, 'log').mockImplementation(() => {});

        board.drawWithPiece(piece, 0, 0);

        expect(espia).toHaveBeenCalledTimes(1);
        expect(espia.mock.calls[0][0]).toContain('[]');

        espia.mockRestore();
    });
});
