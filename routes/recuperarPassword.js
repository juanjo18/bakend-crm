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

    console.log(email);

    db.query('sp_recuperaPassword' + ' ' + "'" + email + "'").then(usuario => {

        if (usuario[0].length != 0) {

            console.log('Se está mandando el correo');
            var transporter = nodemailer.createTransport({
                host: "smx10.hostdime.com.mx",
                port: 587,
                secure: false,
                auth: {
                    user: "josorio@cs.clicksoft.com.mx",
                    pass: "Osorio.JJ.20"
                },
            })
        
            // + req.headers.host + 

            var d = new Date();
                var calculatedExpiresIn = (((d.getTime()) + (5 * 60 * 1000)) - (d.getTime() - d.getMilliseconds()) / 1000);
                var token = jwt.sign({ email,"iat": (new Date().getTime()) }, SEED, {expiresIn: calculatedExpiresIn}) 

                console.log('Expires', calculatedExpiresIn);
               
        
            var mailOptions = {
                from: '"Clicksoft" <soporte@clicksoft.com.mx>',
                to: email,
                subject: "Recuperación de contraseña",
                subject: "Restablecimiento de contraseña",
                text: 'Estás recibiendo este correo por tú (o alguien más) ha solicitado restablecer la contraseña para tu cuenta.\n\n' +
                 'Por favor haz click en el siguiente enlace, o copia y pega en tu navegador para completar el proceso\n\n' +
                 'http://localhost:4200/reset/'+token +  '\n\n' +
                 'Si tu no lo solicitaste, por favor ignora este correo y tu contraseña permanecerá sin cambios.\n'
            }
           
            transporter.sendMail(mailOptions, (error, info) =>{
                if(error){
                    console.log(error);
                }
                else{
                   console.log('Correo enviado');
                   emailEnviado = true;
                }
            })

            if(emailEnviado=true){
                
                return res.status(200).json({
                    ok: 'true',
                    mensaje: "correo enviado",
                    tokenReset: token,
                    expiresIn: calculatedExpiresIn
                })
            }
        }

        else {
            console.log('Falló');
            return res.status(500).json({
                ok: 'false',
                mensaje: "El usuario no existe"
            })
        }
    })
});



module.exports = app;