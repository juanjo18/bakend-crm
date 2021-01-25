const json = require('body-parser');
var express = require('express');
var app = express();
var Rcorreo = require('../models/registrarCorreo');
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
     //console.log(id)
    Rcorreo.findAll({
        where:{
            fkcontacto: id,
        },order: [
            ['id_rcorreo', 'DESC'], // Sorts by COLUMN_NAME_EXAMPLE in ascending order
      ]
    }).then(correos => {
        if (correos) {
            res.status(200).json({
                ok: 'true',
                mensaje: 'Solo correos del contacto',
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
    var fecha = new Date();
    var fulldateTime = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()+' '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
    //console.log('FullDateTime',fulldateTime);
    var fullHora = fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
    //console.log('Esto recibo', body);
    Rcorreo.create({

            descripcion: body.descripcion,
            fecha: (body.fecha)+' '+fullHora,
            hora: body.hora,
            fkcontacto: body.fkcontacto,
            fkusuario: body.fkusuario,
            createdAt: fulldateTime,
            updatedAt: fulldateTime

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
app.delete('/:id',auth.verificaToken, (req, res, next) => {

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
            fkcontacto: body.contactado,
            fkusuario: body.id
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