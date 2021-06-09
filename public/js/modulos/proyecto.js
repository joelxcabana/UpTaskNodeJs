import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');
if(btnEliminar){
    btnEliminar.addEventListener('click',(e) =>{
      const urlProyecto = e.target.dataset.proyectoUrl;

        Swal.fire({
            title: 'Deseas borrar este proyecto?',
            text: "un proyecto eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!',
            cancelButtonText: 'No'
          }).then((result) => {
            //enviar peticion a Axios
            const url = `${location.origin}/proyectos/${urlProyecto}`;
            
            axios.delete(url,{params: urlProyecto})
               .then(function(respuesta){
                    console.log(respuesta);
              });

              return;

            if (result.isConfirmed) {
              Swal.fire(
                'Eliminado!',
                'tu proyecto ha sido eliminado.',
                'Exito'
              );
              setTimeout(()=>{
                  window.location.href='/'
              },1000)
            }
          })
    })
}

export default btnEliminar;