export interface IApuesta {   

   realizarApuesta(valor: number): string; //esta para los demas juegos donde se pasa solo la apuesta
   realizarApuesta(valor: number, numeroElegido: number): string; // esta la uso en ruleta, paso la apuesta y un numero (podria usarse en los dados)
}

  // La Interface Apuesta contiene el metodo realizarApuesta que debe implementarse en todos los juegos.
  // Debe ser importada al inicio en Casino.ts e implements en su clase. Algo así:
  //
  // import { IApuesta } from "../interfaces/IApuesta";
  // export abstract class Casino implements IApuesta {  ....
  //
  // y luego debe implementar el metodo: 
  // abstract realizarApuesta(valor: number): string;
  //
  //  todo dentro de Casino.ts y la clase Casino.