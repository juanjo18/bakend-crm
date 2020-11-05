const json = require('body-parser');
var express = require('express');
var app = express();
var Rllamada = require('../models/llamadasEmpresas');
var auth = require('../middlewares/autenticacion')
// ==========================================
//  Obtener llamadas 
// ==========================================

app.get('/', (req, res) => {

    Rllamada.findAll().then(llamadas => {
        if (llamadas) {
            res.status(200).json({
                ok: true,
                llamadas: llamadas
            })
        } else {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al recuperar llamadas'
            })
        }
    })
});

// ==========================================
//  Obtener llamada con id
// ==========================================
app.get('/:id', auth.verificaToken, (req, res) => {

    var id = req.params.id;
     console.log(id)
    Rllamada.findAll({
        where:{
            fkempresa: id,
        }
    }).then(llamadas => {
        if (llamadas) {
            res.status(200).json({
                ok: 'true',
                mensaje: 'Solo llamadas de la empresa',
                llamadas: llamadas
            })
        }
        else {
            return res.status(500).json({
                ok: 'false',
                mensaje: "Error al recuperar las llamadas "
            })
        }
    })
});
// ==========================================
//  Obtener llamada
// ==========================================
// app.get('/:id', (req, res) => {

//     var id = req.params.id;
//     Rllamada.findOne({
//             where: {
//                 id_llamada: id
//             }
//         })
//         .then(llamada => {
//             if (llamada) {
//                 res.status(200).json({
//                     ok: 'true',
//                     llamada: llamada
//                 });
//             } else {
//                 return res.status(400).json({
//                     ok: 'false',
//                     mensaje: 'No exite esa llamada'
//                 });
//             }
//         })
//         .catch(err => {
//             return res.status(500).json({
//                 ok: 'false',
//                 mensaje: 'Error al buscar llamada',
//                 error: err
//             });
//         })
// });

// ==========================================
//  Crear llamada
// ==========================================
app.post('/', (req, res) => {
    var body = req.body;

    Rllamada.create({
        descripcion: body.descripcionLlamada,
        fkempresa: body.empresaLlamada,
        fecha: body.fechaLlamada,
        hora: body.horaLlamada,
        resultado_llamada: body.resultadoLlamada,
        fkusuario: body.id,
        createdAt: body.createdAtLlamada,
        updateAt:body.updateAtLlamada
        })
        .then(llamadaempresas => {
            res.status(200).json({
                llamadaempresas: llamadaempresas,
                ok: 'true',
                mensaje: 'Llamada agregada'
            })
        })
        .catch(err => {
            return res.status(500).json({
                ok: 'false',
                mensaje: 'Error al agregar llamada',
                errors: err
            })
        })
});


// ==========================================
//  Borrar Llamada
// ==========================================

app.delete('/:id', (req, res, next) => {

    var id = req.params.id;

    Rllamada.destroy({
            where: {
                id_llamada: id
            }
        })
        .then(result => {
            res.status(200).json({
                ok: 'true',
                mensaje: 'Llamada eliminada',
                result: result
            })
        })
        .catch(err => {
            res.status(400).json({
                ok: 'false',
                mensaje: 'Error al eliminar llamada',
                error: err
            })
        })
});

// ==========================================
//  Actualizar llamada
// ==========================================

app.put('/:id', (req, res, next) => {
    var id = req.params.id;
    var body = req.body;

    Rllamada.update({
            descripcion: body.descripcionLlamada,
            fkempresa: body.empresaLlamada,
            fecha: body.fechaLlamada,
            hora: body.horaLlamada,
            resultado_llamada: body.resultadoLlamada,
            fkusuario: body.id,
            createdAt: body.createdAtLlamada,
            update:body.updateLlamada
        }, {
            where: {
                id_llamada: id
            }
        }).then(result => {
            res.status(200).json({
                ok: 'true',
                mensaje: 'Llamada actualizada',
                result: result
            })
        })
        .catch(err => {
            res.status(400).json({
                ok: 'false',
                mensaje: 'Error al actualizar llamada',
                error: err
            })
        })
});

module.exports = app;