let clientes = [];
let id = 0;//variable para guardar posiciones del arreglo


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Activa Botones Actualizar y Cancelar
function botonesactualizar(){
    document.getElementById("boton-actualizar").style.display = "block";
    document.getElementById("boton-cancelar").style.display = "block";
    document.getElementById("boton-envio").style.display = "none";
    document.getElementById("boton-reset").style.display = "none";
}
//Activa Botones Enviar y Reset
function botonesenviar(){
    document.getElementById("boton-actualizar").style.display = "none";
    document.getElementById("boton-cancelar").style.display = "none";
    document.getElementById("boton-envio").style.display = "block";
    document.getElementById("boton-reset").style.display = "block";
}
document.addEventListener('DOMContentLoaded', function() {
    ListarClientes();console.log(clientes);
    botonesenviar()
});
function resetearFormulario() {
    document.getElementById('form_cliente').reset();
}
document.getElementById('boton-reset').addEventListener('click', function() {
    document.getElementById('form_cliente').reset();
    borrarerror();
});
function actualizar(indice) {
    botonesactualizar();
    resetearFormulario();

    // Asigna valores al formulario desde el envío seleccionado
    document.querySelector('#cliente-nombre').value = clientes[indice].nombre;
    document.getElementById('cliente-nombre').disabled = true;//Deshabilita para no modificar el nombre
    document.querySelector('#cliente-fecha').value = clientes[indice].fechaEnvio;
    document.querySelector('#cliente-direccion').value = clientes[indice].direccion;
    document.querySelector('#local-salida').value = clientes[indice].local;
    document.querySelector(`#${clientes[indice].dimension}`).checked = true;
    document.querySelector('#fragil').checked = clientes[indice].fragil;
    document.querySelector('#mail-cliente').value = clientes[indice].email;
    document.querySelector('#evento-notas').value = clientes[indice].detalles;
    id = indice;//guarda el lugar del arreglo para actualizar
}
function borrarlista()
{
  let tabla = document.getElementById('listacliente');
  tabla.innerHTML = "";
}
function eliminarfila(indice)
{
    const confirmacion = confirm(`¿Estás seguro de que quieres eliminar el evento "${clientes[indice].nombre}"?`);
    borrarlista()
    if (confirmacion){
        clientes.splice(indice, 1)[0];
        console.log(clientes[indice].nombre);
        
    }
    else {console.log("Eliminación cancelada.")};
    ListarClientes();
}
document.getElementById('boton-envio').addEventListener('click', function() {
    borrarerror();

    // Obtención de valores de los campos del formulario
    const clienteNombre = document.getElementById('cliente-nombre').value;
    const fechaEnvio = document.getElementById('cliente-fecha').value;
    const direccion = document.getElementById('cliente-direccion').value;
    const paqueteDimension = document.querySelector('input[name="paquete-tipo"]:checked');
    const localSalida = document.getElementById('local-salida').value;
    const fragil = document.getElementById('fragil').checked;
    const Mailcliente = document.getElementById('mail-cliente').value;
    const detallesCasa = document.getElementById('evento-notas').value;

    // Verificación de campos requeridos
    if (!clienteNombre || !fechaEnvio || !localSalida || !direccion || !paqueteDimension || !costoEnvio) {
        alert("Por favor, complete todos los campos requeridos.");
        avisoerrores()
        return;
    }

    // Creación del objeto cliente con los datos del formulario 
    const cliente = {
        fechaEnvio: fechaEnvio,
        direccion: direccion,
        dimension: paqueteDimension.value,
        local: localSalida,
        fragil: fragil,
        mail: Mailcliente,
        detalles: detallesCasa,
    };
    
    // Agregar cliente al array de clientes y confirmar registro
    clientes.push(cliente);
    alert(`Cliente "${cliente.nombre}" actualizado exitosamente.`);

    // Reinicio del formulario
    resetearFormulario();
})
function ListarClientes(){
    for(let i=0; i< clientes.length; i++)
    {
    let tabla = document.getElementById('listacliente');
    let fila = document.createElement('tr');
    const botonActualizar = document.createElement("button");

    botonActualizar.fila = i;

    botonActualizar.onclick = function() 
    {
        actualizar(botonActualizar.fila); 
    };
    const imagenactualizar = document.createElement("img");

    imagenactualizar.src = "Img/editar.png";
    imagenactualizar.width = 30;
    imagenactualizar.height = 30;

    botonActualizar.appendChild(imagenactualizar);
  
    const botonBorrar = document.createElement("button");

    botonBorrar.fila = i;

    botonBorrar.onclick = function() 
    {
    eliminarfila(botonBorrar.fila); 
    };
    const imagenborrar = document.createElement("img");

    imagenborrar.src = "Img/eliminar.jpg";
    imagenborrar.width = 30;
    imagenborrar.height = 30;

    botonBorrar.appendChild(imagenborrar);


    let celda1 = document.createElement('td');
    let celda2 = document.createElement('td');
    let celda3 = document.createElement('td');
    let dato1 = document.createTextNode(clientes[i].nombre);let dato2 = document.createTextNode(clientes[i].fechaEnvio);let dato3 = document.createTextNode(clientes[i].local);
    celda1.appendChild(dato1);
    fila.append(celda1);
    celda2.appendChild(dato2);
    fila.append(celda2);
    celda3.appendChild(dato3);
    fila.append(celda3);
    tabla.append(fila);

    let celdaBotonActualizar = document.createElement('td');
    celdaBotonActualizar.appendChild(botonActualizar);
    fila.appendChild(celdaBotonActualizar);

  
    let celdaBotonBorrar = document.createElement('td');
    celdaBotonBorrar.appendChild(botonBorrar);
    fila.appendChild(celdaBotonBorrar);
    }  
}
document.getElementById('boton-actualizar').addEventListener('click', function() {
    borrarerror();

    const fechaEnvio = document.getElementById('cliente-fecha').value;
    const direccion = document.getElementById('cliente-direccion').value;
    const paqueteDimension = document.querySelector('input[name="paquete-tipo"]:checked');
    const localSalida = document.getElementById('local-salida').value;
    const fragil = document.getElementById('fragil').checked;
    const Mailcliente = document.getElementById('mail-cliente').value;
    const detallesCasa = document.getElementById('evento-notas').value;
    
    // Verificación de campos requeridos
    if (!fechaEnvio || !localSalida || !direccion || !paqueteDimension || !Mailcliente) {
        alert("Por favor, complete todos los campos requeridos.");
        avisoerrores();
        return;
    }
    let vermail = /@.*\.(com|com\.ar)$/;
    if(!vermail.test(Mailcliente)){
        alert("el mail ingresado no es correcto");
        return;
    }
    // actualiza cliente en el array
    clientes[id].fechaEnvio= fechaEnvio,
    clientes[id].direccion= direccion,
    clientes[id].dimension= paqueteDimension.value,
    clientes[id].local= localSalida,
    clientes[id].fragil= fragil,
    clientes[id].email= Mailcliente,
    clientes[id].detalles= detallesCasa,
    
    alert(`Cliente "${clientes[id].nombre}" registrado exitosamente.`);
    // Reinicio del formulario
    resetearFormulario();
    //Activa los botones normales
    botonesenviar();
    document.getElementById('cliente-nombre').disabled = false;
})
document.getElementById('boton-cancelar').addEventListener('click', function() {
    resetearFormulario();
    botonesenviar();
    borrarerror();
    document.getElementById('cliente-nombre').disabled = false;
})
clientes = [
    {
        nombre: "Juan Perez",
        fechaEnvio: "2024-11-10",
        direccion: "Calle Falsa 123",
        dimension: "Grande",
        local: "Villa Mitre",
        fragil: true,
        email: "juan.perez@example.com",
        detalles: "Casa de esquina, portón verde."
    },
    {
        nombre: "Maria Gonzalez",
        fechaEnvio: "2024-11-11",
        direccion: "Avenida Siempreviva 742",
        dimension: "Mediano",
        local: "Centro",
        fragil: false,
        email: "maria.gonzalez@example.com",
        detalles: "Segundo piso, timbre azul."
    },
    {
        nombre: "Carlos Sanchez",
        fechaEnvio: "2024-11-12",
        direccion: "Pasaje Los Andes 56",
        dimension: "Chico",
        local: "Noroeste",
        fragil: false,
        email: "carlos.sanchez@example.com",
        detalles: "Casa sin numeración visible, puerta roja."
    },
    {
        nombre: "Lucia Ramirez",
        fechaEnvio: "2024-11-13",
        direccion: "Boulevard Libertad 89",
        dimension: "Grande",
        local: "Villa Mitre",
        fragil: true,
        email: "lucia.ramirez@example.com",
        detalles: "Edificio, tercer piso, departamento 302."
    },
    {
        nombre: "Pedro Martinez",
        fechaEnvio: "2024-11-14",
        direccion: "Calle Olvidada 200",
        dimension: "Mediano",
        local: "Centro",
        fragil: false,
        email: "pedro.martinez@example.com",
        detalles: "Casa a la izquierda, entrada de madera."
    },
    {
        nombre: "Laura Diaz",
        fechaEnvio: "2024-11-15",
        direccion: "Pasaje Solitario 10",
        dimension: "Grande",
        local: "Noroeste",
        fragil: true,
        email: "laura.diaz@example.com",
        detalles: "Casa con rejas negras, timbre alto."
    },
    {
        nombre: "Ana Torres",
        fechaEnvio: "2024-11-16",
        direccion: "Calle Cerrada 33",
        dimension: "Chico",
        local: "Palihue",
        fragil: false,
        email: "ana.torres@example.com",
        detalles: "Departamento en PB, puerta marrón."
    },
    {
        nombre: "Raul Mendoza",
        fechaEnvio: "2024-11-17",
        direccion: "Avenida Principal 101",
        dimension: "Grande",
        local: "Noroeste",
        fragil: true,
        email: "raul.mendoza@example.com",
        detalles: "Casa con puerta verde, cerca del parque."
    },
    {
        nombre: "Monica Fernandez",
        fechaEnvio: "2024-11-18",
        direccion: "Calle Independencia 456",
        dimension: "Mediano",
        local: "Centro",
        fragil: true,
        email: "monica.fernandez@example.com",
        detalles: "Puerta gris, tercer piso, sin ascensor."
    },
    {
        nombre: "Luis Contreras",
        fechaEnvio: "2024-11-19",
        direccion: "Pasaje Sereno 72",
        dimension: "Chico",
        local: "Villa Mitre",
        fragil: false,
        email: "luis.contreras@example.com",
        detalles: "Casa blanca con tejas rojas."
    }
];
function avisoerrores(){

    const clienteNombre = document.getElementById('cliente-nombre').value;
    const fechaEnvio = document.getElementById('cliente-fecha').value;
    const direccion = document.getElementById('cliente-direccion').value;
    const paqueteDimension = document.querySelector('input[name="paquete-tipo"]:checked');
    const localSalida = document.getElementById('local-salida').value;
    const fragil = document.getElementById('fragil').checked;
    const Mailcliente = document.getElementById('mail-cliente').value;
    const detallesCasa = document.getElementById('evento-notas').value;

    const formulario = document.getElementById("ingreso");
    const errorDiv = document.createElement("div");
    errorDiv.setAttribute("class","error");
    errorDiv.setAttribute("id","errores");
    // Verificación de campos requeridos
    let vermail = /@.*\.(com|com\.ar)$/;

    if (!clienteNombre){
        texto = "Nombre Cliente : OBLIGATIORIO";
        errorDiv.innerHTML+= texto + "</br>";
    }
    if (!fechaEnvio){
        texto = "Feha de envio : OBLIGATIORIO";
        errorDiv.innerHTML+= texto + "</br>";
    }
    if (!direccion){
        texto = "Direccion : OBLIGATIORIO";
        errorDiv.innerHTML+= texto + "</br>";
    }
    if (!paqueteDimension){
        texto = "Tamaño del Paquete : OBLIGATIORIO";
        errorDiv.innerHTML+= texto + "</br>";
    }
    if (!Mailcliente){
        texto = "Mail : OBLIGATIORIO";
        errorDiv.innerHTML+= texto + "</br>";
    }
    else if(!vermail.test(Mailcliente)){
        texto = "Mail : NO ES CORRECTO";
        errorDiv.innerHTML+= texto + "</br>";
    }
    formulario.appendChild(errorDiv);
}
function borrarerror(){
    const div = document.getElementById("errores");
if (div) {
    div.remove();
    console.log("Div error eliminado.")
}
}
