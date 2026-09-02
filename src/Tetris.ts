import { Board } from './models/Board';
import { Clock } from './models/Clock';
import { PieceBase } from './models/PieceBase';

export interface TetrisState {
    grid: number[][];
    currentPiece: PieceBase | null;
    lineCount: number;
    gameOver: boolean;
    won: boolean;
    started: boolean;
    ticks: number;
}

export class Tetris {
    private _board: Board;
    private _clock: Clock;
    private _targetLines: number;
    private _started: boolean;

    constructor(targetLines: number = 5) {
        this._board = new Board();
        this._clock = new Clock();
        this._targetLines = targetLines;
        this._started = false;
    }

    // Getters y Setters públicos
    public get board(): Board {
        return this._board;
    }

    public set board(value: Board) {
        this._board = value;
    }

    public get clock(): Clock {
        return this._clock;
    }

    public set clock(value: Clock) {
        this._clock = value;
    }

    public get targetLines(): number {
        return this._targetLines;
    }

    public set targetLines(value: number) {
        this._targetLines = value;
    }

    public get started(): boolean {
        return this._started;
    }

    public set started(value: boolean) {
        this._started = value;
    }

    // Métodos públicos
    public start(): void {
        this._started = true;
        this._board.addPiece();
    }

    public tick(): void {
        if (!this._canPlay()) {
            return;
        }

        this._clock.tick();
        this._board.moveDown();
    }

    public rotateLeft(): boolean {
        return this._board.rotateLeft();
    }

    public rotateRight(): boolean {
        return this._board.rotateRight();
    }

    public state(): TetrisState {
        return {
            grid: this._board.grid,
            currentPiece: this._board.currentPiece,
            lineCount: this._board.lineCount,
            gameOver: this._board.gameOver,
            won: this._hasWon(),
            started: this._started,
            ticks: this._clock.ticks
        };
    }

    // Métodos privados

    // Se parte en dos para no juntar tres condiciones en un mismo if de
    // tick() (estaba !this._started || this._board.gameOver || this._hasWon(),
    // quedaban tres cosas distintas en una sola linea)
    private _isBoardActive(): boolean {
        return !this._board.gameOver && !this._hasWon();
    }

    private _canPlay(): boolean {
        return this._started && this._isBoardActive();
    }

    private _hasWon(): boolean {
        return this._board.lineCount >= this._targetLines;
    }
}
