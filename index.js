const express = require('express');
const routes = require('./routes');

//crear aplicacion de express
const app = express();

app.use('/', routes());
//puerto en el que corre
app.listen(3000);
