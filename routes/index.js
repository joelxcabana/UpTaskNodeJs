const express = require('express');
const router = express.Router();

//importar express valitador
const { body } = require('express-validator/check'); 

//controlador
const proyectoController = require('../controllers/proyectosController');

module.exports = function (){
        router.get('/',proyectoController.proyectosHome);
        router.get('/nuevo-proyecto',proyectoController.formularioPoryecto);

        //agregar nuevo proyecto
        router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(),
        proyectoController.nuevoProyecto);


return router;
}