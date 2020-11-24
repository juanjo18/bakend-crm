const Sequelize = require('Sequelize');
const db = require('../config/database');
var RegistrarReunion = db.define('reuniones_empresas', {
    id_regisreunion: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    descripcion: { type: Sequelize.STRING, allowNull: false },
    fkempresa: { type: Sequelize.STRING, allowNull: false },
    resultado: { type: Sequelize.STRING, allowNull: false },
    fecha: { type: Sequelize.STRING, allowNull: false },
    hora: { type: Sequelize.STRING, allowNull: false },
    duracion: { type: Sequelize.STRING, allowNull: false },
    fkusuario: { type: Sequelize.INTEGER, allowNull: false },
    createdAt:{ type: Sequelize.STRING,allowNull:false},
    updatedAt:{ type: Sequelize.STRING,allowNull:true}

}, {
    timestamps: false //Para evitar que se creen los columnas de update y creacion
});

module.exports = RegistrarReunion;