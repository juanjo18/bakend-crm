const { json } = require('body-parser');
var express = require('express');
var app = express();
var Contacto = require('../models/contacto');
var auth = require('../middlewares/autenticacion')


// ==========================================
//  Return all contacts from database
// ==========================================

app.get('/', auth.verificaToken, (req, res) => {

    Contacto.findAll().then(contactos => {
        if (contactos) {
            res.status(200).json({
                ok: 'true',
                mensaje: 'todos los contactos',
                contactos: contactos
            })
        }
        else {
            return res.status(500).json({
                ok: 'false',
                mensaje: "Error al recuperar los datos "
            })
        }
    })
});


// ==========================================
// Return all contacts whith clause where id
// ==========================================

app.get('/miscontactos/:miId', auth.verificaToken, (req, res) => {

    var miId = req.params.miId;
     console.log(miId)
    Contacto.findAll({
        where:{
            propietario_registro: parseInt(miId),
        }
    }).then(misContactos => {
        if (misContactos) {
            res.status(200).json({
                ok: 'true',
                mensaje: 'Solo mis Contactos',
                misContactos: misContactos
            })
        }
        else {
            return res.status(500).json({
                ok: 'false',
                mensaje: "Error al recuperar los mis contactos "
            })
        }
    })
});


// ==========================================
// Return a single contact with his id
// ==========================================
app.get('/:id', auth.verificaToken, (req, res) => {

    var id = req.params.id;
    console.log('id C Recibido',id);
    Contacto.findOne({
        where: {
            id_contacto: id
        }
    })
        .then(unContacto => {
            if (unContacto) {
                res.status(200).json({
                    ok: 'true',
                    unContacto: unContacto
                });
            }
            else {
                return res.status(400).json({
                    ok: 'false',
                    mensaje: 'No exite ese contacto'
                });
            }
        })
        .catch(err => {
            return re.status(500).json({
                ok: 'false',
                mensaje: 'Error al buscar el contacto',
                error: err
            });
        })
});

// ==========================================
//  Create a new contact
// ==========================================
app.post('/', auth.verificaToken, (req, res) => {

    var body = req.body;
    var fecha = new Date();

    console.log(body);
    Contacto.create({
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        telefono: body.telefono,
        departamento: body.departamento,
        propietario_registro: body.propietario_registro,
        fkempresa: body.fkempresa,
        createdAt: fecha,
        updatedAt: fecha
    })
        .then(contacto => {
            res.status(200).json({
                ok: 'true',
                mensaje: 'contacto creado',
                contacto: contacto
            })
        })
        .catch(err => {
            return res.status(400).json({
                ok: 'false',
                mensaje: 'Error al crear el contacto',
                errors: err
            })
        })
});

// ==========================================
//  Delete a contact 
// ==========================================
app.delete('/:id', auth.verificaToken, (req, res, next) => {

    var id = req.params.id;

    Contacto.destroy({
        where: {
            id_contacto: id
        }
    })
        .then(result => {
            res.status(200).json({
                ok: 'true',
                mensaje: 'contacto eliminado',
                result: result
            })
        })
        .catch(err => {
            res.status(400).json({
                ok: 'false',
                mensaje: 'Error al eliminar el contacto, verificar',
                error: err
            })
        })
});


// ==========================================
//  Update only one contact
// ==========================================

app.put('/:id', auth.verificaToken, (req, res, next) => {
    var id = req.params.id;
    var body = req.body;

    Contacto.update({
        nombre: body.nombre,
        apellido: body.apellido,
        correo: body.correo,
        telefono: body.telefono,
        departamento: body.departamento,
        propietario_registro: body.propietario,
        fkempresa: body.empresa,
        ultima_actividad: body.ultima
    }, {
        where: {
            id_contacto: id
        }
    }).then(result => {
        res.status(200).json({
            ok: 'true',
            mensaje: 'Contacto actualizado',
            result: result
        })
    })
        .catch(err => {
            res.status(400).json({
                ok: 'false',
                mensaje: 'Error al actualizar contacto',
                error: err
            })
        })
});
module.exports = app;