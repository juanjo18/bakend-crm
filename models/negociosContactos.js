const Sequelize = require('Sequelize');
const db = require('../config/database');
var NegocioContacto = db.define('negocios_contactos', {
    id_negocio: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    nombre_negocio:  { type: Sequelize.STRING, allowNull: false},
    pipeline: { type: Sequelize.STRING, allowNull: false},
    cantidad:  { type: Sequelize.INTEGER, allowNull: false},
    fketapa: {type: Sequelize.INTEGER, allowNull: false},
    fkcontacto: {type: Sequelize.INTEGER, allowNull: false},
    fkusuario: {type: Sequelize.INTEGER, allowNull: false},
    fcierre: {type: Sequelize.STRING, allowNull: false},
    createdAt: {type: Sequelize.STRING, allowNull: false},
    updatedAt: {type: Sequelize.STRING, allowNull: true}
},
{ 
	timestamps: false  //Para evitar que se creen los columnas de update y creacion
});

module.exports = NegocioContacto;