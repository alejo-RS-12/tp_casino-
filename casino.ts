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
 
  
  abstract realizarApuesta(valor: number): string;

  protected esApuestaValida(valor: number): boolean {
    return valor >= this.valorMinimo && this.usuario.saldo >= valor;
  }

  protected actualizarSaldo(gano: boolean, monto: number): void {
    if (gano) {
      this.usuario.saldo += monto;
    } else {
      this.usuario.saldo = this.usuario.saldo - monto;
    }
  }
}