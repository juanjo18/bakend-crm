const Sequelize = require('Sequelize');
const db = require('../config/database');
var RegistrarReunion = db.define('registrar_reuniones', {
    id_regisreunion: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    descripcion: { type: Sequelize.STRING, allowNull: false },
    fkcontacto: { type: Sequelize.STRING, allowNull: false },
    resultado: { type: Sequelize.STRING, allowNull: false },
    fecha: { type: Sequelize.DATEONLY, allowNull: false },
    hora: { type: Sequelize.STRING, allowNull: false },
    duracion: { type: Sequelize.STRING, allowNull: false },
    fkusuario: { type: Sequelize.INTEGER, allowNull: false },
    createdAt:{ type: Sequelize.DATEONLY,allowNull:false},
    updateAt:{ type: Sequelize.DATEONLY,allowNull:true}

}, {
    timestamps: false //Para evitar que se creen los columnas de update y creacion
});

module.exports = RegistrarReunion;