const { json } = require('body-parser');
var express = require('express');
var app = express();
var Contacto = require('../models/contacto');


// ==========================================
//  Return all contacts from database
// ==========================================
app.get('/', (req, res) =>{

    Contacto.findAll().then( contactos =>{
        if(contactos){
            res.status(200).json({
                ok: 'true',
                contactos: contactos
            })
        }
        else{
            return res.status(500).json({
                ok: 'false',
                mensaje: "Error al recueprar los datos "
            })
        }
    })
});

// ==========================================
// Return a single contact with his id
// ==========================================
app.get('/:id', (req, res)=>{

    var id = req.params.id;
    Contacto.findOne({
        attributes: ['nombre', 'correo'],
        where:{
            id_contacto: id
        }
    })
    .then(contacto => {
        if(contacto){
            res.status(200).json({
                ok: 'true',
                contacto: contacto
            });
        }
        else{
            return res.status(400).json({
                ok: 'false',
                mensaje: 'No exite ese contacto'
            });
        }
    })
    .catch(err =>{
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
app.post('/',  (req, res)=>{

    var body = req.body;
    
    Contacto.create({
        nombre: body.nombre,
        apellido: body.apellido,
        correo: body.correo,
        telefono: body.telefono,
        departamento: body.departamento
    })
    .then(contacto =>{
        res.status(200).json({
            ok:'true',
            mensaje: 'contacto creado'
        })
    })
    .catch(err =>{
        return res.status(400).json({
            ok: 'false',
            mensaje: 'Error al crear el contacto',
            errors: err
        })
    })
});

// ==========================================
//  Delete a contacto 
// ==========================================
app.delete('/:id', (req, res, next) => {

    var id = req.params.id;

    Contacto.destroy({
        where: {
            id_contacto: id
        }
    })
    .then(result =>{
        res.status(200).json({
            ok: 'true',
            mensaje: 'contacto eliminado',
            result: result
        })
    })
    .catch(err =>{
        res.status(400).json({
            ok: 'false',
            mensaje: 'Error al eliminar el contacto, verificar',
            error: err
        })
    })
});
module.exports = app;