const Sequelize = require('Sequelize');
const db = require('../config/database');
var RegistrarCorreo = db.define('correos_empresas', {
    id_rcorreo: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    descripcion: { type: Sequelize.STRING, allowNull: false },
    fecha: { type: Sequelize.DATEONLY, allowNull: false },
    hora: { type: Sequelize.STRING, allowNull: false },
    fkempresa: { type: Sequelize.INTEGER, allowNull: false },
    fkusuario: { type: Sequelize.INTEGER, allowNull: false },
    createdAt:{ type: Sequelize.DATEONLY,allowNull:false},
    updateAt:{ type: Sequelize.DATEONLY,allowNull:true}


}, {
    timestamps: false //Para evitar que se creen los columnas de update y creacion
});

module.exports = RegistrarCorreo;