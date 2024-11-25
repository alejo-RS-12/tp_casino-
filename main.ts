import { Cliente } from "./cliente";
import { Tragamonedas25 } from "./Tragamonedas25";
import { Tragamonedas50 } from "./Tragamonedas50";
import { Ruleta } from "./Ruleta";
import { JuegoDeDados } from "./Dados";
import * as readlineSync from "readline-sync";

function recargarSaldo(cliente: Cliente): void {
  const monto = parseFloat(readlineSync.question(" Cuánto saldo deseas recargar? Ingresa el monto: "));
  if (isNaN(monto) || monto <= 0) {
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
  // Crear cliente
  const nombre = readlineSync.question("Ingresa tu nombre: ");
  const saldoInicial = parseFloat(readlineSync.question("Ingresa tu saldo inicial: "));
  const cliente = new Cliente(nombre, isNaN(saldoInicial) || saldoInicial < 0 ? 0 : saldoInicial);

  console.log(`¡Bienvenido ${cliente.getNombre()}! Saldo actual: ${cliente.getSaldo()}`);

  // Crear instancias de juegos
  const tragamonedas25 = new Tragamonedas25(cliente);
  const tragamonedas50 = new Tragamonedas50(cliente);
  const ruleta = new Ruleta(cliente);
  const dados = new JuegoDeDados("Juego de Dados", 50, cliente);

  let opcion: string;

  do {
    mostrarMenu();
    opcion = readlineSync.question("Selecciona una opcion: ");

    switch (opcion) {
      case "1": {
        let seguirJugando = true;
        do {
          const apuesta = parseFloat(readlineSync.question("Ingresa el monto de tu apuesta: "));
          console.log(tragamonedas25.realizarApuesta(apuesta));

          if (cliente.getSaldo() <= 0) {
            console.log("Te has quedado sin saldo.");
            const deseaRecargar = readlineSync.question(" Deseas recargar saldo? (si/no): ").toLowerCase();
            if (deseaRecargar === "si") {
              recargarSaldo(cliente);
            } else {
              console.log("Gracias por jugar. Volviendo al menú principal.");
              break;
            }
          }

          const deseaSeguir = readlineSync.question(" Quieres seguir jugando? (si/no): ").toLowerCase();
          if (deseaSeguir !== "si") {
            seguirJugando = false;
          }
        } while (seguirJugando);
        break;
      }

      case "2": {
        let seguirJugando = true;
        do {
          const apuesta = parseFloat(readlineSync.question("Ingresa el monto de tu apuesta: "));
          console.log(tragamonedas50.realizarApuesta(apuesta));

          if (cliente.getSaldo() <= 0) {
            console.log("Te has quedado sin saldo.");
            const deseaRecargar = readlineSync.question(" Deseas recargar saldo? (si/no): ").toLowerCase();
            if (deseaRecargar === "si") {
              recargarSaldo(cliente);
            } else {
              console.log("Gracias por jugar. Volviendo al menú principal.");
              break;
            }
          }

          const deseaSeguir = readlineSync.question(" Quieres seguir jugando? (si/no): ").toLowerCase();
          if (deseaSeguir !== "si") {
            seguirJugando = false;
          }
        } while (seguirJugando);
        break;
      }

      case "3": {
        let seguirJugando = true;
        do {
          const apuesta = parseFloat(readlineSync.question("Ingresa el monto de tu apuesta: "));
          const numero = parseInt(readlineSync.question("Elige un número entre 0 y 36: "));
          console.log(ruleta.realizarApuesta(apuesta, numero));

          if (cliente.getSaldo() <= 0) {
            console.log("Te has quedado sin saldo.");
            const deseaRecargar = readlineSync.question(" Deseas recargar saldo? (si/no): ").toLowerCase();
            if (deseaRecargar === "si") {
              recargarSaldo(cliente);
            } else {
              console.log("Gracias por jugar. Volviendo al menú principal.");
              break;
            }
          }

          const deseaSeguir = readlineSync.question(" Quieres seguir jugando? (si/no): ").toLowerCase();
          if (deseaSeguir !== "si") {
            seguirJugando = false;
          }
        } while (seguirJugando);
        break;
      }

      case "4": {
        let seguirJugando = true;
        do {
          const apuesta = parseFloat(readlineSync.question("Ingresa el monto de tu apuesta: "));
          console.log(dados.realizarApuesta(apuesta));

          if (cliente.getSaldo() <= 0) {
            console.log("Te has quedado sin saldo.");
            const deseaRecargar = readlineSync.question(" Deseas recargar saldo? (si/no): ").toLowerCase();
            if (deseaRecargar === "si") {
              recargarSaldo(cliente);
            } else {
              console.log("Gracias por jugar. Volviendo al menú principal.");
              break;
            }
          }

          const deseaSeguir = readlineSync.question(" Quieres seguir jugando? (si/no): ").toLowerCase();
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

      case "6": {
        console.log(`Gracias por jugar, ${cliente.getNombre()}. Saldo final: ${cliente.getSaldo()}`);
        break;
      }

      default: {
        console.log("Opción inválida. Por favor, elige una opción del menú.");
      }
    }
  } while (opcion !== "6");
}

main();
