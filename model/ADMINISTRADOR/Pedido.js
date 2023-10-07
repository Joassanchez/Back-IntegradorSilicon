const mysql = require('mysql');
const configuracion = require('config.json');

var connection = mysql.createConnection(configuracion.database);

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Base de datos de PEDIDO conectada");
    }
});

var Pedido_db = {};

Pedido_db.getAll = (funCallback) => {
    var consulta = 'SELECT * FROM PEDIDO';
    connection.query(consulta, (err, rows) => {
        if (err) {
            funCallback(err);
        } else {
            funCallback(undefined, rows);
        }
    });
}


Pedido_db.create = function (pedido, funcallback) {
    const { estado, fecha, id_usuario, Id_producto } = pedido;
    if (!estado || !fecha || !id_usuario || !Id_producto) {
        return funcallback({ error: 'Faltan campos obligatorios' });
    }

    const query = 'INSERT INTO PEDIDO (estado, fecha, id_usuario, Id_producto) VALUES (?, ?, ?, ?)';
    const datos_pedido = [estado, fecha, id_usuario, Id_producto];

    connection.query(query, datos_pedido, function (err, result) {
        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                funcallback({
                    mensajito: "Pedido registrado",
                    detalle: err
                });
            } else {
                funcallback({
                    mensajito: "Error diferente",
                    detalle: err
                });
            }
        } else {
            funcallback(null, {
                mensajito: "Se creó un pedido",
                detalle: result
            });
        }
    });
}

Pedido_db.update = function (datos_pedido, nro_pedido, funcallback) {
    const { estado, fecha, id_usuario, Id_producto } = datos_pedido;

    if (!estado || !fecha || !id_usuario || !Id_producto) {
        return funcallback({ error: 'Faltan campos obligatorios' });
    }

    const query = 'UPDATE PEDIDO SET estado=?, fecha=?, id_usuario=?, Id_producto=? WHERE nro_pedido=?';
    const consulta = [estado, fecha, id_usuario, Id_producto, nro_pedido];

    connection.query(query, consulta, (err, result) => {
        if (err) {
            if (err.code === "ER_TRUNCATED_WRONG_VALUE") {
                funcallback({
                    message: `El número de pedido es incorrecto`,
                    detail: err
                });
            } else {
                funcallback({
                    message: `Error desconocido`,
                    detail: err
                });
            }
        } else {
            if (result.affectedRows === 0) {
                funcallback({
                    message: "No existe pedido que coincida con el número de pedido proporcionado",
                    detail: result
                });
            } else {
                funcallback(null, {
                    message: `Se actualizaron los datos del pedido con número ${nro_pedido}`,
                    detail: result
                });
            }
        }
    });
}


Pedido_db.delete = function (nro_pedido, retorno) {
    const consulta = "DELETE FROM PEDIDO WHERE nro_pedido = ?";
    connection.query(consulta, nro_pedido, (err, result) => {
        if (err) {
            retorno({ menssage: err.code, detail: err }, undefined);
        } else {
            if (result.affectedRows == 0) {
                retorno(undefined, { message: "No se encontró el pedido, ingrese otro número de pedido", detail: result });
            } else {
                retorno(undefined, { message: "Pedido eliminado", detail: result });
            }
        }
    });
}

module.exports = Pedido_db;
