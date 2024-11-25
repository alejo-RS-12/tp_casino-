import { Casino } from "./casino";
import { Cliente } from "./cliente";

export abstract class Tragamonedas extends Casino {
  protected probabilidadGanancia: number; // Probabilidad de ganar (entre 0 y 1)
  protected cantidadApuesta: number; // Cantidad apostada en el juego

  constructor(nombreJuego: string, valorMinimoApuesta: number, probabilidadGanancia: number, cliente: Cliente) {
    super(nombreJuego, valorMinimoApuesta, cliente); // Pasa nombre del juego, apuesta mínima y cliente
    this.probabilidadGanancia = probabilidadGanancia;
    this.cantidadApuesta = 0;
  }

  public realizarApuesta(cantidad: number): string {
    if (!this.esApuestaValida(cantidad)) {
      return `La apuesta no es válida. Debe ser al menos ${this.valorMinimo} y no exceder el saldo disponible.`;
    }

    this.cantidadApuesta = cantidad;
    this.usuario.saldo -= cantidad; // Descuenta la apuesta del saldo del cliente

    const ganancia = this.calcularGanancia();
    if (ganancia > 0) {
      this.actualizarSaldo(true, ganancia);
      return `🎉 ¡Ganaste! Has ganado ${ganancia}. Saldo actual: ${this.usuario.saldo}`;
    } else {
      return `😢 No ganaste esta vez. Saldo actual: ${this.usuario.saldo}`;
    }
  }

  abstract calcularGanancia(): number;
}
