const json = require('body-parser');
var express = require('express');
var app = express();
var EtapaNegocio = require('../models/etapasNegocio');
var auth = require('../middlewares/autenticacion');
var db = require('../config/database');
// ==========================================
//  Obtener etapas de negocio
// ==========================================

app.get('/', (req, res) => {

    EtapaNegocio.findAll().then(etapas => {
        if (etapas) {
            res.status(200).json({
                ok: true,
                etapas: etapas
            })
        } else {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al recuperar etapas'
            })
        }
    })
});

// ==========================================
//  Obtener etapa con id
// ==========================================
app.get('/:id', auth.verificaToken, (req, res) => {

    var id = req.params.id;
    // console.log(id)
    EtapaNegocio.findAll({
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
//  Obtener etapa
// ==========================================
// app.get('/:id', (req, res) => {

//     var id = req.params.id;
//     EtapaNegocio.findOne({
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
//  Crear etapa
// ==========================================
app.post('/', (req, res) => {
    var body = req.body;
var fulldateTime = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()+' '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
var fullHora = fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();

//console.log('FullDateTime',fulldateTime);

    EtapaNegocio.create({
        descripcion: body.descripcionLlamada,
        fkempresa: body.empresaLlamada,
        fecha: (body.fechaLlamada) + fullHora,
        hora: body.horaLlamada,
        resultado_llamada: body.resultadoLlamada,
        fkusuario: body.id,
        createdAt: fulldateTime,
        updateAt:  fulldateTime
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
//  Borrar etapa
// ==========================================

app.delete('/:id', (req, res, next) => {

    var id = req.params.id;

    EtapaNegocio.destroy({
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
//  Actualizar etapa
// ==========================================

app.put('/:id', (req, res, next) => {
    
    var id = req.params.id;
    var body = req.body;
   // console.log('Recibido',body);
    var fecha = new Date();
    EtapaNegocio.update({
            nombre: body.nombre,
            probabilidad: body.probabilidad,
            updatedAt: fecha
        }, {
            where: {
                id_etapa: id
            }
        }).then(etapa => {
            res.status(200).json({
                ok: 'true',
                mensaje: 'Etapa actualizada'
            })
        })
        .catch(err => {
            res.status(400).json({
                ok: 'false',
                mensaje: 'No se pudo actualizar la etapa',
                error: err
            })
        })
});

module.exports = app;