const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const proveedorDb = require('../../model/ADMINISTRADOR/Proveedor');

app.get('/', getAll);
app.post('/', createProveedor);
app.put('/:id_proveedor', updateProveedor);
app.delete('/:id_proveedor', deleteProveedor);

function getAll(req, res) {
    proveedorDb.getAll((err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });
}

function createProveedor(req, res) {
    const proveedor = req.body;
    proveedorDb.create(proveedor, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

function updateProveedor(req, res) {
    const datos_proveedor = req.body;
    const id_proveedor = req.params.id_proveedor;
    proveedorDb.update(datos_proveedor, id_proveedor, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

function deleteProveedor(req, res) {
    const id_proveedor = req.params.id_proveedor;
    proveedorDb.borrar(id_proveedor, (err, result_model) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (result_model.detalle.affectedRows === 0) {
                res.status(404).send(result_model.mensaje);
            } else {
                res.send(result_model.mensaje);
            }
        }
    });
}

module.exports = app;
