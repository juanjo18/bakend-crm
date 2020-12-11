// const express = require("express");
// const router = express.Router();
// const controller = require("../controller/file.controller");
// const app = require("./app");

var express = require('express');
var app = express();
const fs = require('fs');

var fileUpload = require('express-fileupload');

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
  }));

baseUrl = "http://192.168.49.14:3000/bakend-crm/filesUploaded/files";
const uploadFile = require("../middlewares/upload");

app.get('/', (req, res) => {

    const directoryPath = __basedir + "\\filesUploaded\\files";

    console.log(directoryPath);

    fs.readdir(directoryPath, function (err, files) {

        console.log(files);

        if (err) {
            res.status(500).json({
                ok: 'false',
                message: "Unable to scan files!",
            });
        }

        let fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            });
        });

        console.log(fileInfos);
        res.status(200).json({
            ok: true,
            fileInfos
        });
    });
});


app.post('/', (req, res) =>{

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let sampleFile = req.files.sampleFile;
datos = []
datos.push(sampleFile)
    var path = `./uploads/${sampleFile.name}`
    sampleFile.mv(path, err => {
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }
        else{
            res.send('File uploaded!');
        }
        
    })
})

module.exports = app;



