const Sequelize = require('sequelize');
const slug = require('slug');
const shortid = require('shortid');

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
},{
    hooks:{
        //se ejecuta antes de crean el dato
        beforeCreate(proyecto){
            const url = slug(proyecto.nombre).toLowerCase();
            proyecto.url = `${url}-${shortid.generate()}`;
        }
    }
});

/* Exportar para utilizar en otros archivos*/
module.exports = Proyectos;