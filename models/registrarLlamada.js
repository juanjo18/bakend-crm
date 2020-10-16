const Sequelize = require('Sequelize');
const db = require('../config/database');
var RegistrarLlamada = db.define('registrar_llamadas', {
    id_llamada: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    descripcion: { type: Sequelize.STRING, allowNull: false },
    fkcontacto: { type: Sequelize.INTEGER, allowNull: false },
    fecha: { type: Sequelize.DATEONLY, allowNull: false },
    hora: { type: Sequelize.TIME, allowNull: false },
    resultado_llamada: { type: Sequelize.STRING, allowNull: false },
    fkusuario: { type: Sequelize.INTEGER, allowNull: false }
}, {
    timestamps: false //Para evitar que se creen los columnas de update y creacion
});

module.exports = RegistrarLlamada;