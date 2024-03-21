const { on } = require("events");
const { copyFileSync } = require("fs");
const readline = require("readline");

function capturarValor(mensaje) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(mensaje, (respuesta) => {
      resolve(respuesta);
      rl.close();
    });
  });
}

async function main() {
    let arrayProductos = [];

  console.log("inventario de Productos");

  let accionRealizar;

  accionRealizar = parseInt(
    await capturarValor(
      "digite el modulo a revisar: 1. Productos, 2. Usuarios, 3. Ventas, 4. Inventario :..."
    )
  );

  switch (accionRealizar) {
    case 1:
      console.log("has seleccionado la seccion de PRODUCTOS");
      await menu(arrayProductos);

      break;

    case 2:
      console.log("has seleccionado la seccion de USUARIOS");

      break;

    case 3:
      console.log("has seleccionado la seccion de ACTUALIZAR");

      break;

    case 4:
      console.log("has seleccionado la seccion de ELIMINAR");

      break;

    default:
      console.log("digite una opcion valida");
      break;
  }
}
main();

///// CRUD PRODUCTO

async function menu(arrayProductos) {
  let menuSeleccion;

  while (menuSeleccion !== 6) {
    menuSeleccion = parseInt(
      await capturarValor(
        "digite la accion a realizar: 1. Crear, 2. Mostrar , 3. Actualizar , 4.Eliminar, 5 Buscar :...  "
      )
    );

    switch (menuSeleccion) {
      case 1:
        console.log(`Crear un Producto`);
       

        break;

      case 2:
        console.log(`Mostrar un Productos:`);
        
        break;
      case 3:
        console.log(`Actualizar un Producto`);
       

        break;

      case 4:
        console.log(`Eliminar un Producto`);
       

        break;
      case 5:
        console.log(`Buscar un Producto`);
       
  
        break;

      default:
        console.log("digite una opcion valida");
        break;
    }
  }
}
