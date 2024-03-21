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
    let arrayUsuarios = [];

  console.log("inventario de Usuarios");

  let accionRealizar;
  
  accionRealizar = parseInt(await capturarValor("digite el modulo a revisar: 1. Productos, 2. Usuarios, 3. Ventas, 4. Inventario :..."
    )
  );

  switch (accionRealizar) {
    case 1:
      console.log("has seleccionado la seccion de PRODUCTOS");
      await menuProductos(arrayProductos);

      break;

    case 2:
      console.log("has seleccionado la seccion de USUARIOS");
      await menuUsuarios(arrayUsuarios);
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

async function menuProductos(arrayProductos) {
  let menuSeleccion;

  while (menuSeleccion !== 7) {
    menuSeleccion = parseInt(
      await capturarValor(
        "digite la accion a realizar: 1. Crear, 2. Mostrar , 3. Actualizar , 4.Eliminar, 5 Buscar, 6 Salir del modulo de productos  :...  "
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
        arrayProductos = await eliminar(arrayProductos);        
        console.log('el producto a sido eliminado correctamente. Los productos que hay en el inventario son:',arrayProductos);

        break;
      case 5:
        console.log(`Buscar un Producto`);
        await buscar(arrayProductos);
        break;

      case 6:
        console.log(`Saliendo.....`);
        await main();
        
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

//ELIMINAR UN PRODUCTO 
async function eliminar(arrayProductos){  

  let buscarIdEliminar = parseInt(await capturarValor(`ingrese el Id del producto que desea Eliminar:  `));  

     return arrayProductos.filter((producto) => (producto.id !== buscarIdEliminar));// aqui me da los que quedan en el array 
    
}
// BUSCAR Y MOSTRAR EL PRODUCTO 
async function buscar (arrayProductos){
  let buscar = parseInt(await capturarValor(`ingrese el Id del producto que desea Buscar:  `));

  for (let j = 0; j < arrayProductos.length; j++) {
    if (arrayProductos[j].id == buscar) {
      console.log('----------------------------');
      console.log('Id producto:',arrayProductos[j].id);
      console.log('Nombre producto:',arrayProductos[j].nombre);
      console.log('Cantidad del producto:',arrayProductos[j].cantidad);
      console.log('Precio producto:',arrayProductos[j].precio);
      console.log('----------------------------');     
    }
    else{
      console.log('el producto buscado no se encuentra en el inventario');
    }
    
  }
  return
}

/// CRUD USUARIOS
async function menuUsuarios(arrayUsuarios) {
  let menuSeleccionUsuarios;

  while (menuSeleccionUsuarios !== 7) {
    menuSeleccionUsuarios = parseInt(
      await capturarValor(
        "digite la accion a realizar: 1. Crear, 2. Mostrar , 3. Actualizar , 4.Eliminar, 5 Buscar, 6 Salir del modulo :...  "
      )
    );

    switch (menuSeleccionUsuarios) {
      case 1:
        console.log(`Crear un Usuario`);
        
        const usuario = await crearUsuario();
        console.log('usuario creado', usuario.id)
        arrayUsuarios.push(usuario);
        console.log('la cantidad de usuarios que tenemos es: ',arrayUsuarios.length);      

        break;

      case 2:
        console.log(`Mostrar un Usuarios:`);        
        mostrarUsuarios(arrayUsuarios);
        
        break;
      case 3:
        console.log(`Actualizar un Usuario`);
        await actualizarUsuario(arrayUsuarios);

        break;

      case 4:
        console.log(`Eliminar un Usuario`);
        arrayUsuarios = await eliminarUsuarios(arrayUsuarios);        
        console.log('el usuario a sido eliminado correctamente. Los usuarios que hay en el inventario son:',arrayUsuarios);

        break;
      case 5:
        console.log(`Buscar un Usuario`);
        await buscarUsuario(arrayUsuarios);
        break;

      case 6:
        console.log(`Saliendo.....`);
        await main();
        
        break;

      default:
        console.log("digite una opcion valida");
        break;
    }
  }
}

// CREAR UN USUARIO
async function crearUsuario() {
  let objCrearUsuario = {
    id: "",
    nombre: "",
    apellido: "",    
  };

  objCrearUsuario.id = parseInt(
    await capturarValor(`digite el id del Usuario:  `)
  );
  objCrearUsuario.nombre = await capturarValor(`digite el nombre del Usuario:  `);
  objCrearUsuario.apellido = await capturarValor(`digite el apellido del Usuario:  `);

  return objCrearUsuario;
}

//MOSTRAR USUARIOS 
async function mostrarUsuarios(arrayUsuarios){
  for (let i = 0; i < arrayUsuarios.length; i++) {
    console.log(i + 1);
    console.log('Id usuario:',arrayUsuarios[i].id);
    console.log('Nombre usuario:',arrayUsuarios[i].nombre);
    console.log('Apellido del usuario:',arrayUsuarios[i].apellido);    
    console.log('__________________________');
    
  }
}

//ACTUALIZAR UN USUARIO
async function actualizarUsuario(arrayUsuarios) {
    
  let buscarUsuario = parseInt(await capturarValor(`ingrese el Id del usuario a Actualizar:  `));
  let actNombre = await capturarValor(`ingrese el nombre a actualizar: `);
  let actApellido = await capturarValor(`ingrese el apellido del usuario a actualizar: `);  

  for (let i = 0; i < arrayUsuarios.length; i++) {
    if (arrayUsuarios[i].id == buscarUsuario) {
      arrayUsuarios[i].nombre = actNombre;
      arrayUsuarios[i].apellido = actApellido;
      
      console.log(arrayUsuarios);
    }
  }
}

//ELIMINAR UN USUARIO 
async function eliminarUsuarios(arrayUsuarios){  

  let buscarIdEliminar = parseInt(await capturarValor(`ingrese el Id del usuario que desea Eliminar:  `));  

     return arrayUsuarios.filter((usuario) => (usuario.id !== buscarIdEliminar));
    
}
// BUSCAR Y MOSTRAR EL USUARIO 
async function buscarUsuario (arrayUsuarios){
  let buscar = parseInt(await capturarValor(`ingrese el Id del usuario que desea Buscar:  `));

  for (let u = 0; u < arrayUsuarios.length; u++) {
    if (arrayUsuarios[u].id == buscar) {
      console.log('----------------------------');
      console.log('Id usuario:',arrayUsuarios[u].id);
      console.log('Nombre usuario:',arrayUsuarios[u].nombre);
      console.log('Apellido del usuario:',arrayUsuarios[u].apellido); 
      console.log('----------------------------');     
    }
    else{
      console.log('el usuario buscado no se encuentra en el inventario');
    }
    
  }
  return
}