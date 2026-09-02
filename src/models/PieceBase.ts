import { IRotator } from '../interfaces/IRotator';

export abstract class PieceBase implements IRotator {
    private _name: string;
    private _shape: number[][];

    constructor(name: string, shape: number[][]) {
        this._name = name;
        this._shape = shape;
    }

    // Getters y Setters públicos
    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get shape(): number[][] {
        return this._shape;
    }

    public set shape(value: number[][]) {
        this._shape = value;
    }

    // Métodos públicos de rotación
    public rotateRight(): void {
        const rows = this._shape.length;
        const cols = this._shape[0].length;
        const rotated: number[][] = [];

        for (let col = 0; col < cols; col++) {
            const newRow: number[] = [];
            for (let row = rows - 1; row >= 0; row--) {
                newRow.push(this._shape[row][col]);
            }
            rotated.push(newRow);
        }

        this._shape = rotated;
    }

    public rotateLeft(): void {
        const rows = this._shape.length;
        const cols = this._shape[0].length;
        const rotated: number[][] = [];

        for (let col = cols - 1; col >= 0; col--) {
            const newRow: number[] = [];
            for (let row = 0; row < rows; row++) {
                newRow.push(this._shape[row][col]);
            }
            rotated.push(newRow);
        }

        this._shape = rotated;
    }
}