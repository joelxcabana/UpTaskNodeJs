const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

//crear aplicacion de express
const app = express();

//donde cargar los archivos estaticos
app.use(express.static('public'));

//habilitar pug
app.set('view engine','pug');
//agregar carpetas de las vistas
app.set('views',path.join(__dirname,'./views'));

//habilitar para ller datos del formulario
app.use(bodyParser.urlencoded({extended:true}));


app.use('/', routes());

//puerto en el que corre
app.listen(3000);
