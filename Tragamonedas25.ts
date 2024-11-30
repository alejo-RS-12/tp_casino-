import { Tragamonedas } from "./Tragamonedas";
import { Cliente } from "./cliente";

export class Tragamonedas25 extends Tragamonedas {
  constructor(cliente: Cliente) {
    super("Tragamonedas 25%", 1.0, 0.25, cliente); // Pasa nombre del juego, apuesta mínima, probabilidad y cliente
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
    // Valido si la apuesta es válida antes de intentar realizarla
    if (cantidad < this.valorMinimo) {
      return `La apuesta mínima es ${this.valorMinimo}.`;
    }
    
    if (cantidad > this.usuario.saldo) {
      return `No tienes suficiente saldo para esta apuesta. Saldo actual: ${this.usuario.saldo}`;
    }

    // Si la apuesta es válida, se procede con el cálculo
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
