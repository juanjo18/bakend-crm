const Sequelize = require('Sequelize');
const db = require('../config/database');
var Empresa = db.define('empresas', {
    id_empresa: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    nombre:  { type: Sequelize.STRING, allowNull: false},
    industria:  { type: Sequelize.STRING, allowNull: false},
    ciudad:  { type: Sequelize.STRING, allowNull: false},
    ingresos_anuales:  { type: Sequelize.BIGINT, allowNull: false},
    tipo_cliente:  { type: Sequelize.STRING, allowNull: false},
    no_empleados:  { type: Sequelize.INTEGER, allowNull: false},
    descripcion:  { type: Sequelize.STRING, allowNull: false},
    no_telefono:  { type: Sequelize.STRING, allowNull: false},
    zona_horaria:  { type: Sequelize.STRING, allowNull: false},
    pagina_corporativa:  { type: Sequelize.STRING, allowNull: false},
    propietario_registro: {type: Sequelize.INTEGER, allowNull: false},
    estado_region: {  type: Sequelize.STRING, allowNull: false},
    codigo_postal: {type: Sequelize.STRING, allowNull: true}
},
{ 
	timestamps: false  //Para evitar que se creen los columnas de update y creacion
});

module.exports = Empresa;