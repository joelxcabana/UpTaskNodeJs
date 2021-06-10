
const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

module.exports.agregarTarea = async (req,res, next) =>{

    //obtenemos el proyecto actual 
    const url =  req.params.url;
    const proyecto = await Proyectos.findOne({where : {url: url}});

    const {tarea} = req.body;
    //estado 0  = incompleto
    const estado = 0;
    const proyectoId = proyecto.id;

    //insertar en la base de datos
    
    const resultado =  await Tareas.create({tarea,estado,proyectoId});

    if(!resultado){
        return next();
    }
 
    //redireccion
    res.redirect(`/proyectos/${url}`);
}
