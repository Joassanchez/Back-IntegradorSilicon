require('rootpath')();
const mysql = require('mysql');
const configuracion = require('config.json'); 

var connection = mysql.createConnection(configuracion.database);

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Base de datos de VENTA conectada");
    }
});

var Venta_db = {};

Venta_db.getAll = (funCallback) => {

    var consulta = 'SELECT V.nro_venta, V.fecha, V.hora, M.NombrePago AS "Metodo de Pago",SUM(DV.CantVenta * P.precio_venta) AS Monto_Total, U.nickname AS "EMPLEADO" FROM VENTA V INNER JOIN Metodo_Pago M ON V.id_metodo = M.id_metodo INNER JOIN usuario U ON V.id_usuario = U.id_usuario INNER JOIN detalle_venta DV ON V.nro_venta = DV.nro_venta INNER JOIN producto P ON DV.Id_producto = P.Id_producto GROUP BY V.nro_venta, V.fecha, V.hora, M.NombrePago, U.nickname ORDER BY V.nro_venta ASC;';
    connection.query(consulta, (err, rows) => {
        if (err) {
            funCallback(err);
        } else {
            funCallback(undefined, rows); 
        }
    });
}//LISTAR

Venta_db.create = function (venta, funcallback) {

    const {id_metodo, id_usuario } = venta; 
    if (!id_metodo || !id_usuario) { 
        return funcallback({ error: 'Faltan campos obligatorios' }); 
    }

    const query = 'INSERT INTO VENTA (fecha, hora, id_metodo, id_usuario) VALUES (CURDATE(), DATE_FORMAT(NOW(), "%H:%i:%S"), ?,?);';
    const datos_persona = [ id_metodo, id_usuario]; 

    connection.query(query, datos_persona, function (err, result) {
        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                funcallback({
                    mensajito: "VENTA registrada",
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
                mensajito: "Se creó una venta",
                detalle: result
            });
        }
    });
};//CREATE

Venta_db.update = function (datos_venta, nro_venta, funcallback) {
    const { fecha, hora, id_metodo } = datos_venta;

    if (!fecha || !hora || !id_metodo) {
        return funcallback({ error: 'Faltan campos obligatorios' });
    }

    const query = 'UPDATE VENTA SET fecha=?, hora=?, id_metodo=? WHERE nro_venta=?';
    const consulta = [fecha, hora, id_metodo, nro_venta]; 

    connection.query(query, consulta, (err, result) => {
        if (err) {
            if (err.code === "ER_TRUNCATED_WRONG_VALUE") { 
                funcallback({
                    message: `El id de VENTA es incorrecto`,
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
                    message: "No existe VENTA que coincida con el criterio de búsqueda",
                    detail: result
                });
            } else {
                funcallback(null, {
                    message: `Se actualizaron los datos de VENTA con ID ${nro_venta}`, 
                    detail: result
                });
            }
        }
    });
};//UPDATE

Venta_db.borrar = function (nro_venta, retorno) {
    consulta = "DELETE FROM VENTA WHERE nro_venta = ?";
    connection.query(consulta, nro_venta, (err, result) => {
        if (err) {
            retorno({ menssage: err.code, detail: err }, undefined);

        } else {

            if (result.affectedRows == 0) {
                retorno(undefined, { message: "no se encontro la VENTA, ingrese otro id", detail: result });
            } else {
                retorno(undefined, { message: "VENTA eliminada", detail: result });
            }
        }
    });
};//DELETE


module.exports = Venta_db;