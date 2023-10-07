const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Pedido_db = require('model/ADMINISTRADOR/Pedido.js');

app.get('/', getAllPedidos);
app.post('/', createPedido);
app.put('/:nro_pedido', updatePedido);
app.delete('/:nro_pedido', deletePedido);

function getAllPedidos(req, res) {
    Pedido_db.getAll((err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });
}

function createPedido(req, res) {
    let pedido = req.body;
    Pedido_db.create(pedido, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

function updatePedido(req, res) {
    let datos_pedido = req.body;
    let nro_pedido = req.params.nro_pedido;
    Pedido_db.update(datos_pedido, nro_pedido, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

function deletePedido(req, res) {
    Pedido_db.borrar(req.params.nro_pedido, (err, result_model) => {
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
