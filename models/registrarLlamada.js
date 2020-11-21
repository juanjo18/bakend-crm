const Sequelize = require('Sequelize');
const db = require('../config/database');
var RegistrarLlamada = db.define('registrar_llamadas', {
    id_llamada: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    descripcion: { type: Sequelize.STRING, allowNull: false },
    fkcontacto: { type: Sequelize.INTEGER, allowNull: false },
    fecha: { type: Sequelize.STRING, allowNull: false },
    hora: { type: Sequelize.STRING, allowNull: false },
    resultado_llamada: { type: Sequelize.STRING, allowNull: false },
    fkusuario: { type: Sequelize.INTEGER, allowNull: false },
    createdAt:{ type: Sequelize.STRING,allowNull:false},
    updateAt:{ type: Sequelize.STRING,allowNull:true}
}, {
    timestamps: false //Para evitar que se creen los columnas de update y creacion
});

module.exports = RegistrarLlamada;