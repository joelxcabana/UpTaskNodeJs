const Usuarios = require('../models/Usuarios');

module.exports.formCrearCuenta = async (req,res) =>{
   res.render('crearCuenta',{
    nombrePagina:'Crear Cuenta en UpTask'
   });
}

module.exports.formIniciarSesion = async (req,res) =>{
 
   const {error} =  res.locals.mensajes;

   res.render('iniciarSesion',{
    nombrePagina:'Iniciar sesion en UpTask',
    error:error
   });
}

module.exports.crearCuenta = async (req,res) =>{
   //leer datos
   const {email,password} = req.body;

   try {
         //crear usuario
      await  Usuarios.create({
         email,
         password
      })

      res.redirect('/iniciar-sesion');
   } catch (error) {
     req.flash('error',error.errors.map(error => error.message));

      res.render('crearCuenta',{
         nombrePagina:'Crear Cuenta en UpTask',
         mensajes:req.flash(),
         email,
         password
        });
   }

  
 
}