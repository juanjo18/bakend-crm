const Sequelize = require('Sequelize');
const db = require('../config/database');
var RegistrarReunion = db.define('registrar_reuniones', {
    id_regisreunion: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    descripcion: { type: Sequelize.STRING, allowNull: false },
    asistentes: { type: Sequelize.STRING, allowNull: false },
    resultado: { type: Sequelize.STRING, allowNull: false },
    fecha: { type: Sequelize.DATEONLY, allowNull: false },
    hora: { type: Sequelize.TIME, allowNull: false },
    duracion: { type: Sequelize.STRING, allowNull: false },
    fkusuario: { type: Sequelize.INTEGER, allowNull: false },

}, {
    timestamps: false //Para evitar que se creen los columnas de update y creacion
});

module.exports = RegistrarReunion;