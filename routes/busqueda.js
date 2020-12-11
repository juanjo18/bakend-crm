// Required import librarys
// var mdAutenticacion = require('../middlewares/autenticacion');
var express = require('express');
var app = express();

const Sequelize = require('Sequelize');
var Op = Sequelize.Op;
const db = require('../config/database');

// ============================
// 	Busqueda general // Request, Response, Next (Middleware)
// ============================


app.get('/contactos/:busqueda', (req, res,next) => {
        var busqueda =req.params.busqueda;

    db.query('sp_busqueda_contactos'+' '+busqueda).then(contactos => {
        if (contactos) {
            res.status(200).json({
                contactos: contactos[0]
            })
        }
        else {
            return res.status(500).json({
                ok: 'false',
                mensaje: "Error al recuperar los datos"
            })
        }
    })
});

app.get('/miscontactos/:id/:busqueda', (req, res,next) => {
        var busqueda =req.params.busqueda;
        var id = req.params.id;
    db.query('sp_busqueda_miscontactos' + ' ' + busqueda + ',' + id).then(contactos => {
        if (contactos) {
            res.status(200).json({
                contactos: contactos[0]
            })
        }
        else {
            return res.status(500).json({
                ok: 'false',
                mensaje: "Error al recuperar los datos"
            })
        }
    })
});

app.get('/empresas/:busqueda', (req, res,next) => {
        var busqueda =req.params.busqueda;
    db.query('sp_busqueda_empresas'+' '+busqueda).then(empresas => {
        if (empresas) {
            res.status(200).json({
                empresas: empresas[0]
            })
        }
        else {
            return res.status(500).json({
                ok: 'false',
                mensaje: "Error al recuperar los datos"
            })
        }
    })
});
app.get('/misempresas/:id/:busqueda', (req, res,next) => {
        var busqueda =req.params.busqueda;
        var id = req.params.id;
    db.query('sp_busqueda_misempresas' + ' ' + busqueda + ',' + id).then(empresas => {
        if (empresas) {
            res.status(200).json({
                empresas: empresas[0]
            })
        }
        else {
            return res.status(500).json({
                ok: 'false',
                mensaje: "Error al recuperar los datos"
            })
        }
    })
});

module.exports = app;