const { json } = require('body-parser');
var express = require('express');
var app = express();
var Empresa = require('../models/empresa');
var auth = require('../middlewares/autenticacion')
var db = require('../config/database');
const { request } = require('./contactos');


// ==========================================
//  Obtener nombres, ids ...,  de todas las empresas
// ==========================================

app.get('/listaEmpresas', (req, res) => {

    Empresa.findAll({
        attributes: ['id_empresa', 'nombre']
    }).then(empresas => {
        if (empresas) {
            res.status(200).json({
                ok: true,
                empresas: empresas
            })
        } else {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al recuperar empresas'
            })
        }
    })
});




// ==========================================
//  Return all enterprises from database
// ==========================================
app.get('/paginacionEmpresas/:inicio', auth.verificaToken, (req, res) => {
    var inicio= req.params.inicio;

    db.query('sp_paginacionEmpresas'+' '+inicio).then(empresas => {
        if (empresas) {
            res.status(200).json({
                empresas: empresas[0]
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


// ==========================================
// Return all enterprises whith clause where id
// ==========================================

app.get('/paginacionMisEmpresas/:miId/:desde', auth.verificaToken, (req, res) => {

    var miId = req.params.miId;
    var desde = req.params.desde;

    db.query('sp_paginacionMisEmpresas'+' '+miId+', '+desde).then(misEmpresas => {
        if (misEmpresas) {
            res.status(200).json({
                mensaje : 'mis empresas solamente',
                misEmpresas: misEmpresas[0]
            })
        }

        else {
            return res.status(500).json({
                ok: 'false',
                mensaje: "Error al recuperar mis empresas"
            })
        }
    })
});



// ==========================================
//  Contar numero de empresas
// ==========================================

app.get('/contadorEmpresas', auth.verificaToken, (req, res) => {

    
    db.query('sp_contadorEmpresas').then(contador => {
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



// ==========================================
//  Contar numero de mis empresas
// ==========================================

app.get('/contadorMisEmpresas/:miId', auth.verificaToken, (req, res) => {

    var miId = req.params.miId;

    db.query('sp_contadorMisEmpresas'+' '+miId).then(contador => {
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



// ==========================================
// Return a single enterprise with his id
// ==========================================
app.get('/:id', auth.verificaToken, (req, res) => {

   var id = req.params.id;
   Empresa.findOne({
       where: {
           id_empresa: id
       }
   })
       .then(unaEmpresa => {
           if (unaEmpresa) {
               res.status(200).json({
                   ok: 'true',
                   unaEmpresa: unaEmpresa
               });
           }
           else {
               return res.status(400).json({
                   ok: 'false',
                   mensaje: 'No exite ese empresa'
               });
           }
       })
       .catch(err => {
           return re.status(500).json({
               ok: 'false',
               mensaje: 'Error al buscar el empresa',
               error: err            });
       })
});

// ==========================================
//  Create a new company
// ==========================================
app.post('/', auth.verificaToken, (req, res) => {
    console.log('backend');
    var body = req.body;
    console.log(body);

    Empresa.create({
        nombre: body.nombre,
        industria: body.industria,
        ciudad: body.ciudad,
        ingresos_anuales: body.ingresos_anuales,
        tipo_cliente: body.tipo_cliente,
        no_empleados: body.no_empleados,
        descripcion: body.descripcion,
        no_telefono: body.no_telefono,
        zona_horaria: body.zona_horaria,
        pagina_corporativa: body.pagina_corporativa,
        propietario_registro: body.propietario_registro,
        estado_region: body.estado_region,
        codigo_postal: body.codigo_postal,
    })
        .then(empresa => {
            res.status(200).json({
                empresa: empresa,
                ok: 'true',
                mensaje: 'Empresa creada'
            })
        })
        .catch(err => {
            return res.status(400).json({
                ok: 'false',
                mensaje: 'Error al agregar empresa',
                errors: err
            })
        })
});

// ==========================================
//  Delete an enterprise
// ==========================================
app.delete('/:id', auth.verificaToken, (req, res, next) => {

    var id = req.params.id;

    Empresa.destroy({
        where: {
            id_empresa: id
        }
    })
        .then(result => {
            res.status(200).json({
                ok: 'true',
                mensaje: 'Empresa eliminada',
                result: result
            })
        })
        .catch(err => {
            res.status(400).json({
                ok: 'false',
                mensaje: 'Error al eliminar el empresa, verificar',
                error: err
            })
        })
});


// ==========================================
//  Update only one enterprise
// ==========================================

app.put('/:id', auth.verificaToken, (req, res, next) => {
    var id = req.params.id;
    var body = req.body;

    Empresa.update({
        nombre: body.nombre,
        industria: body.industria,
        ciudad: body.ciudad,
        ingresos_anuales: body.ingresos_anuales,
        tipo_cliente: body.tipo_cliente,
        no_empleados: body.no_empleados,
        descripcion: body.descripcion,
        no_telefono: body.no_telefono,
        zona_horaria: body.zona_horaria,
        pagina_corporativa: body.pagina_corporativa,
        propietario_registro: body.propietario_registro,
        estado_region: body.estado_region,
        codigo_postal: body.codigo_postal,
    }, {
        where: {
            id_empresa: id
        }
    }).then(result => {
        res.status(200).json({
            ok: 'true',
            mensaje: 'Empresa actualizada',
            result: result
        })
    })
        .catch(err => {
            res.status(400).json({
                ok: 'false',
                mensaje: 'Error al actualizar empresa',
                error: err
            })
        })
});
module.exports = app;