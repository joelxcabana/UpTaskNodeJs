const Usuarios = require('../models/Usuarios');

module.exports.formCrearCuenta = async (req,res) =>{
   res.render('crearCuenta',{
    nombrePagina:'Crear Cuenta en UpTask'
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
      console.log(error);
      res.render('crearCuenta',{
         nombrePagina:'Crear Cuenta en UpTask',
         errores:error.errors
        });
   }

  
 
}