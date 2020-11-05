const { json } = require('body-parser');
var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
var Usuario = require('../models/usuario');

app.post('/', (req, resp) => {
    var body = req.body;

    Usuario.findOne({
        where: {
            email: body.email
        }
    })
    .then(usuario =>{
        if(usuario){
            if(!bcrypt.compareSync(body.password, usuario.dataValues.password)){
                resp.status(400).json({
                    ok: 'false',
                    mensaje: 'Error, contraseña incorrecta'
                })
            }
            else{

                var d = new Date();
                var calculatedExpiresIn = (((d.getTime()) + (60 * 60 * 1000)) - (d.getTime() - d.getMilliseconds()) / 1000);
                var token = jwt.sign({ usuario: usuario.dataValues.id_usuario,"iat": (new Date().getTime()) }, SEED, {expiresIn: calculatedExpiresIn}) 
               
                resp.status(200).json({
                    ok: 'true',
                    usuario: usuario,
                    token,
                    calculatedExpiresIn
                })
            }
        }
        else{
            return resp.status(400).json({
                ok: 'false',
                mensaje: 'Correo no existente'
            })
        }
    })
    .catch(err => console.log(err))
});


module.exports = app;