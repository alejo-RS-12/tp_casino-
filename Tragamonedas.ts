import { Juego } from './juego';

export abstract class Tragamonedas extends Juego {
  protected valorMinimoApuesta: number;
  protected probabilidadGanancia: number;
  protected cantidadApuesta: number;

  constructor(valorMinimoApuesta: number, probabilidadGanancia: number) {
    super();
    this.valorMinimoApuesta = valorMinimoApuesta;
    this.probabilidadGanancia = probabilidadGanancia;
    this.cantidadApuesta = 0;
  }

  realizarApuesta(cantidad: number): void {
    if (cantidad >= this.valorMinimoApuesta) {
      this.cantidadApuesta = cantidad;
    } else {
      console.log(`La apuesta debe ser mayor o igual al valor mínimo: ${this.valorMinimoApuesta}`);
      this.cantidadApuesta = 0;
    }
  }

  abstract calcularGanancia(): number;
}