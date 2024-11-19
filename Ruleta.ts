import { Usuario } from "./Usuario"; //traigo la clase Usuario, con su nombre y su saldo
import { Casino } from "./Casino"; // traigo nombre, apuestaMinima

export class Ruleta extends Casino {
  constructor(usuario: Usuario) {
    super("Ruleta Clasica", 50, usuario); // aca defino el nombre del juego, la apuesta minima, y el usuario
  }

  public realizarApuesta(valor: number, numeroElegido?: number): string {
    //aca implemento el método de la Interface
    if (!this.esApuestaValida(valor)) {
      // esta validacion deberia estar en Casino.ts, igual la agrego al final de este archivo
      return `Apuesta mínima de ${this.valorMinimo}`; // si retorna FALSE muestra este mensaje
    }
    if ( numeroElegido === undefined || numeroElegido < 0 || numeroElegido > 36 ) {
      return "El numero elegido debe estar entre 0 y 36.";
    } // VERIFICAR!!! a veces ME TIRA ERROR CON ESTA VALIDACION
    this.usuario.saldo -= valor; //descuenta el monto de la apuesta despues de validar numero elegido y monto de la apuesta
    console.log("Girando la ruleta...");
    let numeroGanador = this.simularRuleta(); //Simula el giro de la ruleta
    console.log(`La bolilla cayo en el numero: ${numeroGanador}`);

    if (numeroElegido === numeroGanador) {
      let ganancia = valor * 36;
      this.actualizarSaldo(true, ganancia); // este metodo deberia estar en Casino.ts, igual la agrego al final de este archivo
      // this.usuario.saldo += ganancia;  // le paga el pleno multiplicado * 36  SI NO AGREGAMOS EL METODO actualizarSaldo en CASINO.ts iria una instruccion asi
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
    // Pausa la ejecución hasta que lleague a los "ms" asignados (milisegiundos)
    let start = new Date().getTime();
    while (new Date().getTime() - start < ms) {}
  }
}

/* Para mi esta validacion deberia ir en Casino.ts:

protected esApuestaValida(valor: number): boolean {
  return valor >= this.valorMinimo && this.usuario.saldo >= valor;
}
Retorna TRUE si el valor de la apuesta es mayor o igual al de valorMinimo de apuesta en el juego 
y si le alcanza al usuario el saldo que tiene para apostar.

*/

/* Tambien en Casino.ts deberia estar el metodo actualizarSaldo que se usaria cuando 
ganas o perdes en cualquier juego, sumando la ganancia o restando el valor de la apuesta.

protected actualizarSaldo(gano: boolean, monto: number): void {
    if (gano) {
      this.usuario.saldo += monto;
    } else {
      this.usuario.saldo -= monto;
    }
  }
*/
