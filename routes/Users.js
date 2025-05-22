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
        res.status(200).json(userList);
    } catch (error) {
        console.error('Error al recuperar lista de usuarios:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

/**
 * @desc Recuperar un usuario mediante su email
 * @param {email}
 */
router.get('/users/email/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({
            where: { email },
            attributes: { exclude: ['passwordHash'] }
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('No se pudo recuperar el usuario:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

/**
 * @desc API para insertar un nuevo usuario.
 * @param {userName, email, password}
 */
router.post('/users', async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'El correo ya está registrado' });
        }
        const newUser = await User.create({
            userName,
            email,
            passwordHash: password
        });

        res.status(201).json({ message: 'Usuario creado correctamente', userId: newUser.id });
    } catch (error) {
        console.error('Fallo al crear el usuario:', error.message);
        res.status(400).json({ message: error.message });
    }
});

/**
 * @desc API para actualizar la información de un usuario.
 * @param {id}
 */
router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { userName, email, password } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        user.userName = userName || user.userName;
        user.email = email || user.email;
        user.passwordHash = password || user.passwordHash
        await user.save();

        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

/**
 * @desc API para eliminar un usuario.
 * @param {id}
 */
router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCount = await User.destroy({ where: { id } });

        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;