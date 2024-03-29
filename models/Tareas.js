const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Proyectos');

const Tareas = db.define('tareas',{
    id:{
        type:Sequelize.INTEGER(11),
        primaryKey:true,
        autoIncrement:true
      },
    tarea: Sequelize.STRING(100),
    estado: Sequelize.INTEGER(1)
});
/*cada tarea pertenece a un proyecto
  una o muchas tarea pertenece a un proyecto
*/
Tareas.belongsTo(Proyectos);

module.exports = Tareas;