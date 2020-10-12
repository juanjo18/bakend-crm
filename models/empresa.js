const Sequelize = require('Sequelize');
const db = require('../config/database');
var Empresa = db.define('empresas', {
    id_empresa: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    nombre:  { type: Sequelize.STRING, allowNull: false},
    industria:  { type: Sequelize.STRING, allowNull: false},
    ciudad:  { type: Sequelize.STRING, allowNull: false},
    ingresosAnuales:  { type: Sequelize.BIGINT, allowNull: false},
    tipo_Cliente:  { type: Sequelize.STRING, allowNull: false},
    No_Empleados:  { type: Sequelize.INTEGER, allowNull: false},
    descripcion:  { type: Sequelize.STRING, allowNull: false},
    No_Telefono:  { type: Sequelize.STRING, allowNull: false},
    Zona_Horaria:  { type: Sequelize.STRING, allowNull: false},
    Pagina_Corporativa:  { type: Sequelize.STRING, allowNull: false},
    Propietario_de_Registro: {type: Sequelize.INTEGER, allowNull: false},
    Estado_Region: {  type: Sequelize.STRING, allowNull: false}
},
{ 
	timestamps: false  //Para evitar que se creen los columnas de update y creacion
});

module.exports = Empresa;