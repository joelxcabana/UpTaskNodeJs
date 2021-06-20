const express = require('express');
const router = express.Router();

//importar express valitador
const { body } = require('express-validator/check'); 

//controlador
const proyectoController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');

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

        /* RUTAS PARA LAS TAREAS*/
        router.post('/proyectos/:url',tareasController.agregarTarea);

        //actualizar tarea
        router.patch('/tareas/:id',tareasController.cambiarEstadoTarea);

        //eliminartarea
        router.delete('/tareas/:id',tareasController.eliminarTarea);

        //crear usuario
        router.get('/crear-cuenta',usuariosController.formCrearCuenta);
        router.post('/crear-cuenta',usuariosController.crearCuenta);

        //iniciar sesion
        router.get('/iniciar-sesion',usuariosController.formIniciarSesion);
return router;
}