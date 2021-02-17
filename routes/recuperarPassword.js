const { json } = require('body-parser');
var express = require('express');
var app = express();
var db = require('../config/database');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

const nodemailer = require("nodemailer");

var emailEnviado = false;

app.post('/', (req, res) => {

    var body = req.body;
    var email = body.email;

   // console.log(email);

    db.query('sp_recuperaPassword' + ' ' + "'" + email + "'").then(usuario => {

        if (usuario[0].length != 0) {

           // console.log('Se está mandando el correo');
            var transporter = nodemailer.createTransport({
                host: "mail.clicksoft.mx",
                port: 993,
                secure: false,
                auth: {
                    user: "pruebas@clicksoft.mx",
                    pass: "pruebas.2021"
                },
            })

            var token = jwt.sign({ email, }, 'secretKey', { expiresIn: '3600s' });

            var mailOptions = {
                from: '"Clicksoft" <soporte@clicksoft.com.mx>',
                to: email,
                subject: "Recuperación de contraseña",
                subject: "Restablecimiento de contraseña",
                text: 'Estás recibiendo este correo porque tú (o alguien más) ha solicitado restablecer la contraseña para tu cuenta.\n\n' +
                    'Por favor haz click en el siguiente enlace, o copia y pega en tu navegador para completar el proceso\n\n' +
                    'Dispone de una hora para realizar el cambio, pasada la hora deberá realizar una nueva solicitud de cambio de contraseña\n\n' +
                    'http://192.168.49.15:8080/#/reset/' + token + '\n\n' +
                    'Nota: Si tu no lo solicitaste, por favor ignora este correo y la contraseña permanecerá sin cambios.\n'
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                 //   console.log(error);
                }
                else {
                  //  console.log('Correo enviado');
                    emailEnviado = true;
                }
            })

            if (emailEnviado = true) {

                return res.status(200).json({
                    ok: 'true',
                    mensaje: "correo enviado",
                })
            }

        }

        else {
            //console.log('Falló');
            return res.status(500).json({
                ok: 'false',
                mensaje: "El usuario no existe"
            })
        }
    })
});



module.exports = app;