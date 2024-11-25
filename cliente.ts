export class Cliente {
    public nombre: string;
    public saldo: number;
  
    constructor(nombre: string, saldo: number) {
      this.nombre = nombre;
      this.saldo = saldo;
    }
  
    public getNombre(): string {
      return this.nombre;
    }
  
    public setNombre(nombre: string): void {
      this.nombre = nombre;
    }
  
    public getSaldo(): number {
      return this.saldo;
    }
  
    public setSaldo(saldo: number): void {
      this.saldo = saldo;
    }
  }
  //el registrar al cliente y cargarle el saldo principal se hace por consola y se instancia en el main