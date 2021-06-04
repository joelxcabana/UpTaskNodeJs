const express = require('express');
const router = express.Router();

//controlador
const proyectoController = require('../controllers/proyectosController');

module.exports = function (){
        router.get('/',proyectoController.proyectosHome);

        router.get('/nuevo-proyecto',proyectoController.formularioPoryecto);

        router.get('/nosotros',(req,res)=>{
            res.render('nosotros');
        });

return router;
}