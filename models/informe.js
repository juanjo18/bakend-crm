const Sequelize = require('Sequelize');
const db = require('../config/database');
var Informe = db.define('informes', {
    id_informes: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    num_informes:  { type: Sequelize.INTEGER, allowNull: false},
    fecha: { type: Sequelize.DATEONLY, allowNull: false}
},
{ 
	timestamps: false  //Para evitar que se creen los columnas de update y creacion
});

module.exports = Informe;