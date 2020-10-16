const Sequelize = require('sequelize');
const db = require('../config/database');

var Nota = db.define('notas', {

    id_nota: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    comentario: { type: Sequelize.STRING, allowNull: false },
    fkusuario: { type: Sequelize.STRING, allowNull: false }

}, {
    timestamps: false
});

module.exports = Nota;