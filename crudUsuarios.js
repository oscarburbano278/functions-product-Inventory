



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


/// CRUD USUARIOS
async function menuUsuarios(arrayUsuarios) {
  let menuSeleccionUsuarios;

  while (menuSeleccionUsuarios !== 6) {
    menuSeleccionUsuarios = parseInt(
      await capturarValor(
        "digite la accion a realizar: 1. Crear, 2. Mostrar , 3. Actualizar , 4.Eliminar, 5 Buscar, 6 Salir del modulo de Usuarios :...  "
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

//obtener usuario 
async function obtenerUsuarioId (arrayUsuarios){
  let buscar = parseInt(await capturarValor(`ingrese el Id del usuario que desea Obtener:  `));

  const usuario = arrayUsuarios.find(usuario => usuario.id == buscar);
  
  return usuario
}
module.exports = {menuUsuarios, obtenerUsuarioId};
