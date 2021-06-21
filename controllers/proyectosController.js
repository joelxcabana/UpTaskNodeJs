const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.proyectosHome = async (req,res)=>{
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where:{usuarioId}});
    res.render('index',{
        nombrePagina:'Proyectos',
        proyectos
    });
}

exports.formularioPoryecto = async (req,res) =>{
  const usuarioId = res.locals.usuario.id;
  const proyectos = await Proyectos.findAll({where:{usuarioId}});
    res.render('nuevoProyecto',{
        nombrePagina:'Nuevo Proyecto',
        proyectos
    });
}

exports.nuevoProyecto = async (req,res) =>{
  const { nombre } = req.body;

  let errores = [];
  const usuarioId = res.locals.usuario.id;
  const proyectos = await Proyectos.findAll({where:{usuarioId}});
  if(!nombre){
      errores.push({'texto':'agrega un nombre'});
  }
  
  if(errores.length > 0){
  res.render('nuevoProyecto',{
      nombrePagina:'Nuevo Proyecto',
      errores,
      proyectos
  })
  }else{
    //insertar en la base de datos
    const usuarioId = res.locals.usuario.id;
    const propyecto = await Proyectos.create({nombre,usuarioId});
    res.redirect('/');
  }
}

exports.proyectoPorUrl = async (req,res,next) => {
  const usuarioId = res.locals.usuario.id;
  //buscar solo uno
  const proyecto = await Proyectos.findOne({
    //condicion
      where:{
         url:req.params.url,
         usuarioId
      }
  })

  const proyectos = await await Proyectos.findAll({where:{usuarioId}});

  const tareas = await Tareas.findAll({
    where:{
       proyectoId : proyecto.id
    } 
  });


  if(!proyecto) return next();
  
  //render a la vista
  res.render('tareas',{
      nombrePagina:'tareas del proyecto',
      proyecto,
      proyectos,
      tareas
  });
}

exports.formularioEditar = async (req,res) =>{
  const usuarioId = res.locals.usuario.id;
  const { id } = req.params;
  const proyectoPromise = Proyectos.findByPk(id);
  const proyectosPromise =  Proyectos.findAll({where:{usuarioId}});
  // se utiliza promesas cuando un metodo no depende del otro
  const [proyectos,proyecto] = await Promise.all([proyectosPromise,proyectoPromise]);
 
  res.render('nuevoProyecto',{
   nombrePagina:'Editar Proyecto',
   proyecto,
   proyectos
 })
}

exports.actualizarProyecto = async (req,res) => {
  const { nombre} = req.body;
  const { id } = req.params;
  const usuarioId = res.locals.usuario.id;
  
  let errores = [];
  const proyectos = await Proyectos.findAll({where:{usuarioId}});
  if(!nombre){
      errores.push({'texto':'agrega un nombre'});
  }
  
  if(errores.length > 0){
  res.render('nuevoProyecto',{
      nombrePagina:'Nuevo Proyecto',
      errores,
      proyectos
  })
  }else{
    //insertar en la base de datos
     await Proyectos.update(
        {nombre:nombre},
        {where: {id:id} }
      );
    res.redirect('/');
  }
}

exports.eliminarProyecto = async (req,res,next) =>{
  const {urlProyecto} = req.query;
  const usuarioId = res.locals.usuario.id;

  const resultado = await Proyectos.destroy({where: {url:urlProyecto,usuarioId}});

  //controlar error
   if(!resultado){
    return  next();
   }
  res.status(200).send('proyecto eliminado correctamente');
}