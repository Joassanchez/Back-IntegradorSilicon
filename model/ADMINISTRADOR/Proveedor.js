const mysql = require('mysql');
const configuracion = require('config.json');

const connection = mysql.createConnection(configuracion.database);

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Base de datos de proveedor conectada");
    }
});

const proveedor_db = {};

proveedor_db.getAll = (funcallback) => {
    const consulta = 'SELECT * FROM PROVEEDOR';
    connection.query(consulta, (err, rows) => {
        if (err) {
            funcallback(err);
        } else {
            funcallback(null, rows);
        }
    });
};

proveedor_db.create = (proveedor, funcallback) => {
    const { telefono, nombre, especialidad } = proveedor;
    if (!telefono || !nombre || !especialidad) {
        return funcallback({ error: 'Faltan campos obligatorios' });
    }

    const query = 'INSERT INTO PROVEEDOR (telefono, nombre, especialidad) VALUES (?, ?, ?)';
    const datos_proveedor = [telefono, nombre, especialidad];

    connection.query(query, datos_proveedor, (err, result) => {
        if (err) {
            funcallback(err);
        } else {
            funcallback(null, {
                mensaje: "Proveedor creado con éxito",
                detalle: result
            });
        }
    });
};

proveedor_db.update = (datos_proveedor, id_proveedor, funcallback) => {
    const { telefono, nombre, especialidad } = datos_proveedor;

    if (!telefono || !nombre || !especialidad) {
        return funcallback({ error: 'Faltan campos obligatorios' });
    }

    const query = 'UPDATE PROVEEDOR SET telefono=?, nombre=?, especialidad=? WHERE Id_proveedor=?';
    const consulta = [telefono, nombre, especialidad, id_proveedor];

    connection.query(query, consulta, (err, result) => {
        if (err) {
            funcallback(err);
        } else {
            if (result.affectedRows === 0) {
                funcallback({
                    mensaje: "No existe un proveedor que coincida con el criterio de búsqueda",
                    detalle: result
                });
            } else {
                funcallback(null, {
                    mensaje: `Se actualizaron los datos del proveedor con ID ${id_proveedor}`,
                    detalle: result
                });
            }
        }
    });
};

proveedor_db.borrar = (id_proveedor, funcallback) => {
    const consulta = "DELETE FROM PROVEEDOR WHERE Id_proveedor = ?";
    connection.query(consulta, id_proveedor, (err, result) => {
        if (err) {
            funcallback(err);
        } else {
            if (result.affectedRows === 0) {
                funcallback({
                    mensaje: "No se encontró el proveedor, ingrese otro ID",
                    detalle: result
                });
            } else {
                funcallback(null, {
                    mensaje: "Proveedor eliminado con éxito",
                    detalle: result
                });
            }
        }
    });
};

module.exports = proveedor_db;
