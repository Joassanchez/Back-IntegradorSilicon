const mysql = require('mysql');
const configuracion = require('./config.json'); // Asegúrate de tener la ruta correcta

var connection = mysql.createConnection(configuracion.database);

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Base de datos de DETALLE_PEDIDO conectada");
    }
});

var DetallePedido_db = {};

// Función para obtener todos los detalles de pedido
DetallePedido_db.getAll = (funcallback) => {
    var consulta = 'SELECT * FROM DETALLE_PEDIDO';
    connection.query(consulta, (err, rows) => {
        if (err) {
            funcallback(err);
        } else {
            funcallback(null, rows);
        }
    });
}

// Función para crear un nuevo detalle de pedido
DetallePedido_db.create = function (detallePedido, funcallback) {
    const { CantPedido, nro_pedido, Id_producto, Id_proveedor } = detallePedido;
    if (!CantPedido || !nro_pedido || !Id_producto || !Id_proveedor) {
        return funcallback({ error: 'Faltan campos obligatorios' });
    }

    const query = 'INSERT INTO DETALLE_PEDIDO (CantPedido, nro_pedido, Id_producto, Id_proveedor) VALUES (?, ?, ?, ?)';
    const datosDetallePedido = [CantPedido, nro_pedido, Id_producto, Id_proveedor];

    connection.query(query, datosDetallePedido, function (err, result) {
        if (err) {
            funcallback({
                mensaje: "Error al crear el detalle de pedido",
                detalle: err
            });
        } else {
            funcallback(null, {
                mensaje: "Detalle de pedido creado correctamente",
                detalle: result
            });
        }
    });
}

// Función para actualizar un detalle de pedido existente
DetallePedido_db.update = function ( Id_DetallePedido, nuevoDetallePedido, funcallback) {
    const { CantPedido, nro_pedido, Id_producto, Id_proveedor } = nuevoDetallePedido;
    if (!CantPedido || !nro_pedido || !Id_producto || !Id_proveedor) {
        return funcallback({ error: 'Faltan campos obligatorios' });
    }

    const query = 'UPDATE DETALLE_PEDIDO SET CantPedido = ?, nro_pedido = ?, Id_producto = ?, Id_proveedor = ? WHERE Id_DetallePedido = ?';
    const datosDetallePedido = [CantPedido, nro_pedido, Id_producto, Id_proveedor,  Id_DetallePedido];

    connection.query(query, datosDetallePedido, function (err, result) {
        if (err) {
            funcallback({
                mensaje: "Error al actualizar el detalle de pedido",
                detalle: err
            });
        } else {
            funcallback(null, {
                mensaje: "Detalle de pedido actualizado correctamente",
                detalle: result
            });
        }
    });
}


DetallePedido_db.delete = function (Id_DetallePedido, retorno) {
    consulta = "DELETE FROM DETALLE_PEDIDO WHERE Id_DetallePedido = ?";
    connection.query(consulta, Id_DetallePedido, (err, result) => {
        if (err) {
            retorno({ menssage: err.code, detail: err }, undefined);
        } else {
            if (result.affectedRows == 0) {
                retorno(undefined, { message: "No se encontró el detalle de pedido, ingrese otro ID", detail: result });
            } else {
                retorno(undefined, { message: "Detalle de pedido eliminado", detail: result });
            }
        }
    });
};


module.exports = DetallePedido_db;
