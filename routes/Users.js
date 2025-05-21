const express = require('express');
const User = require('../models/users.js');


const router = express.Router();

/**
 * @desc Recuperar lista de usuarios.
 */
router.get('/users', async (req, res) => {
    try {
        const userList = await User.findAll({
            attributes: { exclude: ['passwordHash'] }
        });
        console.log('Lista de usuarios encontrada: ');
        res.status(200).json(userList);
    } catch (error) {
        res.status(500).json({message: 'Error interno del servidor'});
        console.log('Error al recuperar lista de usuarios: ', error.message);
    }
});

/**
 * @desc Recuperar un usuario mediante su id
 * @param {id}
 */
router.get('/users/:id', async (req, res) => {
    const {id} = require.params;
    try {
        const users = await User.findByPk(id);

        console.log('Se recuperó el usuario con éxito');
        res.status(200).json(users);
    } catch (error) {
        console.error('No se pudo recuperar el usuario: ', error.message);
        res.status(500).json({message: error.message});
    }
});

/**
 * @desc API para insertar un nuevo usuario.
 * @param {userName}
 * @param {email}
 * @param {password}
 */
router.post('/users', async (req, res) => {
    const { userName, email, password } = require.params;

    try {
        const newUser = await User.create({
            userName: userName,
            email: email,
            password: password
        });

        if (!newUser) {
            console.log('No se creó el usuario correctamente');
        } else {
            res.status(200).json('El usuario se creó correctamente');
        }

    } catch(error) {
        console.error('Fallo al crear el usuario: ', error.message);
        res.status(400).json({message: error.message});
    }
});

/**
 * @desc API para actualizar la información de un usuario.
 * @param {id} -Parámetro para encontrar el usuario a editar.
 */
router.put('/users/:id', async (req, res) => {

});

/**
 * @desc API para eliminar un usuario.
 * @param {id}
 */
router.delete('/users/:id', async (req, res) => {
    const { id } = require.params;

    try {

    } catch(error) {

    }
});

module.exports = router;