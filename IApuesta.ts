export interface IApuesta {   

   realizarApuesta(valor: number): string; //esta para los demas juegos donde se pasa solo la apuesta
   realizarApuesta(valor: number, numeroElegido: number): string; // esta la uso en ruleta, paso la apuesta y un numero (podria usarse en los dados)
}

