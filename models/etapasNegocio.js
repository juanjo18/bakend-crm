const Sequelize = require('Sequelize');
const db = require('../config/database');
var EtapasNegocio = db.define('etapas_negocios', {
    id_etapa: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: {type: Sequelize.STRING, allownull: false },
    probabilidad: {type:Sequelize.STRING, allownull: false},
    createdAt: {type: Sequelize.DATEONLY, allownull: false },
    updatedAt: {type: Sequelize.DATEONLY, allownull: true}
});
module.exports = EtapasNegocio;