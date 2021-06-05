const Sequelize = require('sequelize');

/* Importar la configuracion de la base de datos*/
const db = require('../config/db');

/*Definir la estructura */
const Proyectos = db.define('proyectos',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre: Sequelize.STRING,
    url: Sequelize.STRING
});

/* Exportar para utilizar en otros archivos*/
module.exports = Proyectos;