import { Cliente } from "./cliente"; //traigo la clase Usuario, con su nombre y su saldo
import { Casino } from "./casino"; // traigo nombre, apuestaMinima

export class Ruleta extends Casino {
  constructor(usuario: Cliente) {
    super("Ruleta Clasica", 50, usuario); // aca defino el nombre del juego, la apuesta minima, y el usuario
  }

  public realizarApuesta(valor: number, numeroElegido?: number): string {
    //aca implemento el método de la Interface
    if (!this.esApuestaValida(valor)) {
      return `Apuesta mínima de ${this.valorMinimo}`; // si retorna FALSE muestra este mensaje
    }
    if ( numeroElegido === undefined || numeroElegido < 0 || numeroElegido > 36 ) {
      return "El numero elegido debe estar entre 0 y 36.";
    } 
    this.usuario.saldo -= valor; //descuenta el monto de la apuesta despues de validar numero elegido y monto de la apuesta
    console.log("Girando la ruleta...");
    let numeroGanador = this.simularRuleta(); //Simula el giro de la ruleta
    console.log(`La bolilla cayo en el numero: ${numeroGanador}`);

    if (numeroElegido === numeroGanador) {
      let ganancia = valor * 36;
      this.actualizarSaldo(true, ganancia); 
      return `Ganaste en ${this.nombre}! Ganancia: ${ganancia}. Saldo actual: ${this.usuario.saldo}`;
    } else {
      return `Perdiste en ${this.nombre}. Saldo actual: ${this.usuario.saldo}. Mas suerte para la proxima vez!`;
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