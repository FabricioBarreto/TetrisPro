import { Tetris } from "../src/Tetris";
import { describe, it, expect } from "vitest";

describe("Preparar entorno", () => {
  it("puede crear una instancia de Tetris", () => {
    const t = new Tetris();
    expect(t).not.toBeNull();
  });
});

describe("Tetris", () => {
  it("todavia no arranco la partida al crearse", () => {
    const tetris = new Tetris();

    expect(tetris.started).toBe(false);
    expect(tetris.state().currentPiece).toBeNull();
  });

  it("start() marca la partida como iniciada y agrega la primera pieza", () => {
    const tetris = new Tetris();

    tetris.start();

    expect(tetris.started).toBe(true);
    expect(tetris.state().currentPiece).not.toBeNull();
  });

  it("tick() no hace nada si todavia no se llamo a start()", () => {
    const tetris = new Tetris();

    tetris.tick();

    expect(tetris.state().ticks).toBe(0);
  });

  it("tick() le pide un tick al reloj y baja la pieza actual en el tablero", () => {
    const tetris = new Tetris();
    tetris.start();

    const filaInicial = tetris.board.currentRow;
    tetris.tick();

    expect(tetris.state().ticks).toBe(1);
    expect(tetris.board.currentRow).toBe(filaInicial + 1);
  });

  it("rotateLeft y rotateRight delegan la rotacion en el tablero", () => {
    const tetris = new Tetris();
    tetris.start();

    const giroDerecha = tetris.rotateRight();
    const giroIzquierda = tetris.rotateLeft();

    expect(typeof giroDerecha).toBe("boolean");
    expect(typeof giroIzquierda).toBe("boolean");
  });

  it("state() expone el tablero, la pieza actual, las lineas y el game over", () => {
    const tetris = new Tetris();
    tetris.start();

    const estado = tetris.state();

    expect(estado.grid.length).toBe(20);
    expect(estado.grid[0].length).toBe(10);
    expect(estado.currentPiece).not.toBeNull();
    expect(estado.lineCount).toBe(0);
    expect(estado.gameOver).toBe(false);
    expect(estado.won).toBe(false);
  });

  it("la cantidad de lineas para ganar se puede configurar", () => {
    const tetris = new Tetris(3);

    expect(tetris.targetLines).toBe(3);

    tetris.targetLines = 8;
    expect(tetris.targetLines).toBe(8);
  });

  it("el juego queda ganado al llegar a las lineas objetivo", () => {
    const tetris = new Tetris(5);
    tetris.board.lineCount = 5;

    expect(tetris.state().won).toBe(true);
  });

  it("tick() no hace nada si el juego ya se gano", () => {
    const tetris = new Tetris(1);
    tetris.start();
    tetris.board.lineCount = 1;

    tetris.tick();

    expect(tetris.state().ticks).toBe(0);
  });

  it("tick() no hace nada si el tablero esta en game over", () => {
    const tetris = new Tetris();
    tetris.start();
    tetris.board.gameOver = true;

    tetris.tick();

    expect(tetris.state().ticks).toBe(0);
  });

  it("el tablero, el reloj y el estado de inicio se pueden leer y modificar por getter/setter", () => {
    const tetris = new Tetris();
    const otroTablero = new Tetris().board;
    const otroReloj = new Tetris().clock;

    tetris.board = otroTablero;
    tetris.clock = otroReloj;
    tetris.started = true;

    expect(tetris.board).toBe(otroTablero);
    expect(tetris.clock).toBe(otroReloj);
    expect(tetris.started).toBe(true);
  });
});
