const Sequelize = require('Sequelize');
const db = require('../config/database');
var RegistrarCorreo = db.define('registrar_correos', {
    id_rcorreo: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    descripcion: { type: Sequelize.STRING, allowNull: false },
    fecha: { type: Sequelize.STRING, allowNull: false },
    hora: { type: Sequelize.STRING, allowNull: false },
    fkcontacto: { type: Sequelize.INTEGER, allowNull: false },
    fkusuario: { type: Sequelize.INTEGER, allowNull: false },
    createdAt: {type: Sequelize.STRING, allowNull: true},
    updatedAt: {type: Sequelize.STRING, allowNull: true}
}, {
    timestamps: false //Para evitar que se creen los columnas de update y creacion
});

module.exports = RegistrarCorreo;