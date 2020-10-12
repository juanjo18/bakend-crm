// Required import librarys
var express = require('express');
var app = express();

// Request, Response, Next (Middleware)

// Rutas
app.get('/', (req, res, next) => {

    res.status(200).json({
        mensaje:'Peticion realizada',
        ok : true
    });
});


module.exports = app;