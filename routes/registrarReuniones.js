const json = require('body-parser');
var express = require('express');
var app = express();
var Rreuniones = require('../models/registrarReuniones');
var auth = require('../middlewares/autenticacion')
var db = require('../config/database');

// ==========================================
//  Return all last calls from database
// ==========================================

app.get('/reporte', auth.verificaToken, (req, res) => {

    db.query('sp_reporteReuniones').then(reporteReuniones => {
        if (reporteReuniones) {
            res.status(200).json({
                mensaje: 'Reuniones - visitas realizadas',
                reporteReuniones: reporteReuniones[0]
            })
        }

        else {
            return res.status(500).json({
                ok: 'false',
                mensaje: "Error al recuperar las reuniones - visitas"
            })
        }
    })
});



// ==========================================
//  Obtener Reuniones
// ==========================================

app.get('/', (req, res) => {

    Rreuniones.findAll().then(reuniones => {
        if (reuniones) {
            res.status(200).json({
                ok: true,
                reuniones: reuniones
            })
        } else {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al recuperar reuniones'
            })
        }
    })
});

// ==========================================
//  Obtener Reuniones con ID
// ==========================================

app.get('/:id', auth.verificaToken, (req, res) => {

    var id = req.params.id;
     console.log(id)
    Rreuniones.findAll({
        where:{
            fkcontacto: id,
        },
        order: [
            ['id_regisreunion', 'DESC'], // Sorts by COLUMN_NAME_EXAMPLE in ascending order
      ]
    }).then(reuniones => {
        if (reuniones) {
            res.status(200).json({
                ok: 'true',
                mensaje: 'Solo reuniones del contacto',
                reuniones: reuniones
            })
        }
        else {
            return res.status(500).json({
                ok: 'false',
                mensaje: "Error al recuperar las reuniones  "
            })
        }
    })
});


// ==========================================
//  Obtener una reunion 
// ==========================================
// app.get('/:id', (req, res) => {

//     var id = req.params.id;
//     Rreuniones.findOne({
//             where: {
//                 id_regisreunion: id
//             }
//         })
//         .then(reunion => {
//             if (reunion) {
//                 res.status(200).json({
//                     ok: 'true',
//                     reunion: reunion
//                 });
//             } else {
//                 return res.status(400).json({
//                     ok: 'false',
//                     mensaje: 'No exite esa reunión'
//                 });
//             }
//         })
//         .catch(err => {
//             return res.status(500).json({
//                 ok: 'false',
//                 mensaje: 'Error al buscar reunión',
//                 error: err
//             });
//         })
// });

// ==========================================
//  Agregar reunion
// ==========================================
app.post('/', (req, res) => {
    var body = req.body;
    console.log('Esto estoy recibiendo: ',body);
    var fecha = new Date();
    console.log('intento imprimir fkContacto',body.fkcontacto);

    var fulldateTime = fecha.getFullYear()+'-'+fecha.getMonth()+'-'+fecha.getDate()+' '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
    var fullHora = fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();

    Rreuniones.create({

            descripcion: body.descripcion,
            fkcontacto: body.fkcontacto,
            resultado: body.resultado,
            fecha: (body.fecha)+' ' + fullHora,
            hora: body.hora,
            duracion: body.duracion,
            fkusuario: body.fkusuario,
            createdAt: fulldateTime,
            updatedAt: fulldateTime

        })
        .then(reunion => {
            res.status(200).json({
                reunion: reunion,
                ok: 'true',
                mensaje: 'Reunión agregada'
            })
        })
        .catch(err => {
            return res.status(500).json({
                ok: 'false',
                mensaje: 'Error al agregar reunión',
                errors: err
            })
        })
});


// ==========================================
//  Borrar reunion
// ==========================================

app.delete('/:id', (req, res, next) => {

    var id = req.params.id;

    Rreuniones.destroy({
            where: {
                id_regisreunion: id
            }
        })
        .then(result => {
            res.status(200).json({
                ok: 'true',
                mensaje: 'Reunión eliminada',
                result: result
            })
        })
        .catch(err => {
            res.status(400).json({
                ok: 'false',
                mensaje: 'Error al eliminar reunión',
                error: err
            })
        })
});

// ==========================================
//  Actualizar reunion
// ==========================================

app.put('/:id', (req, res, next) => {
    var id = req.params.id;
    var body = req.body;

    Rreuniones.update({
            descripcion: body.descripcionReunion,
            asistentes: body.asistentesReunion,
            resultado: body.resultadoReunion,
            fecha: body.fechaReunion,
            hora: body.horaReunion,
            duracion: body.duracionReunion,
            fkusuario: body.id

        }, {
            where: {
                id_regisreunion: id
            }
        }).then(result => {
            res.status(200).json({
                ok: 'true',
                mensaje: 'Reunion actualizado',
                result: result
            })
        })
        .catch(err => {
            res.status(400).json({
                ok: 'false',
                mensaje: 'Error al actualizar reunión',
                error: err
            })
        })
});



module.exports = app;