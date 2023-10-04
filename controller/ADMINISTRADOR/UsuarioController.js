require('rootpath')();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var usuarioDb = require('model/ADMINISTRADOR/Usuario.js');

const securityController = require("controller/SecurityController.js");

app.get('/',getAll);
app.post('/',securityController.verificarToken, createUser);
app.put('/:id_usuario',securityController.verificarToken, updateUser);
app.delete('/:id_usuario',securityController.verificarToken, deleteUser);


function getAll(req, res) {
    usuarioDb.getAll((err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });
}

function createUser(req, res) {
    let usuario = req.body;
    usuarioDb.create(usuario, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

function updateUser(req, res) {
    let datos_usuario = req.body;
    let id_usuario = req.params.id_usuario; 
    usuarioDb.update(datos_usuario, id_usuario, (err, resultado) => { 
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

function deleteUser(req, res) {
    usuarioDb.borrar(req.params.id_usuario, (err, result_model) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (result_model.detail.affectedRows == 0) {
                res.status(404).send(result_model.message);
            } else {
                res.send(result_model.message);
            }
        }
    });
}

module.exports = app;
