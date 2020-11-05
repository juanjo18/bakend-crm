const json = require('body-parser');
var express = require('express');
var app = express();
var Rcorreo = require('../models/correosEmpresas');
var auth = require('../middlewares/autenticacion');


// ==========================================
//  Obtener todos los correos
// ==========================================

app.get('/', (req, res) => {

    Rcorreo.findAll().then(correos => {
        if (correos) {
            res.status(200).json({
                ok: true,
                correos: correos
            })
        } else {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al recuperar correos'
            })
        }
    })
});


// ==========================================
//  Obtener todos los correos con un ID
// ==========================================
app.get('/:id', auth.verificaToken, (req, res) => {

    var id = req.params.id;
     console.log(id)
    Rcorreo.findAll({
        where:{
            fkempresa: id,
        }
    }).then(correos => {
        if (correos) {
            res.status(200).json({
                ok: 'true',
                mensaje: 'Solo correos de la empresa',
                correos: correos
            })
        }
        else {
            return res.status(500).json({
                ok: 'false',
                mensaje: "Error al recuperar los correos "
            })
        }
    })
});

// ==========================================
//  Obtener un correo
// ==========================================
app.get('/:id', (req, res) => {

    var id = req.params.id;
    Rcorreo.findOne({
            where: {
                id_rcorreo: id
            }
        })
        .then(correo => {
            if (correo) {
                res.status(200).json({
                    ok: 'true',
                    correo: correo
                });
            } else {
                return res.status(400).json({
                    ok: 'false',
                    mensaje: 'No exite ese correo'
                });
            }
        })
        .catch(err => {
            return re.status(500).json({
                ok: 'false',
                mensaje: 'Error al buscar correo',
                error: err
            });
        })
});

// ==========================================
//  Crear correo
// ==========================================
app.post('/', (req, res) => {
    var body = req.body;

    Rcorreo.create({

            descripcion: body.descripcion,
            fecha: body.fecha,
            hora: body.hora,
            fkempresa: body.contactado,
            fkusuario: body.id,
            createdAt: body.createdAtLlamada,
            updateAt:body.updateAtLlamada

        })
        .then(correo => {
            res.status(200).json({
                correo: correo,
                ok: 'true',
                mensaje: 'Correo agregado'
            })
        })
        .catch(err => {
            return res.status(500).json({
                ok: 'false',
                mensaje: 'Error al agregar correo',
                errors: err
            })
        })
});


// ==========================================
//  Borra correo
// ==========================================
app.delete('/:id', (req, res, next) => {

    var id = req.params.id;

    Rcorreo.destroy({
            where: {
                id_rcorreo: id
            }
        })
        .then(result => {
            res.status(200).json({
                ok: 'true',
                mensaje: 'Correo eliminado',
                result: result
            })
        })
        .catch(err => {
            res.status(400).json({
                ok: 'false',
                mensaje: 'Error al eliminar correo',
                error: err
            })
        })
});

// ==========================================
//  Actualizar correo
// ==========================================

app.put('/:id', (req, res, next) => {
    var id = req.params.id;
    var body = req.body;

    Rcorreo.update({
        descripcion: body.descripcion,
        fecha: body.fecha,
        hora: body.hora,
        fkempresa: body.contactado,
        fkusuario: body.id,
        createdAt: body.createdAtLlamada,
        updateAt:body.updateAtLlamada
        }, {
            where: {
                id_rcorreo: id
            }
        }).then(result => {
            res.status(200).json({
                ok: 'true',
                mensaje: 'Correo actualizado',
                result: result
            })
        })
        .catch(err => {
            res.status(400).json({
                ok: 'false',
                mensaje: 'Error al actualizar correo',
                error: err
            })
        })
});

module.exports = app;