const json = require('body-parser');
var express = require('express');
var app = express();
var Negocio = require('../models/negocio');

// ==========================================
//  Obtener todos los negocios, He actualizado solo hasta en Negocios, los elementos por debajo aun faltan
// ==========================================
app.get('/', (req, res) => {

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
app.get('/:id', (req, res) => {

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
app.post('/', (req, res) => {
    var body = req.body;

    Negocio.create({
            nombre_negocio: body.nombreNegocio,
            etapas_negocio: body.etapaNegocio,
            pipeline: body.pipelineNegocio,
            cantidad: body.cantidadNegocio,
            fkrelaciones: body.relacionesNegocio,
            fkempresa: body.empresaNegocio,
            fecha_cierre: body.cierreNegocio,

            
        })
        .then(negocio => {
            res.status(200).json({
                usuario: negocio,
                ok: 'true',
                mensaje: 'Negocio agregado'
            })
        })
        .catch(err => {
            return res.status(500).json({
                ok: 'false',
                mensaje: 'Error al agregar empresa',
                errors: err
            })
        })
});

// ==========================================
//  Borra un negocio
// ==========================================

app.delete('/:id', (req, res, next) => {

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

app.put('/:id', (req, res, next) => {
    var id = req.params.id;
    var body = req.body;

    Negocio.update({

        nombre_negocio: body.nombreNegocio,
        etapas_negocio: body.etapaNegocio,
        pipeline: body.pipelineNegocio,
        cantidad: body.cantidadNegocio,
        fkrelaciones: body.relacionesNegocio,
        fkempresa: body.empresaNegocio,
        fecha_cierre: body.cierreNegocio,

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