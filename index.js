const express = require('express');

//crear aplicacion de express
const app = express();

//rutas para el home
//req peticion / res respuiesta
app.use('/',(req,res)=>{
       res.send('hola');
});



//puerto en el que corre
app.listen(3000);
