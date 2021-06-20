const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('./config/passport');

const session = require('express-session');
const cookieparser = require('cookie-parser');

//helpers con algunas fuciones
const helpers = require('./helpers');

//crear la conexion a la base de datos
const db = require('./config/db');

//importar el modelo 
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

//bd.authenticate => solo se conecta al servidor
db.sync()
   .then(()=>console.log('Conectado al servidor'))
   .catch(error => console.log(error))



//crear aplicacion de express
const app = express();
//donde cargar los archivos estaticos
app.use(express.static('public'));

//habilitar pug
app.set('view engine','pug');
//habilitar para ller datos del formulario
app.use(bodyParser.urlencoded({extended:true}));


//agregar carpetas de las vistas
app.set('views',path.join(__dirname,'./views'));

//agregar flash message
app.use(flash());

app.use(cookieparser());
//SESIONES nos ermiten navegar entre aginas sin volver a autenticas
app.use(session({
   secret:'suerass',
   resave: false,
   saveUninitialized: false
}))

//passport
app.use(passport.initialize());
app.use(passport.session());


//pasar vardump a la aplicacion
app.use((req,res,next) => {
    //locals crear varables en este archivo y consumirlo en otro archivo
     res.locals.vardump = helpers.vardump;
     res.locals.mensajes = req.flash();
     //siguiente
     next();
});



app.use('/', routes());

//puerto en el que corre
app.listen(3000);
