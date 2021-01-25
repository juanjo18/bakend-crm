const {json} = require('body-parser');
var express = require('express');
var app = express();
var Nota = require('../models/nota');
var auth = require('../middlewares/autenticacion')
// ==========================================
//  Obtener todas las notas
// ==========================================

app.get('/', (req, res) => {

    Nota.findAll().then(notas => {
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
//     Nota.findOne({
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
    Nota.findAll({
        where:{
            fkcontactos: id,
        },
        order: [
            ['id_nota', 'DESC'], // Sorts by COLUMN_NAME_EXAMPLE in ascending order
      ]
    }).then(notas => {

        // var fecha = Fecha.notas.dataValues.createdAt;
        // console.log(fecha.getDay());
        if (notas) {
            res.status(200).json({
                ok: 'true',
                mensaje: 'Solo notas del contacto',
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
    var fecha = new Date();
    var fulldateTime = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()+' '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
   // console.log('FullDateTime',fulldateTime);
    
    Nota.create({
            comentario: body.comentario,  
            fkusuario: body.fkusuario,
            fkcontactos: body.fkcontacto,
            createdAt:  fulldateTime,
            updatedAt: fulldateTime

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

app.delete('/:id', auth.verificaToken, (req, res, next) => {

    var id = req.params.id;

    Nota.destroy({
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

    Nota.update({
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