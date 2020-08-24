// Variables globales

const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.getElementById('listaActividades');
let arrayActividades = [];


// Funciones

const CrearItem = (actividad) => {

  let item = {
    actividad: actividad,
    estado: false
  }

  arrayActividades.push(item);

  return item;

}

const GuardarDB = () => {

  localStorage.setItem('rutina', JSON.stringify(arrayActividades));

  PintarDB();

}

const PintarDB = () => {

  listaActividadesUI.innerHTML = '';

  arrayActividades = JSON.parse(localStorage.getItem('rutina'));
  
  if(arrayActividades === null){
    arrayActividades = [];
  }else{

    arrayActividades.forEach(element => {

      if(element.estado){
        listaActividadesUI.innerHTML += `<div class="alert alert-success" role="alert"><i class="material-icons float-left mr-2">label</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
      }else{
        listaActividadesUI.innerHTML += `<div class="alert alert-danger" role="alert"><i class="material-icons float-left mr-2">label</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
      }
    });
    
  }
}

const EliminarDB = (actividad) => {

  let indexArray;

  arrayActividades.forEach((elemento, index) => {
    
    if(elemento.actividad === actividad){

      indexArray = index;

    }
    
  });

  arrayActividades.splice(indexArray,1);
  GuardarDB();

}

const EditarDB = (actividad) => {

  let indexArray = arrayActividades.findIndex((elemento)=>elemento.actividad === actividad);

  if(arrayActividades[indexArray].estado){
    
    arrayActividades[indexArray].estado = false;
    
  }else{
    arrayActividades[indexArray].estado = true;
  }
  

  GuardarDB();

}



// EventListener

formularioUI.addEventListener('submit', (e) => {

  e.preventDefault();
  
  let actividadUI = document.querySelector('#actividad').value;

  var b = false;

  arrayActividades.forEach((elemento) => {
    
    if(elemento.actividad === actividadUI){

      Swal.fire({
        title: 'Error',
        text: "Ya hay una actividad con ese nombre",
        icon: 'error',
        width: '30%',
      });

      b = true;
    }
  
  });

  if(actividadUI === ""){
    
    b =true;

      Swal.fire({
        title: 'Advertencia',
        text: "Ingresa la Actividad",
        icon: 'warning',
        width: '30%',
      });
  }

  if(b === false)
  { 
      CrearItem(actividadUI);
      GuardarDB();
  }
  
  formularioUI.reset();

});

document.addEventListener('DOMContentLoaded', PintarDB);

listaActividadesUI.addEventListener('click', (e) => {

  e.preventDefault();

  if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete'){

    let texto = e.path[2].childNodes[1].innerHTML;

    if(e.target.innerHTML === 'delete'){
      // Accción de eliminar
      Swal.fire({
        title: 'Estas Seguro?',
        text: "La actividad se eliminara permanentemente!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, quiero eliminarla'
      }).then((result) => {
        if (result.value) {

          Swal.fire(
            'ELIMINADO',
            'Tu nota se elimino satisfactoriamente',
            'success'
          )
          
          EliminarDB(texto);
          
        }
      })

    }

    if(e.target.innerHTML === 'done'){
      // Accción de editar
      EditarDB(texto);
    }
  }

});
