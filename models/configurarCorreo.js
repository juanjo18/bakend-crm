const Sequelize = require('Sequelize');
const db = require('../config/database');
var ConfigCorreo = db.define('configuracion_correos', {
    id_conf: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    host:  { type: Sequelize.STRING, allowNull: false},
    puerto:  { type: Sequelize.INTEGER, allowNull: false},
    email: { type: Sequelize.STRING, allowNull: false},
    password:  { type: Sequelize.STRING, allowNull: false},
    fk_usuario: {type: Sequelize.STRING, allowNull: false},
},
{
    timestamps: false //Para evitar que se creen los columnas de update y creacion
});

module.exports = ConfigCorreo;