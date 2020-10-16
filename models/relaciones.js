const Sequelize = require('Sequelize');
const db = require('../config/database');
var Relaciones = db.define('relaciones', {
    id_relaciones: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    fkusuario: { type: Sequelize.INTEGER, allowNull: false },
    fkcontacto: { type: Sequelize.INTEGER, allowNull: false }

}, {
    timestamps: false //Para evitar que se creen los columnas de update y creacion
});

module.exports = Relaciones;