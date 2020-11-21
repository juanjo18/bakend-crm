const Sequelize = require('sequelize');
const db = require('../config/database');

var Nota = db.define('notas', {

    id_nota: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    comentario: { type: Sequelize.STRING, allowNull: false },
    fkusuario: { type: Sequelize.INTEGER, allowNull: false },
    fkcontactos: {type: Sequelize.INTEGER, allowNull:false},
    createdAt:{type: Sequelize.STRING,allowNull:false},
    updatedAt:{type: Sequelize.STRING,allowNull:true}
}, {
    timestamps: false
});

module.exports = Nota;