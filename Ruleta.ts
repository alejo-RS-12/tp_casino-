import { Cliente } from "./cliente"; //traigo la clase Usuario, con su nombre y su saldo
import { Casino } from "./casino"; // traigo nombre, apuestaMinima

export class Ruleta extends Casino {
  constructor(usuario: Cliente) {
    super("Ruleta Clasica", 50, usuario); // aca defino el nombre del juego, la apuesta minima, y el usuario
  }

  public realizarApuesta(valor: number, numeroElegido?: number): string {
    // Validar que el número elegido sea un número
    if (typeof numeroElegido !== "number" || isNaN(numeroElegido)) {
      return "El número elegido tiene que ser entre 0 y 36.";
    }
  
    // Validar que el monto de la apuesta sea mayor o igual al mínimo y menor o igual al saldo actual
    if (!this.esApuestaValida(valor)) {
      return `La apuesta no es válida. Debe ser de al menos ${this.valorMinimo} y no exceder el saldo disponible (${this.usuario.saldo}).`;
  }
  
    // Validar que el número elegido esté dentro del rango permitido
    if (numeroElegido < 0 || numeroElegido > 36) {
      return "El número elegido tiene que ser entre 0 y 36.";
    }
  
    // Procesar la apuesta
    this.usuario.saldo -= valor; // Descuenta el monto de la apuesta después de validar el número elegido y el monto de la apuesta
    console.log("Girando la ruleta...");
    let numeroGanador = this.simularRuleta(); // Simula el giro de la ruleta
    console.log(`La bolilla cayó en el número: ${numeroGanador}`);
  
    if (numeroElegido === numeroGanador) {
      let ganancia = valor * 36;
      this.actualizarSaldo(true, ganancia);
      return `¡Ganaste en ${this.nombre}! Ganancia: ${ganancia}. Saldo actual: ${this.usuario.saldo}`;
    } else {
      return `Perdiste en ${this.nombre}. Saldo actual: ${this.usuario.saldo}. ¡Más suerte para la próxima vez!`;
    }
  }
  

  private simularRuleta(): number {
    let numeroActual: number;
    console.clear();
    for (let i = 0; i < 20; i++) {
      numeroActual = Math.floor(Math.random() * 37); // Genera un número aleatorio entre 0 y 36
      console.log(`Número actual: ${numeroActual}`);
      this.esperar(200); // Aplica una pausa de 200 ms para simular los numeros por donde pasa la bolilla de la ruleta
      console.clear();
    }
    return numeroActual!;
  }

  private esperar(ms: number): void {
    // Pausa la ejecución hasta que llegue a los "ms" asignados (milisegiundos)
    let start = new Date().getTime();
    while (new Date().getTime() - start < ms) {}
  }
}