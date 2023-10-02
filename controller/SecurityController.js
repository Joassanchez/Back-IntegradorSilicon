require('rootpath')();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var usuarioDb = require('../model/ADMINISTRADOR/Usuario.js');


app.post('/login', login);


function login(req, res) {
    const { nickname, password } = req.body; //ES6

    usuarioDb.findByNickname(nickname, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {

            // hasta aca sabemos que el usuario con ese "nickname" existe en la DB,
            // ahora debemos verificar si su clave es correcta, para ello debemos desencriptarla

            //const iguales = bcrypt.compareSync("texto plano", "texto encriptado");

            const iguales = bcrypt.compareSync(password, result.detail.password);
            if (iguales) {
                let user = {
                    nickname: result.detail.nickname,
                    mail: result.detail.email
                    
                }
                //JSON WEB TOKEN
                // devolvemos un json en forma de token (que basicamente es un string cifrado)

                jwt.sign(user, 'siliconSectret', { expiresIn: '600s' }, (err, token) => {
                    if (err) {
                        res.status(500).send({
                            message: err
                        });
                    } else {
                        res.json({
                            datos: user,
                            token: token
                        });
                    }
                })
            } else {
                res.status(403).send({
                    message: 'Contraseña Incorrecta'
                });
            }
        }
    });
}


function verificarToken(req, res, next) {
    if (req.headers["authorization"]) {
        try {
            const token = req.headers["authorization"]
            const verified = jwt.verify(token, "siliconSectret");
            if (verified) {
                next();
            } else {
                res.status(403).send({
                    message: "Token invalido, permiso denegado"
                });

            }

        } catch (error) {
            res.status(403).send({
                message: "Acceso Denegado"
            });
        }

    } else {
        res.status(403).send({
            message: "No posee token de autorizacion"
        });
    }
}

module.exports = {app, verificarToken};