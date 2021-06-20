const tareas = document.querySelector('.listado-pendientes');
import axios from 'axios';

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
                     }
                 })
        }
    })

}

export default tareas;