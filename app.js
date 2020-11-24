const express = require("express");
var bodyParser = require('body-parser');
// Inicializar app
const app = express();

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

//Bodyparser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Conexion base de datos
const db = require('./config/database');
db.authenticate()
  .then(() => {
    console.log('Conectado');
    app.listen(3000,()=>{
    console.log('Express puerto 3000: \x1b[32m%s\x1b[0m',' online');
    });
})
  .catch(err => {
    console.log('No se conecto');
})


//Importar rutas
var appRoutes = require('./routes/app');
var contactosRoutes = require('./routes/contactos');
var usuariosRoutes = require('./routes/usuarios');
var loginRoutes = require('./routes/login');
var empresaRoutes = require('./routes/empresa');
var registrarCorreoRoutes = require('./routes/registrarCorreo');
var notasRoutes = require('./routes/nota');
var llamadasRoutes = require ('./routes/registrarLlamada');
var reunionesRoutes = require ('./routes/registrarReuniones');
var notasEmpresasRoutes = require ('./routes/notasEmpresas');
var reunionesEmpresasRoutes = require ('./routes/reunionesEmpresas');
var llamadasEmpresasRoutes =require('./routes/llamadasEmpresas');
var correosEmpresasRoutes= require('./routes/correosEmpresas');
var informesRoutes = require('./routes/informes');
var etapasRoutes = require ('./routes/etapasNegocio');
var negocioContactoRoutes = require ('./routes/negociosContactos');
var negocioEmpresaRoutes = require ('./routes/negociosEmpresas');

//Rutas -> Middleware
app.use('/contactos', contactosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/login', loginRoutes);
app.use('/empresas', empresaRoutes);
app.use('/rcorreos', registrarCorreoRoutes);
app.use('/notas', notasRoutes);
app.use('/llamadas',llamadasRoutes);
app.use('/reuniones',reunionesRoutes);
app.use('/notasempresas', notasEmpresasRoutes);
app.use('/reunionesempresas', reunionesEmpresasRoutes);
app.use('/llamadasempresas',llamadasEmpresasRoutes);
app.use('/correosempresas',correosEmpresasRoutes);
app.use('/informes',informesRoutes);
app.use('/etapas', etapasRoutes);
app.use('/negociosContactos', negocioContactoRoutes);
app.use('/negociosEmpresas', negocioEmpresaRoutes);
app.use('/', appRoutes);
