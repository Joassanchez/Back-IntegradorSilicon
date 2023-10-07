const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DetallePedido_db = require('model/ADMINISTRADOR/DetallePedido.js'); 

app.get('/', getAllDetallePedidos);
app.post('/', createDetallePedido);
app.put('/:id_detalle_pedido', updateDetallePedido);
app.delete('/:id_detalle_pedido', deleteDetallePedido);

function getAllDetallePedidos(req, res) {
    DetallePedido_db.getAll((err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });
}

function createDetallePedido(req, res) {
    let detallePedido = req.body;
    DetallePedido_db.create(detallePedido, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

function updateDetallePedido(req, res) {
    let datosDetallePedido = req.body;
    let idDetallePedido = req.params.id_detalle_pedido;
    DetallePedido_db.update(datosDetallePedido, idDetallePedido, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

function deleteDetallePedido(req, res) {
    DetallePedido_db.borrar(req.params.id_detalle_pedido, (err, result_model) => {
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
