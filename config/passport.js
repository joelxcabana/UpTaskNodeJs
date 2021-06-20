const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//referencia la modelo donde se va a autenticar
const Usuario = require('../models/Usuarios');


//local strategy - login con credenciales porpios (usuario password)
passport.use(
    new LocalStrategy(
        //por defecto passport espera un usuario y paswword
        {
            usernameField:'email',
            passwordField:'password'
        },
        async (email,password,done) =>{
             try {
                 const usuario = await Usuario.findOne({where:{email:email}});
                 //existe pero puede ser passwor incorrecto

                 if(!usuario.verificarPassword(password)){
                       //el usuario no existe
                        return done(null,false,{
                            message:'password incorrecto'
                        })
                 }

                 //el email existe y password correcto
                 return done(null,usuario);
             } catch (error) {
                 //el usuario no existe
                 return done(null,false,{
                     message:'esa cuenta no existe'
                 })
             }
        }

    )
)


//serializar el usuario
passport.serializeUser((usuario,callback)=>{
    callback(null,usuario);
});

//deserializar el usuario
passport.deserializeUser((usuario,callback)=>{
    callback(null,usuario);
});


//exp[ortar
module.exports = passport;
