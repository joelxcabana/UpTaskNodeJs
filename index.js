const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

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
//agregar carpetas de las vistas
app.set('views',path.join(__dirname,'./views'));

//pasar vardump a la aplicacion
app.use((req,res,next) => {
    //locals crear varables en este archivo y consumirlo en otro archivo
     res.locals.vardump = helpers.vardump;
     //siguiente
     next();
});

//habilitar para ller datos del formulario
app.use(bodyParser.urlencoded({extended:true}));


app.use('/', routes());

//puerto en el que corre
app.listen(3000);
