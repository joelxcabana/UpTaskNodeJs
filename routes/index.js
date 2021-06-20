const express = require('express');
const router = express.Router();

//importar express valitador
const { body } = require('express-validator/check'); 

//controlador
const proyectoController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

module.exports = function (){

        router.get('/',
                authController.usuarioAutenticado,
                proyectoController.proyectosHome
        );

        router.get('/nuevo-proyecto',
                authController.usuarioAutenticado,
                proyectoController.formularioPoryecto
        );

        //agregar nuevo proyecto
        router.post('/nuevo-proyecto',
                authController.usuarioAutenticado,
                body('nombre').not().isEmpty().trim().escape(),
                proyectoController.nuevoProyecto
        );

        //listar proyecto
        router.get('/proyectos/:url',
                authController.usuarioAutenticado,
                proyectoController.proyectoPorUrl
        );

        //actualizar el proyecto
        router.get('/proyectos/editar/:id',
                authController.usuarioAutenticado,
                proyectoController.formularioEditar
        );

        //editar y guardar
        router.post('/nuevo-proyecto/:id',
                authController.usuarioAutenticado,
                body('nombre').not().isEmpty().trim().escape(),
                proyectoController.actualizarProyecto
        );

        //eliminar proyecto
        router.delete('/proyectos/:url',
                authController.usuarioAutenticado,
                proyectoController.eliminarProyecto
        )

        /* RUTAS PARA LAS TAREAS*/
        router.post('/proyectos/:url',
                authController.usuarioAutenticado,
                tareasController.agregarTarea
        );

        //actualizar tarea
        router.patch('/tareas/:id',
                authController.usuarioAutenticado,
                tareasController.cambiarEstadoTarea
        );

        //eliminartarea
        router.delete('/tareas/:id',
                authController.usuarioAutenticado,
                tareasController.eliminarTarea
        );

        //crear usuario
        router.get('/crear-cuenta',
                usuariosController.formCrearCuenta
        );
        
        router.post('/crear-cuenta',
                usuariosController.crearCuenta
        );

        //iniciar sesion
        router.get('/iniciar-sesion',
                usuariosController.formIniciarSesion
        );

        router.post('/iniciar-sesion',
                authController.autenticarUsuario
        );

        //cerrar sesion
        router.get('/cerrar-sesion',authController.cerrarSesion)
        
return router;
}