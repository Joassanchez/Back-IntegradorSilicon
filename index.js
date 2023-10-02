require('rootpath')();
const express = require('express');
const morgan = require('morgan');
const app = express();
const configuracion = require('config.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms');


const controladorUsuario = require('./controller/ADMINISTRADOR/UsuarioController.js');
const controladorProveedor = require('./controller/ADMINISTRADOR/ProveedorController.js'); 
const controladorVenta = require('./controller/EMPLEADO/VentaController.js');

app.use('/api/usuario', controladorUsuario);
app.use('/api/proveedor', controladorProveedor); 
app.use('/api/venta', controladorVenta );


app.listen(configuracion.server.port, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Servidor escuchando en el puerto " + configuracion.server.port);
    }
});

