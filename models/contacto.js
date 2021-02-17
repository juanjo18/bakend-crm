const Sequelize = require('Sequelize');
const db = require('../config/database');
var Contacto = db.define('contactos', {
    id_contacto: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    nombre:  { type: Sequelize.STRING, allowNull: false},
    apellido:  { type: Sequelize.STRING, allowNull: false},
    email: { type: Sequelize.STRING, allowNull: true},
    telefono:  { type: Sequelize.STRING, allowNull: true},
    departamento: {type: Sequelize.STRING, allowNull: false},
    propietario_registro: {type: Sequelize.INTEGER, allowNull: false},
    fkempresa: {type: Sequelize.INTEGER, allowNull: false},
    ultima_actividad: {type: Sequelize.STRING, allowNull: true}
});

module.exports = Contacto;