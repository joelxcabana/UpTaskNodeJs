const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('../models/Proyectos');
const bcrypt = require('bcrypt');

const Usuarios = db.define('usuarios',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail:{
                msg: 'Agrega un correo válido.'
            },
            notEmpty: {
                msg: 'El email no puede ir vacío.'
            }
        },
        unique: {
            args: true,
            msg: 'Email address already in use!'
        }
    
    },
    password:{
        type:Sequelize.STRING(60),
        allowNull: false,
        validate:{
            notEmpty:{
                msg:'el assword no debe estar vacio'
            }
        }
    }
},{
    hooks:{
        //se ejecuta antes de crean el usuario
        beforeCreate(usuario){
           usuario.password =  bcrypt.hashSync(usuario.password,bcrypt.genSaltSync(10));
        }
    }
})
//metodos personalizados
Usuarios.prototype.verificarPassword = function (password){
   return bcrypt.compareSync(password,this.password);
}



/* un usuario puede crear muchos proyectos*/
//Usuarios.hasMany(Proyectos);

module.exports = Usuarios;