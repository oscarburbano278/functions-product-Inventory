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
        //console.log('la cantidad de productos que tenemos es: ',arrayProductos.length)

        const producto = await crear();
        console.log('producto creado', producto.id)
        arrayProductos.push(producto);
        console.log('la cantidad de productos que tenemos es: ',arrayProductos.length);      

        break;

      case 2:
        console.log(`Mostrar un Productos:`);        
        mostrar(arrayProductos);
        
        break;
      case 3:
        console.log(`Actualizar un Producto`);
        await actualizar(arrayProductos);

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

// CREAR UN PRODUCTO
async function crear() {
  let objDirigidoA = {
    id: "",
    nombre: "",
    cantidad: "",
    precio: "",
  };

  objDirigidoA.id = parseInt(
    await capturarValor(`digite el id del Producto:  `)
  );
  objDirigidoA.nombre = await capturarValor(`digite el nombre del Producto:  `);
  objDirigidoA.cantidad = parseInt(
    await capturarValor(`digite la cantidad del Producto:  `)
  );
  objDirigidoA.precio = parseInt(
    await capturarValor(`digite el precio del Producto:  `)
  );

  return objDirigidoA;
}

//MOSTRAR USUARIOS 
async function mostrar(arrayProductos){
  for (let index = 0; index < arrayProductos.length; index++) {
    console.log(index + 1);
    console.log('Id producto:',arrayProductos[index].id);
    console.log('Nombre producto:',arrayProductos[index].nombre);
    console.log('Cantidad del producto:',arrayProductos[index].cantidad);
    console.log('Precio producto:',arrayProductos[index].precio);
    console.log('__________________________')
    
  }
}

//ACTUALIZAR UN PRODUCTO
async function actualizar(arrayProductos) {
    
  let buscar = parseInt(await capturarValor(`ingrese el Id del producto a Actualizar:  `));
  let actNombre = await capturarValor(`ingrese el nombre a actualizar: `);
  let actCantidad = parseInt(await capturarValor(`ingrese la cantidad del producto a actualizar: `));
  let actPrecio = parseInt(await capturarValor(`ingrese el precio del producto a actualizar: `));

  for (let i = 0; i < arrayProductos.length; i++) {
    if (arrayProductos[i].id == buscar) {
      arrayProductos[i].nombre = actNombre;
      arrayProductos[i].cantidad = actCantidad;
      arrayProductos[i].precio = actPrecio;

      console.log(arrayProductos);
    }
  }
}