import { Tragamonedas } from './Tragamonedas';

export class Tragamonedas25 extends Tragamonedas {
  constructor() {
    super(1.0, 0.25); // Mínimo de apuesta 1.0 y 25% de probabilidad de ganar
  }

  calcularGanancia(): number {
    const random = Math.random();
    if (random <= this.probabilidadGanancia) {
      return this.cantidadApuesta * 2;
    } else {
      return 0;
    }
  }
}