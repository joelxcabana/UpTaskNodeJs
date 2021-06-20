const Usuarios = require('../models/Usuarios');

module.exports.formCrearCuenta = async (req,res) =>{
   res.render('crearCuenta',{
    nombrePagina:'Crear Cuenta en UpTask'
   });
}

module.exports.crearCuenta = async (req,res) =>{
   //leer datos
   const {email,password} = req.body;

   //crear usuario
   Usuarios.create({
      email,
      password
   })
   .then(()=>{
      res.redirect('/iniciar-sesion');
   })
}