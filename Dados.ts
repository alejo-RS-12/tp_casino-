import { Casino } from './casino';
import { Cliente } from './cliente';

export class JuegoDeDados extends Casino {
    private _dado1: number;
    private _dado2: number;

    constructor(nombre: string, valorMinimo: number, usuario: Cliente) {
        super(nombre, valorMinimo, usuario);
        this._dado1 = 0;
        this._dado2 = 0;
    }

    // Getters
    get dado1(): number {
        return this._dado1;
    }

    get dado2(): number {
        return this._dado2;
    }

    // Setters
    set dado1(valor: number) {
        this._dado1 = valor;
    }

    set dado2(valor: number) {
        this._dado2 = valor;
    }

    // Método para lanzar los dados, obtener resultado random
    private lanzarDados(): void {
        this.dado1 = Math.floor(Math.random() * 6) + 1;
        this.dado2 = Math.floor(Math.random() * 6) + 1;
        console.log("🎲 ", this.dado1, " + 🎲 ", this.dado2, " = " );
    }

    // Método Obtener Resultado, es la suma de los dados
    private obtenerResultado(): number {
        let resul:number;
        resul = this.dado1 + this.dado2; 
        console.log("    🌟 ", resul, " 🌟");
        
        return resul
    }

    // Realizar apuesta
    public realizarApuesta(valor: number): string {
        if (!this.esApuestaValida(valor)) {
            return `La apuesta no es válida. Debe ser de al menos ${this.valorMinimo} y no exceder el saldo disponible (${this.usuario.saldo})`;
        }

        this.lanzarDados();
        let resultado = this.obtenerResultado();

        
        if (resultado === 7 || resultado === 11) {
            this.actualizarSaldo(true, valor);
            return `🎲 Resultado: ${resultado}. ¡Ganaste! Has ganado ${valor}. Saldo actual: ${this.usuario.saldo}.`;
        } else if (resultado === 2 || resultado === 3 || resultado === 12) {
            this.actualizarSaldo(false, valor);
            return `🎲 Resultado: ${resultado}. Perdiste. Has perdido ${valor}. Saldo actual: ${this.usuario.saldo}.`;
        } else {
            return this.segundaEtapa(resultado, valor);
        }
    }

    // Método para la segunda etapa (puntuar)
    private segundaEtapa(punto: number, valor: number): string {
        let resultado: number;
        console.log("Has pasado a la segunta etapa. ¡Sigue intentando conseguir el mismo valor que el punto!");
        do {
            console.log ("Lanza los dados!!!");
            this.lanzarDados();
            resultado = this.obtenerResultado();
            if (resultado === 7) {                   //verifica si el resultado es 7. Si es así, el jugador pierde.
                this.actualizarSaldo(false, valor); //Descuenta el saldo del jugador
                return `🎲 Resultado: ${resultado}. Perdiste. Has perdido ${valor}. Saldo actual: ${this.usuario.saldo}.`;
            }
        } while (resultado !== punto); /* Verifica si resultado no es igual a punto, lo que significa que el bucle seguirá 
                                        ejecutándose hasta que el jugador obtenga el mismo valor que el "punto".*/

        this.actualizarSaldo(true, valor);
        return `🎲 Resultado: ${resultado}. ¡Ganaste! Has ganado ${valor}. Saldo actual: ${this.usuario.saldo}.`;
    }
}