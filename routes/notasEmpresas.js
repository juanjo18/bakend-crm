const json = require('body-parser');
var express = require('express');
var app = express();
var NotasEmpresas = require('../models/notasEmpresas');
var auth = require('../middlewares/autenticacion')
// ==========================================
//  Obtener todas las notas
// ==========================================

app.get('/', (req, res) => {

    NotasEmpresas.findAll().then(notas => {
        if (notas) {
            res.status(200).json({
                ok: true,
                notas: notas
            })
        } else {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al recuperar notas'
            })
        }
    })
});

// ==========================================
//  Obtener una nota
// ==========================================
// app.get('/:id', (req, res) => {

//     var id = req.params.id;
//     NotasEmpresas.findOne({
//             where: {
//                 id_nota: id
//             }
//         })
//         .then(nota => {
//             if (nota) {
//                 res.status(200).json({
//                     ok: 'true',
//                     mensaje: 'solo una nota',
//                     nota: nota
//                 });
//             } else {
//                 return res.status(400).json({
//                     ok: 'false',
//                     mensaje: 'No exite esa nota'
//                 });
//             }
//         })
//         .catch(err => {
//             return res.status(500).json({
//                 ok: 'false',
//                 mensaje: 'Error al buscar nota',
//                 error: err
//             });
//         })
// });



// ==========================================
//  ontener notas con id
// ==========================================
app.get('/:id', auth.verificaToken, (req, res) => {

    var id = req.params.id;
     console.log(id)
    NotasEmpresas.findAll({
        where:{
            fkempresa: id,
        }
    }).then(notas => {
        if (notas) {
            res.status(200).json({
                ok: 'true',
                mensaje: 'Solo notas de la empresa',
                notas: notas
            })
        }
        else {
            return res.status(500).json({
                ok: 'false',
                mensaje: "Error al recuperar las notas "
            })
        }
    })
});

// ==========================================
//  crear una nota
// ==========================================
app.post('/', (req, res) => {
    var body = req.body;

    NotasEmpresas.create({
            comentario: body.descripcion,
            fkusuario: body.id

        })
        .then(nota => {
            res.status(200).json({
                nota: nota,
                ok: 'true',
                mensaje: 'Nota agregada'
            })
        })
        .catch(err => {
            return res.status(500).json({
                ok: 'false',
                mensaje: 'Error al agregar nota',
                errors: err
            })
        })
});


// ==========================================
//  Borrar nota
// ==========================================

app.delete('/:id', (req, res, next) => {

    var id = req.params.id;

    NotasEmpresas.destroy({
            where: {
                id_nota: id
            }
        })
        .then(result => {
            res.status(200).json({
                ok: 'true',
                mensaje: 'Nota eliminada',
                result: result
            })
        })
        .catch(err => {
            res.status(400).json({
                ok: 'false',
                mensaje: 'Error al eliminar nota',
                error: err
            })
        })
});


// ==========================================
//  Actualizar nota
// ==========================================

app.put('/:id', (req, res, next) => {
    var id = req.params.id;
    var body = req.body;

    NotasEmpresas.update({
            comentario: body.descripcion,
            fkusuario: body.id
        }, {
            where: {
                id_nota: id
            }
        }).then(result => {
            res.status(200).json({
                ok: 'true',
                mensaje: 'Nota actualizada',
                result: result
            })
        })
        .catch(err => {
            res.status(400).json({
                ok: 'false',
                mensaje: 'Error al actualizar nota',
                error: err
            })
        })
});

module.exports = app;