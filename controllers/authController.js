
const passport = require('passport');

exports.autenticarUsuario =  passport.authenticate('local',{
   successRedirect:'/',
   failureRedirect:'/iniciar-sesion',
   failureFlash:true
});

//funcion para revisar si el usuario esta logeado o no
exports.usuarioAutenticado = (req,res,next) =>{
   //si el usuario esta autenticado adelante
   if(req.isAuthenticated()){
      return next();
   }
   //sino redirigir al inicio
    return res.redirect('/iniciar-sesion');
}