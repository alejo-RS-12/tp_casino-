import { Tragamonedas } from "./Tragamonedas";
import { Cliente } from "./cliente";

export class Tragamonedas50 extends Tragamonedas {
  constructor(cliente: Cliente) {
    super("Tragamonedas 50%", 1.0, 0.50, cliente); // Pasa nombre del juego, apuesta mínima, probabilidad y cliente
  }

  public calcularGanancia(): number {
    const random = Math.random();
    if (random <= this.probabilidadGanancia) {
      return this.cantidadApuesta * 2; // Gana el doble de lo apostado
    } else {
      return 0; // No hay ganancia
    }
  }

  public realizarApuesta(cantidad: number): string {
    super.realizarApuesta(cantidad); // Valida la apuesta y descuenta el saldo
    if (this.cantidadApuesta === 0) {
      return "La apuesta no es válida.";
    }

    const ganancia = this.calcularGanancia();
    if (ganancia > 0) {
      this.actualizarSaldo(true, ganancia);
      return `🎉 ¡Ganaste! Has ganado ${ganancia}. Saldo actual: ${this.usuario.saldo}`;
    } else {
      return `😢 No ganaste esta vez. Saldo actual: ${this.usuario.saldo}`;
    }
  }
}
