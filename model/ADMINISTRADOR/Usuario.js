require('rootpath')();
const mysql = require('mysql');
const configuracion = require('config.json'); 

var connection = mysql.createConnection(configuracion.database);

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Base de datos de usuario conectada");
    }
});

var usuario_db = {};

usuario_db.getAll = (funCallback) => {
    var consulta = 'SELECT U.nickname, U.password, U.email, U.id_usuario, R.nombreROL FROM Usuario U INNER JOIN ROL R on U.id_rol = R.id_rol';
    connection.query(consulta, (err, rows) => {
        if (err) {
            funCallback(err);
        } else {
            funCallback(undefined, rows); 
        }
    });
}//LISTAR

usuario_db.create = function (usuario, funcallback) {
    const { nickname, password, email, id_rol } = usuario; 
    if (!nickname || !password || !email || !id_rol) { 
        return funcallback({ error: 'Faltan campos obligatorios' }); 
    }

    const query = 'INSERT INTO Usuario (nickname, password, email, id_rol) VALUES (?, ?, ?, ?)';
    const datos_persona = [nickname, password, email, id_rol]; 

    connection.query(query, datos_persona, function (err, result) {
        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                funcallback({
                    mensajito: "El usuario ya fue registrado",
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
                mensajito: "Se creó el usuario " + usuario.nickname,
                detalle: result
            });
        }
    });
};//CREATE

usuario_db.update = function (datos_usuario, id_usuario, funcallback) {
    const { nickname, password, email } = datos_usuario;

    if (!nickname || !password || !email) {
        return funcallback({ error: 'Faltan campos obligatorios' });
    }

    const query = 'UPDATE Usuario SET nickname=?, password=?, email=? WHERE id_usuario=?';
    const consulta = [nickname, password, email, id_usuario]; 
    connection.query(query, consulta, (err, result) => {
        if (err) {
            if (err.code === "ER_TRUNCATED_WRONG_VALUE") { 
                funcallback({
                    message: `El id de usuario es incorrecto`,
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
                    message: "No existe el usuario que coincida con el criterio de búsqueda",
                    detail: result
                });
            } else {
                funcallback(null, {
                    message: `Se actualizaron los datos del Usuario con ID ${id_usuario}`, 
                    detail: result
                });
            }
        }
    });
};//UPDATE

usuario_db.borrar = function (id_usuario, retorno) {
    consulta = "DELETE FROM USUARIO WHERE id_usuario = ?";
    connection.query(consulta, id_usuario, (err, result) => {
        if (err) {
            retorno({ menssage: err.code, detail: err }, undefined);

        } else {

            if (result.affectedRows == 0) {
                retorno(undefined, { message: "no se encontro el usaurio, ingrese otro id", detail: result });
            } else {
                retorno(undefined, { message: "usuario eliminado", detail: result });
            }
        }
    });
};//DELETE

module.exports = usuario_db;
