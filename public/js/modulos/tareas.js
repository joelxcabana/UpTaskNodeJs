const tareas = document.querySelector('.listado-pendientes');
import axios from 'axios';
import Swal from 'sweetalert2';
import  {actualizarAvance} from '../funciones/avance';

if(tareas){

    tareas.addEventListener('click', e =>{

        if(e.target.classList.contains('fa-check-circle')){
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            console.log(idTarea);
            //reques hacia tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;
            axios.patch(url,{idTarea})
                 .then(function(respuesta){
                     if(respuesta.status === 200){
                        icono.classList.toggle('completo');
                        actualizarAvance();
                     }
                 })
        }

        if(e.target.classList.contains('fa-trash')){
            const tareaHtml = e.target.parentElement.parentElement,
                  idTarea = tareaHtml.dataset.tarea;

                  Swal.fire({
                    title: 'Deseas borrar esta tarea?',
                    text: "una tarea eliminada no se puede recuperar!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, borrar!',
                    cancelButtonText: 'No'
                  }).then((result) => {
                    if (result.value) {
                        console.log('eliminando');
                        const url = `${location.origin}/tareas/${idTarea}`;
                        console.log(url);
                        axios.delete(url,{params: {idTarea}})
                             .then(function(respuesta){
                                 if(respuesta.status === 200){
                                     //eliminar nodo
                                     tareaHtml.parentElement.removeChild(tareaHtml);

                                     //opciona alerta
                                     Swal.fire({
                                        icon: 'success',
                                        title: 'Tarea eliminado',
                                        text: "tu tarea ha sido eliminada correctamente"
                                      })

                                      actualizarAvance();
                                 }
                             })
                    }
                  })
        }
    })

}

export default tareas;