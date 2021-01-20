const json = require('body-parser');
var express = require('express');
var app = express();
const nodemailer = require("nodemailer");
var db = require('../config/database');
var crypto = require('crypto');
var auth = require('../middlewares/autenticacion');
var CorreoEnviado = require('../models/enviarCorreo');


var host;
var puerto;
var user;
var psw;

// ==========================================
//  Enviar correo como tal
// ==========================================

app.post('/send', (req, res) => {

    var remitente = req.body.remitenteEmail;
    var destinatario = req.body.destinatario;
    var asunto = req.body.asunto;
    var descripcionCorreo = req.body.descripcionCorreo;
    var remitenteNombre = req.body.remitenteNombre;

    var fkcontacto = req.body.fkcontacto;
    var fkusuario = req.body.fkusuario

    console.log(remitente);
    console.log(destinatario);
    console.log(asunto);
    console.log(descripcionCorreo);
    console.log(remitenteNombre);
    console.log('Fk contacto: ',fkcontacto);
    console.log('Fk usuario' ,fkusuario);


    db.query('sp_configuracionCorreo' + ' "' + remitente + '"').then(configuracion => {
        if (configuracion) {
            host = configuracion[0][0].host;
            puerto = configuracion[0][0].puerto;
            user = remitente;
            psw = configuracion[0][0].password;

            console.log('Configuración', host, puerto, user, psw);

            var mykey = crypto.Decipher('aes-128-cbc', 'mypassword');
            var psw = mykey.update(psw, 'hex', 'utf8')
            psw += mykey.final('utf8');
            
            var transporter = nodemailer.createTransport({
                host: host,
                port: puerto,
                secure: false,
                auth: {
                    user: remitente,
                    pass: psw
                },
            })


            var mailOptions = {
                from: remitenteNombre + '<' + remitente + '>',
                to: destinatario,
                subject: asunto,
                text: descripcionCorreo,
                // attachments: [
                //     {
                //         path: `./uploads/VistasCRM.pdf`
                //     }
                // ]
            }


            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Correo no enviado'
                    })
                }
                else {
                    
                    var fecha = new Date();
                    var fulldateTime = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()+' '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
                    var fullHour = fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
                    

                    CorreoEnviado.create({
                        
                        remitente: remitente,
                        descripcion: descripcionCorreo,
                        asunto: asunto,
                        destinatario: destinatario,
                        createdAt: fulldateTime,
                        hora: fullHour,
                        fkcontacto: fkcontacto,
                        fkusuario: fkusuario

                    })
                        .then(configuracion => {
                            console.log('Datos guardados');
                            console.log(configuracion);
                            // res.status(200).json({
                            //     ok: 'true',
                            //     mensaje: 'configuracion creada',
                            // })
                        })
                        .catch(err => {
                            console.log('Error al guardar los datos');
                            // return res.status(400).json({
                            //     ok: 'false',
                            //     mensaje: 'Error al guardar la configuracion'
                            // })
                        })

                    console.log('Correo enviado');
                    return res.status(200).json({
                        ok: true,
                        mensaje: 'Correo enviado'
                    })

                }
            })
        }

        else {
            console.log('Error al obtener configuracion de correo');
            return res.status(500).json({
                ok: 'false',
                mensaje: "Error al recuperar los datos de configuración del correo"
            })
        }

    })
    // Configuración del server de Email
});



// ==========================================
//  Return all last calls from database
// ==========================================

app.get('/reporte', auth.verificaToken, (req, res) => {

    db.query('sp_reporteCorreos').then(reporteCorreos => {
        if (reporteCorreos) {
            res.status(200).json({
                mensaje: 'Llamadas realizadas',
                reporteCorreos: reporteCorreos[0]
            })
        }

        else {
            return res.status(500).json({
                ok: 'false',
                mensaje: "Error al recuperar reporte de correos"
            })
        }
    })
});

// ==========================================
//  PENDIENTE PENDIENTE PENDIENTE PENDIENTE
// ==========================================

app.get('/enviados/:fkcontacto', (req, res) => {

    var fkcontacto = req.params.fkcontacto;
    console.log("Fk contacto", fkcontacto);
    CorreoEnviado.findAll({
        where: {
            fkcontacto: fkcontacto
        }
    }).then(eCorreos => {
        if (eCorreos) {
            console.log(eCorreos);
            res.status(200).json({
                eCorreos: eCorreos
            })
        } else {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al recuperar correos'
            })
        }
    })
});


// // ==========================================
// //  Obtener un correo enviado
// // ==========================================

// app.get('/:id', (req, res) => {

//     var id = req.params.id;
//     EnviarCorreo.findOne({
//             where: {
//                 id_correo: id
//             }
//         })
//         .then(eCorreo => {
//             if (eCorreo) {
//                 res.status(200).json({
//                     ok: 'true',
//                     eCorreo: eCorreo
//                 });
//             } else {
//                 return res.status(400).json({
//                     ok: 'false',
//                     mensaje: 'No exite ese correo'
//                 });
//             }
//         })
//         .catch(err => {
//             return res.status(500).json({
//                 ok: 'false',
//                 mensaje: 'Error al buscar correo',
//                 error: err
//             });
//         })
// });


// // ==========================================
// //  Crear correo enviado
// // ==========================================

// app.post('/', (req, res) => {
//     var body = req.body;

//     EnviarCorreo.create({
//             // descripcion: body.nombre,
//             // industria: body.industria,
//             // ciudad: body.ciudad,
//             //pendiente

//         })
//         .then(correo => {
//             res.status(200).json({
//                 usuario: correo,
//                 ok: 'true',
//                 mensaje: 'Correo agregado'
//             })
//         })
//         .catch(err => {
//             return res.status(500).json({
//                 ok: 'false',
//                 mensaje: 'Error al agregar correo',
//                 errors: err
//             })
//         })
// });

// // ==========================================
// //  Borrar correo enviado
// // ==========================================

// app.delete('/:id', (req, res, next) => {

//     var id = req.params.id;

//     EnviarCorreo.destroy({
//             where: {
//                 id_correo: id
//             }
//         })
//         .then(result => {
//             res.status(200).json({
//                 ok: 'true',
//                 mensaje: 'Correo eliminado',
//                 result: result
//             })
//         })
//         .catch(err => {
//             res.status(400).json({
//                 ok: 'false',
//                 mensaje: 'Error al eliminar correo',
//                 error: err
//             })
//         })
// });


// // ==========================================
// //  Actualizar correo, pero eso no se realiza. Creo que este método está de más
// // ==========================================
// app.put('/:id', (req, res, next) => {
//     var id = req.params.id;
//     var body = req.body;

//     EnviarCorreo.update({
//             // descripcion: body.nombre,
//             // industria: body.industria,
//             // ciudad: body.ciudad,
//             //pendiente
//         }, {
//             where: {
//                 id_correo: id
//             }
//         }).then(result => {
//             res.status(200).json({
//                 ok: 'true',
//                 mensaje: 'Correo actualizado',
//                 result: result
//             })
//         })
//         .catch(err => {
//             res.status(400).json({
//                 ok: 'false',
//                 mensaje: 'Error al actualizar correo',
//                 error: err
//             })
//         })
// });


module.exports = app;