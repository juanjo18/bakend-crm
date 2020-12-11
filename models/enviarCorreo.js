const Sequelize = require('Sequelize');
const db = require('../config/database');

var EnviarCorreo = db.define('enviar_correos', {
    id_correo: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    remitente: {type: Sequelize.STRING, allowNull: false},
    descripcion: { type: Sequelize.STRING, allowNull: false },
    asunto: {type: Sequelize.STRING, allowNull: false},
    destinatario: {type: Sequelize.STRING, allowNull: false},
    fkcontacto: { type: Sequelize.INTEGER, allowNull: false },
    createdAt: {type: Sequelize.STRING, allowNull: false},
    hora: { type: Sequelize.STRING, allowNull: false },
    fkusuario: { type: Sequelize.STRING, allowNull: false }
}, {
    timestamps: false //Para evitar que se creen los columnas de update y creacion
});

module.exports = EnviarCorreo;