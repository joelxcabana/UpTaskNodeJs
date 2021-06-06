const { Sequelize } = require('sequelize');


const db = new Sequelize('upTaskNode', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port:3306,
    define:{
       timestamps:false
    },
    operatorsAliases: false,
    
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
  });

/**Exportamos para ser utilizado */
  module.exports = db;