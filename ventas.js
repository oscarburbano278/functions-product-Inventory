const {obtenerUsuarioId} = require('./crudUsuarios');
//const { obtenerProducto } = require('./inventory')

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
    arrayUsuarios= [ { id: 111, nombre_usuario: 'oscar', apellido: 'Burbano' },
                      { id: 222, nombre_usuario: 'david', apellido: 'vargas' },
                      { id: 333, nombre_usuario: 'jose', apellido: 'Tose' }]

    arrayProductos= [ { id: 444, nombre_producto: 'arroz', cantidad: 10, precio: 2000 },
                      { id: 555, nombre_producto: 'aceite', cantidad: 8, precio:5000  },
                      { id: 666, nombre_producto: 'frijol', cantidad: 15, precio: 3000 }]

    //console.log(arrayProductos);
    //console.log(arrayUsuarios);

  while (menuSeleccionVentas !== 6) {
    menuSeleccionVentas = parseInt(
      await capturarValor("digite la accion a realizar: 1. Crear Venta, 2. Mostrar , 3. Actualizar , 4.Eliminar, 5 Buscar, 6 Salir del modulo de Ventas :...  " )
    );

    switch (menuSeleccionVentas) {

      case 1:
        console.log(`Crear una Venta`);
        const usuario = await obtenerUsuarioId(arrayUsuarios);
        if (usuario === undefined) {
          console.log('usuario no encontrado');
          break
        }
        const productoSeleccionado = await obtenerProducto(arrayProductos);// obtener productos venta
        if (productoSeleccionado === undefined) {
          console.log('producto no encontrado o no existe en el inventario');
          break
        }

        // const productoVenta = {
        //   producto,
        //   cantidad
        // }

        const venta = {
          usuario,
          productoSeleccionado,
          //total
        }
        
        console.log(venta);
        

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

menuVentas();

///OBTENER PRODUCTO
async function obtenerProducto(arrayProductos){
  let buscar = parseInt(await capturarValor(`ingrese el Id del producto que desea Obtener:  `));
  const obtProducto = arrayProductos.find(producto => producto.id == buscar);
  
  return obtProducto;
}


module.exports = menuVentas;