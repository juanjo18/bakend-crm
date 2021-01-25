const json = require('body-parser');
var express = require('express');
var app = express();
var Rllamada = require('../models/registrarLlamada');
var auth = require('../middlewares/autenticacion');
var db = require('../config/database');


// ==========================================
//  Return all last calls from database
// ==========================================

app.get('/reporte', auth.verificaToken, (req, res) => {

    db.query('sp_reporteLlamadas').then(reporteLlamadas => {
        if (reporteLlamadas) {
            res.status(200).json({
                mensaje: 'Llamadas realizadas',
                reporteLlamadas: reporteLlamadas[0]
            })
        }

        else {
            return res.status(500).json({
                ok: 'false',
                mensaje: "Error al recuperar las llamadas"
            })
        }
    })
});


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
     //console.log(id)
    Rllamada.findAll({
        where:{
            fkcontacto: id,
        },
        order: [
            ['id_llamada', 'DESC'], // Sorts by COLUMN_NAME_EXAMPLE in ascending order
      ]
    }).then(llamadas => {
        if (llamadas) {
            res.status(200).json({
                ok: 'true',
                mensaje: 'Solo llamadas del contacto',
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

   // console.log('esto recibo para llamada', body);
var fecha = new Date();
var fulldateTime = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()+' '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
var fullHora = fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
//console.log('FullDateTime',fulldateTime);

//console.log('Descipcion',body.descripcion);
    Rllamada.create({

        descripcion: body.descripcion,
        fkcontacto: body.fkcontacto,
        fecha: (body.fecha)+' '+fullHora,
        hora: body.hora,
        resultado_llamada: body.resultado_llamada,
        fkusuario: body.fkusuario,
        createdAt: fulldateTime,
        updateAt: fulldateTime
        })
        .then(llamada => {
            res.status(200).json({
                llamada: llamada,
                ok: 'true',
                mensaje: 'Reunion agregada'
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

app.delete('/:id',  auth.verificaToken, (req, res, next) => {

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
    var fecha = new Date();
    Rllamada.update({
            descripcion: body.descripcion,
            fkcontacto: body.fkcontacto,
            fecha: body.fecha,
            hora: body.hora,
            resultado_llamada: body.resultado_llamada,
            fkusuario: body.fkusuario,
            createdAt: fecha,
            updateAt: fecha

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