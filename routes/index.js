const express = require('express');
const router = express.Router();

//controlador
const proyectoController = require('../controllers/proyectosController');

module.exports = function (){
        router.get('/',proyectoController.proyectosHome);
        router.get('/nuevo-proyecto',proyectoController.formularioPoryecto);

        //agregar nuevo proyecto
        router.post('/nuevo-proyecto',proyectoController.nuevoProyecto);


return router;
}