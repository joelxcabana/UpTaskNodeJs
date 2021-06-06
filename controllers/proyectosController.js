const Proyectos = require('../models/Proyectos');

exports.proyectosHome = async (req,res)=>{
    const proyectos = await Proyectos.findAll();
    res.render('index',{
        nombrePagina:'Proyectos',
        proyectos
    });
}

exports.formularioPoryecto = (req,res) =>{
    res.render('nuevoProyecto',{
        nombrePagina:'Nuevo Proyecto'
    });
}

exports.nuevoProyecto = async (req,res) =>{
  const { nombre } = req.body;

  let errores = [];

  if(!nombre){
      errores.push({'texto':'agrega un nombre'});
  }
  
  if(errores.length > 0){
  res.render('nuevoProyecto',{
      nombrePagina:'Nuevo Proyecto',
      errores
  })
  }else{
    //insertar en la base de datos
    const propyecto = await Proyectos.create({nombre});
    res.redirect('/');
  }
}