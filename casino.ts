import { IApuesta } from "./IApuesta";
import { Cliente } from "./cliente";

export abstract class Casino implements IApuesta {
  protected _nombre: string;
  protected valorMinimo: number;
  public usuario: Cliente;

  constructor(nombre: string, valorMinimo: number, usuario: Cliente) {
    this._nombre = nombre;
    this.valorMinimo = 50;
    this.usuario = usuario;
  }


  get nombre(): string {
    return this._nombre;
  }
  get valorminimo(): number{
    return this.valorMinimo;
  }
 
  abstract realizarApuesta(valor: number): string;//realiza la logia para implementar una apuesta

  protected esApuestaValida(valor: number): boolean {// funcion para que el cliente agrege una apuesta valida mayor a $50 (valoeminimo)
    return valor >= this.valorMinimo && this.usuario.saldo >= valor;// el saldo del cliente debe ser suficiente para cubrir la apuesta
  }

  protected actualizarSaldo(gano: boolean, monto: number): void {//ajusta el sueldo del cliente dependiendo de si gana o pierde
    if (gano) {
      this.usuario.saldo += monto;
    } else {
      this.usuario.saldo = this.usuario.saldo - monto;
    }
  }
}