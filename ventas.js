module.exports = menuVentas;



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

async function menuVentas (arrayVentas,arrayProductos,arrayUsuarios){
    let menuSeleccionVentas;
    console.log(arrayProductos);
    console.log(arrayUsuarios);

  while (menuSeleccionVentas !== 6) {
    menuSeleccionVentas = parseInt(
      await capturarValor("digite la accion a realizar: 1. Crear Venta, 2. Mostrar , 3. Actualizar , 4.Eliminar, 5 Buscar, 6 Salir del modulo de Ventas :...  " )
    );

    switch (menuSeleccionVentas) {

      case 1:
        console.log(`Crear una Venta`);
        
       
        break;

      case 2:
        console.log(`Mostrar una Venta:`);        
               
        break;
      case 3:
        console.log(`Actualizar una Venta`);
        
        break;

      case 4:
        console.log(`Eliminar una Venta`);
        
        break;
      case 5:
        console.log(`Buscar una Venta`);
     
      case 6:
        console.log(`Saliendo.....`);
        
               
        break;

      default:
        console.log("digite una opcion valida");
        break;
    }
  }
}

async function crearVenta (){
    
   
    
}