import { PieceBase } from './PieceBase';
import { PieceSquare } from './pieces/PieceSquare';
import { PieceT } from './pieces/PieceT';
import { PieceStick } from './pieces/PieceStick';
import { PieceLRight } from './pieces/PieceLRight';
import { PieceLLeft } from './pieces/PieceLLeft';
import { PieceDogRight } from './pieces/PieceDogRight';
import { PieceDogLeft } from './pieces/PieceDogLeft';

export class Board {
    private _rows: number;
    private _columns: number;
    private _grid: number[][];
    private _pieces: PieceBase[];
    private _currentPiece: PieceBase | null;
    private _currentRow: number;
    private _currentColumn: number;
    private _lineCount: number;
    private _gameOver: boolean;

    constructor(rows: number = 20, columns: number = 10) {
        this._rows = rows;
        this._columns = columns;
        this._grid = this._createEmptyGrid();

        // Catálogo de piezas disponibles para elegir al azar en addPiece()
        this._pieces = [
            new PieceSquare(),
            new PieceT(),
            new PieceStick(),
            new PieceLRight(),
            new PieceLLeft(),
            new PieceDogRight(),
            new PieceDogLeft()
        ];

        this._currentPiece = null;
        this._currentRow = 0;
        this._currentColumn = 0;
        this._lineCount = 0;
        this._gameOver = false;
    }

    // Getters y Setters públicos
    public get rows(): number {
        return this._rows;
    }

    public set rows(value: number) {
        this._rows = value;
    }

    public get columns(): number {
        return this._columns;
    }

    public set columns(value: number) {
        this._columns = value;
    }

    public get grid(): number[][] {
        return this._grid;
    }

    public set grid(value: number[][]) {
        this._grid = value;
    }

    public get pieces(): PieceBase[] {
        return this._pieces;
    }

    public set pieces(value: PieceBase[]) {
        this._pieces = value;
    }

    public get currentPiece(): PieceBase | null {
        return this._currentPiece;
    }

    public set currentPiece(value: PieceBase | null) {
        this._currentPiece = value;
    }

    public get currentRow(): number {
        return this._currentRow;
    }

    public set currentRow(value: number) {
        this._currentRow = value;
    }

    public get currentColumn(): number {
        return this._currentColumn;
    }

    public set currentColumn(value: number) {
        this._currentColumn = value;
    }

    public get lineCount(): number {
        return this._lineCount;
    }

    public set lineCount(value: number) {
        this._lineCount = value;
    }

    public get gameOver(): boolean {
        return this._gameOver;
    }

    public set gameOver(value: boolean) {
        this._gameOver = value;
    }

    // Métodos públicos del tablero
    public addPiece(): boolean {
        if (this._gameOver) {
            return false;
        }

        const piece = this._createRandomPiece();

        // Requerimiento: al agregar la pieza, se rota al azar antes de ubicarla
        const rotations = Math.floor(Math.random() * 4);
        for (let i = 0; i < rotations; i++) {
            piece.rotateRight();
        }

        const width = piece.shape[0].length;
        const maxColumn = this._columns - width;
        const column = Math.floor(Math.random() * (maxColumn + 1));

        if (!this._fits(piece.shape, 0, column)) {
            this._gameOver = true;
            this._currentPiece = null;
            return false;
        }

        this._currentPiece = piece;
        this._currentRow = 0;
        this._currentColumn = column;
        return true;
    }

    public moveDown(): boolean {
        const piece = this._currentPiece;

        if (piece === null || this._gameOver) {
            return false;
        }

        const nextRow = this._currentRow + 1;

        if (this._fits(piece.shape, nextRow, this._currentColumn)) {
            this._currentRow = nextRow;
            return true;
        }

        // No puede bajar más: se fija en el tablero y se intenta la próxima pieza
        this._lockCurrentPiece(piece);
        this._clearFullLines();
        this.addPiece();
        return false;
    }

    public rotateRight(): boolean {
        const piece = this._currentPiece;

        if (piece === null) {
            return false;
        }

        piece.rotateRight();

        if (this._fits(piece.shape, this._currentRow, this._currentColumn)) {
            return true;
        }

        // No entra girada: se deja la pieza como estaba
        piece.rotateLeft();
        return false;
    }

    public rotateLeft(): boolean {
        const piece = this._currentPiece;

        if (piece === null) {
            return false;
        }

        piece.rotateLeft();

        if (this._fits(piece.shape, this._currentRow, this._currentColumn)) {
            return true;
        }

        piece.rotateRight();
        return false;
    }

    // Utilidades que ya venían de la otra versión de Board (rama
    // tablero-design); las dejamos pero apoyadas en _fits/_grid en vez de
    // las propiedades públicas que tenía esa version

    public hasCollision(piece: PieceBase, x: number, y: number): boolean {
        return !this._fits(piece.shape, y, x);
    }

    public drawWithPiece(piece: PieceBase, pieceX: number, pieceY: number): void {
        const rendered = this._grid.map((row) => [...row]);
        const shape = piece.shape;

        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] === 0) {
                    continue;
                }

                const boardX = pieceX + col;
                const boardY = pieceY + row;

                if (this._isRowInsideBoard(boardY) && this._isColumnInsideBoard(boardX)) {
                    rendered[boardY][boardX] = shape[row][col];
                }
            }
        }

        let output = '';

        for (let y = 0; y < rendered.length; y++) {
            output += '|';
            for (let x = 0; x < rendered[y].length; x++) {
                output += rendered[y][x] === 0 ? ' . ' : ' []';
            }
            output += '|\n';
        }

        output += '+' + Array.from({ length: this._columns }, () => '---').join('') + '+\n';
        console.log(output);
    }

    // Métodos privados

    // Se separan en dos chequeos de una sola condición cada uno para no
    // amontonar cuatro comparaciones en un mismo if (drawWithPiece las
    // combinaba las cuatro con &&, quedaba dificil de leer de un vistazo)
    private _isRowInsideBoard(row: number): boolean {
        return row >= 0 && row < this._rows;
    }

    private _isColumnInsideBoard(column: number): boolean {
        return column >= 0 && column < this._columns;
    }

    private _createEmptyGrid(): number[][] {
        const grid: number[][] = [];

        for (let i = 0; i < this._rows; i++) {
            grid.push(new Array(this._columns).fill(0));
        }

        return grid;
    }

    private _createRandomPiece(): PieceBase {
        const index = Math.floor(Math.random() * this._pieces.length);
        const chosenName = this._pieces[index].name;

        switch (chosenName) {
            case 'Square':
                return new PieceSquare();
            case 'T':
                return new PieceT();
            case 'Stick':
                return new PieceStick();
            case 'LRight':
                return new PieceLRight();
            case 'LLeft':
                return new PieceLLeft();
            case 'DogRight':
                return new PieceDogRight();
            case 'DogLeft':
                return new PieceDogLeft();
            default:
                return new PieceSquare();
        }
    }

    private _fits(shape: number[][], row: number, column: number): boolean {
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j] === 0) {
                    continue;
                }

                const boardRow = row + i;
                const boardColumn = column + j;

                if (boardColumn < 0 || boardColumn >= this._columns) {
                    return false;
                }

                if (boardRow >= this._rows) {
                    return false;
                }

                if (boardRow >= 0 && this._grid[boardRow][boardColumn] !== 0) {
                    return false;
                }
            }
        }

        return true;
    }

    private _lockCurrentPiece(piece: PieceBase): void {
        const shape = piece.shape;

        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j] !== 0) {
                    this._grid[this._currentRow + i][this._currentColumn + j] = 1;
                }
            }
        }
    }

    private _clearFullLines(): void {
        let row = this._rows - 1;

        while (row >= 0) {
            const isFull = this._grid[row].every((cell) => cell !== 0);

            if (!isFull) {
                row--;
                continue;
            }

            this._grid.splice(row, 1);
            this._grid.unshift(new Array(this._columns).fill(0));
            this._lineCount++;
            // no bajamos "row": la fila de arriba ahora ocupa esta misma posición
        }
    }
}
