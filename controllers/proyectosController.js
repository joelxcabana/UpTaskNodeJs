const Proyectos = require('../models/Proyectos');

exports.proyectosHome = async (req,res)=>{
    const proyectos = await Proyectos.findAll();
    res.render('index',{
        nombrePagina:'Proyectos',
        proyectos
    });
}

exports.formularioPoryecto = async (req,res) =>{
  const proyectos = await Proyectos.findAll();
    res.render('nuevoProyecto',{
        nombrePagina:'Nuevo Proyecto',
        proyectos
    });
}

exports.nuevoProyecto = async (req,res) =>{
  const { nombre } = req.body;

  let errores = [];
  const proyectos = await Proyectos.findAll();
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
    const propyecto = await Proyectos.create({nombre});
    res.redirect('/');
  }
}

exports.proyectoPorUrl = async (req,res,next) => {
  //buscar solo uno
  const proyecto = await Proyectos.findOne({
    //condicion
      where:{
         url:req.params.url
      }
  })

  const proyectos = await Proyectos.findAll();

  if(!proyecto) return next();
  
  //render a la vista
  res.render('tareas',{
      nombrePagina:'tareas del proyecto',
      proyecto,
      proyectos
  });
}

exports.formularioEditar = async (req,res) =>{
  const { id } = req.params;
  const proyectoPromise = Proyectos.findByPk(id);
  const proyectosPromise =  Proyectos.findAll();
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

  let errores = [];
  const proyectos = await Proyectos.findAll();
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

  const resultado = await Proyectos.destroy({where: {url:urlProyecto}});

  //controlar error
   if(!resultado){
    return  next();
   }
  res.status(200).send('proyecto eliminado correctamente');
}