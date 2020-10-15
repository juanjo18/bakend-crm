const { json } = require('body-parser');
var express = require('express');
var app = express();
var Usuario = require('../models/usuario');

// Par encriptar la contraseña
var bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');


app.get('/', (req, res, next) => {
    console.log("Estas en el backp");
    
    Usuario.findAndCountAll({
        // Para lo de paginacion
        offset:0 , limit: 10
    })
    .then(usuarios => {
        res.status(200).json({
            total: usuarios.count,
            usuarios: usuarios.rows
        })
    })
    .catch(err => {
        return res.status(500).json({
            ok: 'false',
            mensaje: 'Error al obtener los usuarios',
            errors: err
        })
    })
    
});

// ==========================================
//  Create a new user
// ==========================================
app.post('/',  (req, res)=>{
    var body = req.body;

    Usuario.create({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        rol: body.rol
    })
    .then(usuario =>{
		res.status(200).json({
            usuario: usuario,
			ok: 'true',
			mensaje: 'Usuario creado bien'
		})
	})
	.catch( err => {
        return res.status(500).json({
            ok: 'false',
            mensaje: 'Error al crear el usuario',
            errors: err
        })
    })
});

app.put('/:id', (req, res) =>{
    var id = req.params.id;
    var body = req.body;
    
    Usuario.update(
        {
            nombre: body.nombre,
            email: body.email
        },

        { where: {
            id_usuario : id
        }}
    )
    .then(resultado => {
        if(resultado){
            res.status(200).json({
                ok: 'true',
                mensaje: 'Usuario actualizado'
            })
        }
        else{
            return res.status(400).json({
                ok: 'false',
                mensaje: 'No es encuentra ese usuario'
            })
        }
    })
    .catch(err =>{
        return res.status(500).json({
            ok: 'false',
            mensaje: 'Error al actualizaar el usuario'
        })
    })
});

// ==========================================
//  Delete an user
// ==========================================
app.delete('/:id', (req, res) =>{
    var id = req.params.id;

    Usuario.destroy({
        where: {
            id_usuario: id
        }
    })
    .then(resultado => {
        res.status(200).json({
            ok: 'true',
            mensaje: 'Usuario Eliminado'
        })
    })
    .catch(err => {
        return res.status(500).json({
            ok: 'false',
            mensaje: 'Error al eliminar el usuario',
            error: err
        })
    })
});

module.exports = app;