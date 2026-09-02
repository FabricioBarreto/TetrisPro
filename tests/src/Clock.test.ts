import { describe, test, expect } from 'vitest';
import { Clock } from '../../src/models/Clock';

describe('Clock Tests', () => {
    test('Debe crearse con el contador de ticks en 0', () => {
        const clock = new Clock();

        expect(clock.ticks).toBe(0);
    });

    test('tick debe avanzar el contador de a uno', () => {
        const clock = new Clock();

        clock.tick();

        expect(clock.ticks).toBe(1);
    });

    test('tick debe devolver el valor actualizado del contador', () => {
        const clock = new Clock();

        clock.tick();
        const segundoTick = clock.tick();

        expect(segundoTick).toBe(2);
    });

    test('varios tick seguidos suman de a uno cada vez', () => {
        const clock = new Clock();

        for (let i = 0; i < 5; i++) {
            clock.tick();
        }

        expect(clock.ticks).toBe(5);
    });

    test('el contador se puede leer y modificar por getter/setter', () => {
        const clock = new Clock();

        clock.ticks = 10;

        expect(clock.ticks).toBe(10);
    });
});
