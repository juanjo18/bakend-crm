var express = require('express');
var app = express();
var Usuario = require('../models/usuario');
// Par encriptar la contraseña
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

app.put('/', verifyToken, (req, res) => {

    var password = req.body.password;
    //console.log('Entra al put');
    jwt.verify(req.token, 'secretKey', (error, authData) => {
        if (error) {
            res.status(403).json({
                mensaje: 'Ha expirado el token'
            })
        }
        else {

          //  console.log(authData.email);
            Usuario.update(
                {
                    password: bcrypt.hashSync(password, 10)
                },
                {
                    where: {
                        email: authData.email
                    }
                }
            )
                .then(resultado => {
                    if (resultado) {
                        res.status(200).json({
                            ok: 'true',
                            mensaje: 'Contraseña actualizada'
                        })
                    }
                    else {
                        return res.status(400).json({
                            ok: 'false',
                            mensaje: 'No se actualizó la contraseña'
                        })
                    }
                })
                .catch(err => {
                    return res.status(500).json({
                        ok: 'false',
                        mensaje: 'Error de servidor'
                    })
                })
        }
    })
});

//Authotization: Bearer <token>
function verifyToken(req, res, next) {

    //console.log('Verify token');
    var bearerHeader = req.body.tokenReset;

   // console.log('Longitud',bearerHeader.length);

   // console.log('Bearer token obtenido', bearerHeader);
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }
    else {
        res.status(403).json({
            mensaje: 'Verify Token, No se ha recibido un token valido'
        });
    }
}

module.exports = app;