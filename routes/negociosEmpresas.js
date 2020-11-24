const json = require('body-parser');
var express = require('express');
var app = express();
var Negocio = require('../models/negociosEmpresas');
var db = require('../config/database');
var auth = require('../middlewares/autenticacion')


// ==========================================
//  Obtener negocios relacionados a una empresa
// ==========================================

app.get('/fkempresa/:fkempresa', auth.verificaToken, (req, res) => {

    var fkempresa = req.params.fkempresa;

    db.query('sp_negocios_empresa'+' '+fkempresa).then(negocios => {
        if (negocios) {
            res.status(200).json({
                negocios: negocios[0]
            })
        }

        else {
            return res.status(500).json({
                ok: 'false',
                mensaje: "Error al recuperar los negocios de una sola empresa"
            })
        }
    })
});


// ==========================================
//  Obtener negocios, 
// ==========================================

app.get('/negocios/', auth.verificaToken, (req, res) => {

    

    db.query('sp_negociosEmpresas').then(negocios => {
        if (negocios) {
            res.status(200).json({
                negocios: negocios[0]
            })
        }

        else {
            return res.status(500).json({
                ok: 'false',
                mensaje: "Error al recuperar todos los negocios"
            })
        }
    })
});


// ==========================================
//  Obtener todos los negocios
// ==========================================
app.get('/', auth.verificaToken, (req, res) => {

    Negocio.findAll().then(negocios => {
        if (negocios) {
            res.status(200).json({
                ok: true,
                negocios: negocios
            })
        } else {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al obtener negocios'
            })
        }
    })
});

// ==========================================
//  Obtener un negocio
// ==========================================
app.get('/:id', auth.verificaToken, (req, res) => {

    var id = req.params.id;
    Negocio.findOne({
            where: {
                id_negocio: id
            }
        })
        .then(negocio => {
            if (negocio) {
                res.status(200).json({
                    ok: 'true',
                    negocio: negocio
                });
            } else {
                return res.status(400).json({
                    ok: 'false',
                    mensaje: 'No existe el negocio'
                });
            }
        })
        .catch(err => {
            return res.status(500).json({
                ok: 'false',
                mensaje: 'Error al buscar el negocio',
                error: err
            });
        })
});


// ==========================================
//  Agregar un negocio 
// ==========================================
app.post('/', auth.verificaToken, (req, res) => {
    var body = req.body;
    var fecha = new Date();
    console.log('Negocio empresa:', body);

    var fulldateTime = fecha.getFullYear()+'-'+fecha.getMonth()+'-'+fecha.getDate()+' '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
    var fullHora = fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
    Negocio.create({
            nombre_negocio: body.nombre_negocio,
            pipeline: body.pipeline,
            cantidad: body.cantidad,
            fketapa: body.fketapa,
            fkempresa: body.fkempresa,
            fkusuario:body.fkusuario,
            fcierre: (body.fcierre) +' '+fullHora,
            createdAt:fulldateTime,
            updatedAt: fulldateTime

        })
        .then(negocio => {
            res.status(200).json({
                negocio: negocio,
                ok: 'true',
                mensaje: 'Negocio agregado'
            })
        })
        .catch(err => {
            return res.status(500).json({
                ok: 'false',
                mensaje: 'Error al agregar negocio de la empresa',
                errors: err
            })
        })
});

// ==========================================
//  Borra un negocio
// ==========================================

app.delete('/:id', auth.verificaToken, (req, res, next) => {

    var id = req.params.id;

    Negocio.destroy({
            where: {
                id_negocio: id
            }
        })
        .then(result => {
            res.status(200).json({
                ok: 'true',
                mensaje: 'Negocio eliminado',
                result: result
            })
        })
        .catch(err => {
            res.status(400).json({
                ok: 'false',
                mensaje: 'Error al eliminar negocio',
                error: err
            })
        })
});


// ==========================================
//  Actualizar un negocio
// ==========================================

app.put('/:id', auth.verificaToken, (req, res, next) => {
    var id = req.params.id;
    var body = req.body;
    var fecha = new Date();
    var fulldateTime = fecha.getFullYear()+'-'+fecha.getMonth()+'-'+fecha.getDate()+' '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
    
    
    console.log('Editar negocio:', body);

    
    var fecha = new Date();
    Negocio.update({

        nombre_negocio: body.nombre_negocio,
            pipeline: body.pipeline,
            cantidad: body.cantidad,
            fketapa: body.fketapa,
            fkempresa: body.fkempresa,
            fkusuario:body.fkusuario,
            fcierre: body.fcierre,
            updatedAt: fulldateTime

        }, {
            where: {
                id_negocio: id
            }
        }).then(result => {
            res.status(200).json({
                ok: 'true',
                mensaje: 'Negocio actualizado',
                result: result
            })
        })
        .catch(err => {
            res.status(400).json({
                ok: 'false',
                mensaje: 'Error al actualizar negocio',
                error: err
            })
        })
});

module.exports = app;