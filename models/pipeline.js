const Sequelize = require('Sequelize');
const db = require('../config/database');
var Pipeline = db.define('pipelines', {
    id_pipeline: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_etapa: { type: Sequelize.STRING, allowNull: false },
    probabilidad_ganar: { type: Sequelize.STRING, allowNull: false },
    actualizar_propiedades: { type: Sequelize.STRING, allowNull: false },
    fknegocio: { type: Sequelize.INTEGER, allowNull: false }

}, {
    timestamps: false //Para evitar que se creen los columnas de update y creacion
});

module.exports = Pipeline;