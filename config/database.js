// var userComplement = '\\SQLEXPRESS'
var Sequelize = require('sequelize');
module.exports = new Sequelize('CRM', 'sa', 'p@$$w0rd', {
  host: 'localhost',
  dialect: 'mssql',
  options: {
    "enableArithAbort": true
}
});
