const Sequelize = require('Sequelize');
const db = require('../config/database');

var EnviarCorreo = db.define('enviar_correos', {
    id_correo: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    descripcion: { type: Sequelize.STRING, allowNull: false },
    fkcontacto: { type: Sequelize.INTEGER, allowNull: false },
    fecha: { type: Sequelize.DATEONLY, allowNull: false }, // DATE without time
    hora: { type: Sequelize.TIME, allowNull: false },
    fkusuario: { type: Sequelize.STRING, allowNull: false }
}, {
    timestamps: false //Para evitar que se creen los columnas de update y creacion
});

module.exports = EnviarCorreo;