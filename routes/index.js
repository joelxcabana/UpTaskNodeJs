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

        //listar proyecto
        router.get('/proyectos/:url',proyectoController.proyectoPorUrl);

        //actualizar el proyecto
        router.get('/proyectos/editar/:id',proyectoController.formularioEditar);

        //editar y guardar
        router.post('/nuevo-proyecto/:id',
        body('nombre').not().isEmpty().trim().escape(),
        proyectoController.actualizarProyecto);

        //eliminar proyecto
        router.delete('/proyectos/:url',proyectoController.eliminarProyecto)



return router;
}