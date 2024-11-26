import { Cliente } from "./cliente";
import { Tragamonedas25 } from "./Tragamonedas25";
import { Tragamonedas50 } from "./Tragamonedas50";
import { Ruleta } from "./Ruleta";
import { JuegoDeDados } from "./Dados";
import * as readlineSync from "readline-sync";
import * as fs from "fs";

function leerInstrucciones(archivo: string): void {//funcion para leer los archivos txt que tienen las instrucciones
  try {
    const instrucciones = fs.readFileSync(archivo, "utf-8");
    console.log(instrucciones);
  } catch (error) {
    console.error(`No se pudo leer el archivo ${archivo}. Verifica que existe y tiene permisos de lectura.`);
  }
}

function recargarSaldo(cliente: Cliente): void {//toma del cliente el parametro saldo y pregunta caunto recarga
  const monto = parseFloat(readlineSync.question("Cuánto saldo deseas recargar? Ingresa el monto: "));
  if (isNaN(monto) || monto <= 0) {// validacion del monto introducido 
    console.log("Monto inválido. No se recargó saldo.");
  } else {
    cliente.setSaldo(cliente.getSaldo() + monto);
    console.log(`Saldo recargado. Saldo actual: ${cliente.getSaldo()}`);
  }
}

function mostrarMenu(): void {
  console.log("\n=== Bienvenido al Casino ===");
  console.log("1. Jugar a la Tragamonedas 25%");
  console.log("2. Jugar a la Tragamonedas 50%");
  console.log("3. Jugar a la Ruleta");
  console.log("4. Jugar a los Dados");
  console.log("5. Recargar saldo");
  console.log("6. Salir");
}

function main(): void {
  const nombre = readlineSync.question("Ingresa tu nombre: ");
  const saldoInicial = parseFloat(readlineSync.question("Ingresa tu saldo inicial: "));//solicita el saldo inicial y se valida que sea un número positivo. Si no es válido, se asigna un saldo de 
  const cliente = new Cliente(nombre, isNaN(saldoInicial) || saldoInicial < 0 ? 0 : saldoInicial);// crea el nombre y el saldo inicil del cliente

  console.log(`¡Bienvenido ${cliente.getNombre()}! Saldo actual: ${cliente.getSaldo()}`);// mensaje de bievenida con los datos del cliente
// se crean instancias de los juegos y se vincula al cliente
  const tragamonedas25 = new Tragamonedas25(cliente);
  const tragamonedas50 = new Tragamonedas50(cliente);
  const ruleta = new Ruleta(cliente);
  const dados = new JuegoDeDados("Juego de Dados", 50, cliente);

  //bucle do-while mantiene al progama estable para que el usuario pueda usarlo hasta usar la opcion salirs
  let opcion: string;
  do {
    mostrarMenu();// se llama a esta funcion para mostrar el menu con los juegos
    opcion = readlineSync.question("Selecciona una opcion: ");

    switch (opcion) {
      case "1": {
        leerInstrucciones("tragamonedas25.txt");// lee las instrucciones del juego antes de poder jugar 
        let seguirJugando = true;
        do {
          const apuesta = parseFloat(readlineSync.question("Ingresa el monto de tu apuesta: "));
          console.log(tragamonedas25.realizarApuesta(apuesta));

          if (cliente.getSaldo() <= 0) {
            console.log("Te has quedado sin saldo.");
            const deseaRecargar = readlineSync.question("Deseas recargar saldo? (si/no): ").toLowerCase();
            if (deseaRecargar === "si") {
              recargarSaldo(cliente);
            } else {
              console.log("Gracias por jugar. Volviendo al menú principal.");
              break;
            }
          }

          const deseaSeguir = readlineSync.question("Quieres seguir jugando? (si/no): ").toLowerCase();
          if (deseaSeguir !== "si") {
            seguirJugando = false;
          }
        } while (seguirJugando);
        break;
      }

      case "2": {
        leerInstrucciones("tragamonedas50.txt");
        let seguirJugando = true;
        do {
          const apuesta = parseFloat(readlineSync.question("Ingresa el monto de tu apuesta: "));
          console.log(tragamonedas50.realizarApuesta(apuesta));

          if (cliente.getSaldo() <= 0) {
            console.log("Te has quedado sin saldo.");
            const deseaRecargar = readlineSync.question("Deseas recargar saldo? (si/no): ").toLowerCase();
            if (deseaRecargar === "si") {
              recargarSaldo(cliente);
            } else {
              console.log("Gracias por jugar. Volviendo al menú principal.");
              break;
            }
          }

          const deseaSeguir = readlineSync.question("Quieres seguir jugando? (si/no): ").toLowerCase();
          if (deseaSeguir !== "si") {
            seguirJugando = false;
          }
        } while (seguirJugando);
        break;
      }

      case "3": {
        leerInstrucciones("ruleta.txt");
        let seguirJugando = true;
        do {
          const apuesta = parseFloat(readlineSync.question("Ingresa el monto de tu apuesta: "));
          const numero = parseInt(readlineSync.question("Elige un número entre 0 y 36: "));
          console.log(ruleta.realizarApuesta(apuesta, numero));

          if (cliente.getSaldo() <= 0) {
            console.log("Te has quedado sin saldo.");
            const deseaRecargar = readlineSync.question("Deseas recargar saldo? (si/no): ").toLowerCase();
            if (deseaRecargar === "si") {
              recargarSaldo(cliente);
            } else {
              console.log("Gracias por jugar. Volviendo al menú principal.");
              break;
            }
          }

          const deseaSeguir = readlineSync.question("Quieres seguir jugando? (si/no): ").toLowerCase();
          if (deseaSeguir !== "si") {
            seguirJugando = false;
          }
        } while (seguirJugando);
        break;
      }

      case "4": {
        leerInstrucciones("dados.txt");
        let seguirJugando = true;
        do {
          const apuesta = parseFloat(readlineSync.question("Ingresa el monto de tu apuesta: "));
          console.log(dados.realizarApuesta(apuesta));

          if (cliente.getSaldo() <= 0) {
            console.log("Te has quedado sin saldo.");
            const deseaRecargar = readlineSync.question("Deseas recargar saldo? (si/no): ").toLowerCase();
            if (deseaRecargar === "si") {
              recargarSaldo(cliente);
            } else {
              console.log("Gracias por jugar. Volviendo al menú principal.");
              break;
            }
          }

          const deseaSeguir = readlineSync.question("Quieres seguir jugando? (si/no): ").toLowerCase();
          if (deseaSeguir !== "si") {
            seguirJugando = false;
          }
        } while (seguirJugando);
        break;
      }

      case "5": {
        recargarSaldo(cliente);
        break;
      }

      case "6": {// finaliza el bucle y muesta los datos del cliente con un mensaje final
        console.log(`Gracias por jugar, ${cliente.getNombre()}. Saldo final: ${cliente.getSaldo()}`);
        break;
      }

      default: {// en caso de que el usuario elija una opcion incorrecta
        console.log("Opción inválida. Por favor, elige una opción del menú.");
      }
    }
  } while (opcion !== "6");
}

main();
