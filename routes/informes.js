const { json } = require('body-parser');
var express = require('express');
var app = express();
var Informe= require('../models/informe');
var auth = require('../middlewares/autenticacion')
var db = require('../config/database');

app.get('/', auth.verificaToken, (req, res) => {

    db.query('sp_informes').then(informes => {
        if (informes) {
            res.status(200).json({
                mensaje: 'un dato',
                informes: informes[0]

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


app.get('/suma', auth.verificaToken, (req, res) => {

    db.query('sp_informes_suma').then(informes => {
        if (informes) {
            res.status(200).json({
                informes: informes[0]
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

app.get('/mejorsemana', auth.verificaToken, (req, res) => {

    db.query('sp_informes_mejorsemana').then(informes => {
        if (informes) {
            res.status(200).json({
                informes: informes[0]
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

app.get('/historico/:fecha', auth.verificaToken, (req, res) => {

    var fecha=req.params.fecha;

    db.query('sp_informes_historico'+' '+fecha).then(informes => {
        if (informes) {
            res.status(200).json({
                informes: informes[0]
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

app.get('/fechaminmax', auth.verificaToken, (req, res) => {

    db.query('sp_informes_minmax').then(informes => {
        if (informes) {
            res.status(200).json({
                informes: informes[0]
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