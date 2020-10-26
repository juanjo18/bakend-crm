const Sequelize = require('Sequelize');
const db = require('../config/database');
var Negocio = db.define('negocios', {
    id_negocio: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    nombre_negocio:  { type: Sequelize.STRING, allowNull: false},
    etapas_negocio:  { type: Sequelize.STRING, allowNull: false},
    pipeline: { type: Sequelize.STRING, allowNull: false},
    cantidad:  { type: Sequelize.INTEGER, allowNull: false},
    fkrelaciones: {type: Sequelize.INTEGER, allowNull: false},
    fkempresa: {type: Sequelize.INTEGER, allowNull: false},
    fecha_cierre: {type: Sequelize.DATEONLY, allowNull: true}
},
{ 
	timestamps: false  //Para evitar que se creen los columnas de update y creacion
});

module.exports = Negocio;