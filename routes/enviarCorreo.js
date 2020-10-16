const json = require('body-parser');
var express = require('express');
var app = express();
var EnviarCorreo = require('../models/enviarCorreo');


// ==========================================
//  Obtener correos enviados
// ==========================================


app.get('/', (req, res) => {

    EnviarCorreo.findAll().then(eCorreos => {
        if (eCorreos) {
            res.status(200).json({
                ok: true,
                Correo: eCorreos
            })
        } else {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al recuperar correos'
            })
        }
    })
});


// ==========================================
//  Obtener un correo enviado
// ==========================================

app.get('/:id', (req, res) => {

    var id = req.params.id;
    EnviarCorreo.findOne({
            where: {
                id_correo: id
            }
        })
        .then(eCorreo => {
            if (eCorreo) {
                res.status(200).json({
                    ok: 'true',
                    eCorreo: eCorreo
                });
            } else {
                return res.status(400).json({
                    ok: 'false',
                    mensaje: 'No exite ese correo'
                });
            }
        })
        .catch(err => {
            return res.status(500).json({
                ok: 'false',
                mensaje: 'Error al buscar correo',
                error: err
            });
        })
});


// ==========================================
//  Crear correo enviado
// ==========================================

app.post('/', (req, res) => {
    var body = req.body;

    EnviarCorreo.create({
            // descripcion: body.nombre,
            // industria: body.industria,
            // ciudad: body.ciudad,
            //pendiente

        })
        .then(empresa => {
            res.status(200).json({
                usuario: empresa,
                ok: 'true',
                mensaje: 'EnviarCorreo agregada'
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
//  Borrar correo enviado
// ==========================================

app.delete('/:id', (req, res, next) => {

    var id = req.params.id;

    EnviarCorreo.destroy({
            where: {
                id_correo: id
            }
        })
        .then(result => {
            res.status(200).json({
                ok: 'true',
                mensaje: 'EnviarCorreo eliminada',
                result: result
            })
        })
        .catch(err => {
            res.status(400).json({
                ok: 'false',
                mensaje: 'Error al eliminar empresa',
                error: err
            })
        })
});


// ==========================================
//  Actualizar correo, pero eso no se realiza. Creo que este método está de más
// ==========================================
app.put('/:id', (req, res, next) => {
    var id = req.params.id;
    var body = req.body;

    EnviarCorreo.update({
            // descripcion: body.nombre,
            // industria: body.industria,
            // ciudad: body.ciudad,
            //pendiente
        }, {
            where: {
                id_correo: id
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