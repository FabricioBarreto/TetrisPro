export class Clock {
    private _ticks: number;

    constructor() {
        this._ticks = 0;
    }

    // Getter y Setter público
    public get ticks(): number {
        return this._ticks;
    }

    public set ticks(value: number) {
        this._ticks = value;
    }

    // Método público
    public tick(): number {
        // No usamos hora real ni setInterval: el reloj solo cuenta cuántas
        // veces lo "empujaron" desde afuera (lo llama Tetris.tick())
        this._ticks++;
        return this._ticks;
    }
}
