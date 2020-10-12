const Sequelize = require('Sequelize');
const db = require('../config/database');
var Contacto = db.define('contactos', {
    id_correo: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    nombre:  { type: Sequelize.STRING, allowNull: false},
    apellido:  { type: Sequelize.STRING, allowNull: false},
    correo: { type: Sequelize.STRING, allowNull: false},
    telefono:  { type: Sequelize.STRING, allowNull: false},
    departamento: {type: Sequelize.STRING, allowNull: false}
},
{ 
	timestamps: false  //Para evitar que se creen los columnas de update y creacion
});

module.exports = Contacto;