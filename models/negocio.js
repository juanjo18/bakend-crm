const Sequelize = require('Sequelize');
const db = require('../config/database');
var Negocio = db.define('negocios', {
    id_negocio: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    nombre_negocio:  { type: Sequelize.STRING, allowNull: false},
    Etapas_negocio:  { type: Sequelize.STRING, allowNull: false},
    pipeline: { type: Sequelize.STRING, allowNull: false},
    cantidad:  { type: Sequelize.INTEGER, allowNull: false},
    fkusuario: {type: Sequelize.INTEGER, allowNull: false}
},
{ 
	timestamps: false  //Para evitar que se creen los columnas de update y creacion
});

module.exports = Negocio;