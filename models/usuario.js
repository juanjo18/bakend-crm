const Sequelize = require('Sequelize');
const db = require('../config/database');
var Usuario = db.define('usuarios', {
    id_usuario: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    nombre:  { type: Sequelize.STRING, allowNull: false},
    email: { type: Sequelize.STRING, allowNull: false},
    contraseña:  { type: Sequelize.STRING, allowNull: false},
    rol: {type: Sequelize.STRING, allowNull: false}
},
{ 
	timestamps: false  //Para evitar que se creen los columnas de update y creacion
});

module.exports = Usuario;