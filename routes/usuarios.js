const { json } = require('body-parser');
var express = require('express');
var app = express();
var Usuario = require('../models/usuario');
var auth = require('../middlewares/autenticacion');
var db = require('../config/database');
const Sequelize = require('Sequelize');
var jwt = require('jsonwebtoken');
var Op = Sequelize.Op;
// Par encriptar la contraseña
var bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');


// ==========================================
//  Contar numero de usuarios
// ==========================================

app.get('/contadorUsuarios', auth.verificaToken, (req, res) => {

    db.query('sp_contadorUsuarios').then(contador => {
        if (contador) {
            res.status(200).json({
                contador: contador[0]
            })
        }
        else {
            return res.status(500).json({
                ok: 'false',
                mensaje: "Error al recuperar los datos"
            })
        }
    })
});



app.get('/paginacionUsuarios/:desde',  auth.verificaToken,  (req, res, next) => {
    //console.log("Estas en el backp");
    
    var desde = req.params.desde;
    Usuario.findAndCountAll({
        // Para lo de paginacion
        offset: parseInt( desde) , limit: 10
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
// Return a single contact with his id
// ==========================================
app.get('/unusuario/:id', auth.verificaToken, (req, res) => {

    var id = req.params.id;
    Usuario.findOne({
        where: {
            id_usuario: id
        }
    })
        .then(unUsuario => {
            if (unUsuario) {
                res.status(200).json({
                    ok: 'true',
                    unUsuario: unUsuario
                });
            }
            else {
                return res.status(400).json({
                    ok: 'false',
                    mensaje: 'No exite ese usuario'
                });
            }
        })
        .catch(err => {
            return re.status(500).json({
                ok: 'false',
                mensaje: 'Error al buscar el usuario',
                error: err
            });
        })
});

// ==========================================
//  Create a new user
// ==========================================
app.post('/',  auth.verificaToken, (req, res)=>{
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

//actualizar
app.put('/:id', auth.verificaToken, (req, res) =>{
    var id = req.params.id;
    var body = req.body;
    
   // console.log('Actualizar Usuario', body);
    Usuario.update(
        {
            nombre: body.nombre,
            email: body.email,
            rol: body.rol
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

//actualizar password

app.put('/cambiar/:password/:id/',  auth.verificaToken,(req, res) =>{
    var id = req.params.id;
    var pass= req.params.password;   
    
    //console.log('Actualizar password del Usuario', id,pass);
    Usuario.update(
        {
            password: bcrypt.hashSync(pass)
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
                mensaje: 'No se encuentra el usuario'
            })
        }
    })
    .catch(err =>{
        return res.status(500).json({
            ok: 'false',
            mensaje: 'Error al actualizar el usuario'
        })
    })
});


// ==========================================
//  Delete an user
// ==========================================
app.delete('/:id',  auth.verificaToken, (req, res) =>{
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


app.post('/password/:id/:pass/', (req, resp) => {
    var body = req.body;
    var passA = req.params.pass;
    var id = req.params.id;
    Usuario.findOne({
        where: {
            id_usuario: id
        }
    })
    .then(usuario =>{
        if(usuario){
            if(!bcrypt.compareSync(passA, usuario.dataValues.password)){
                resp.status(400).json({
                    ok: 'false',
                    mensaje: 'Error, contraseña incorrecta'
                })
            }
            else{
               
                resp.status(200).json({
                    ok: 'true',
                    usuario: usuario
                    
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
    .catch(err =>
        console.log(err)
    )        
});

module.exports = app;