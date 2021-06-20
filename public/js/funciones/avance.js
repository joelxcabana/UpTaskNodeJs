import Swal from 'sweetalert2';

export const actualizarAvance = () =>{
    //seleccionar las tareas existentes
     const tareas = document.querySelectorAll('li.tarea');

     if(tareas.length){
      //seleccionar tareas completadas
        const tareasCompleta = document.querySelectorAll('i.completo');

      //calcular avance
       const avance = Math.round((tareasCompleta.length / tareas.length) * 100);
      //mostrar avance
      const porcentaje = document.querySelector('#porcentaje');
      porcentaje.style.width = avance+'%';

      if(avance == 100){
           //opciona alerta
           Swal.fire({
            icon: 'success',
            title: 'Completaste el proyecto',
            text: "el proyecto ha sido completado con "+tareasCompleta.length                                                   +" tareas completadas"
          })

      }
     }
    

}