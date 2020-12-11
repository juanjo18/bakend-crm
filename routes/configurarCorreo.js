const { json } = require('body-parser');
var express = require('express');
var app = express();
var Configura = require('../models/configurarCorreo');
var auth = require('../middlewares/autenticacion');
var crypto = require('crypto');



app.get('/', auth.verificaToken, (req, res) => {

    var id = req.query.id;
console.log(id)
    Configura.findAll({
        attributes: ['host', 'email'],
        where: {
            fk_usuario: id
        }
    }
    ).then(configuracion => {

        console.log('conf', configuracion.length)

        if(configuracion.length == 0){
            res.status(200).json({
                ok: false,
                mensaje: 'Sin configuración',
                configuracion: {
                    email: '',
                    host: '',
                    password: ''

                }
            })
        }

        console.log(configuracion[0]);
        res.status(200).json({
            ok: true,
            mensaje: 'Configuracion existente',
            configuracion: configuracion[0]
        })


    })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al recuperar la configuracion',
            })
        })
});


app.post('/', auth.verificaToken, (req, res) => {

    var body = req.body;
    var mykey = crypto.Cipher('aes-128-cbc', 'mypassword');
    var passwordEncripted = mykey.update(body.password, 'utf8', 'hex')
    passwordEncripted += mykey.final('hex');
    console.log('Encriptado:', passwordEncripted);


    Configura.create({
        host: body.host,
        puerto: 587,
        email: body.email,
        password: passwordEncripted,
        fk_usuario: body.fkusuario
    })
        .then(configuracion => {
            console.log('Datos guardados');
            res.status(200).json({
                ok: 'true',
                mensaje: 'configuracion creada',
            })
        })
        .catch(err => {
            return res.status(400).json({
                ok: 'false',
                mensaje: 'Error al guardar la configuracion'
            })
        })
});

app.put('/', auth.verificaToken, (req, res, next) => {
    
    var body = req.body;

    var mykey = crypto.Cipher('aes-128-cbc', 'mypassword');
    var passwordEncripted = mykey.update(body.password, 'utf8', 'hex')
    passwordEncripted += mykey.final('hex');
   
    Configura.update({

        host: body.host,  
        email: body.email,
        password: passwordEncripted

        }, {
            where: {
                fk_usuario: body.fkusuario
            }
        }).then(configuracion => {
            res.status(200).json({
                ok: 'true',
                mensaje: 'Configuración actualizada',
                configuracion: configuracion
            })
        })
        .catch(err => {
            res.status(400).json({
                ok: 'false',
                mensaje: 'Error al actualizar configuración',
                error: err
            })
        })
});

module.exports = app;