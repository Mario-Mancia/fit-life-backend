const express = require('express');
const router = express.Router();
const UserRecord = require('../models/userRecords');

/**
 * @desc Recuperar lista de registros de usuarios.
 */
router.get('/records', async (req, res) => {
    try {
        const records = await UserRecord.findAll();
        res.status(200).json(records);
    } catch (error) {
        console.error('Error al recuperar registros:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

/**
 * @desc Recuperar un registro por ID.
 * @param {id}
 */
router.get('/records/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const record = await UserRecord.findByPk(id);

        if (!record) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }

        res.status(200).json(record);
    } catch (error) {
        console.error('No se pudo recuperar el registro:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

/**
 * @desc Crear un nuevo registro de usuario.
 * @param {userId, height, weight, totalCalories}
 */
router.post('/records', async (req, res) => {
    const { userId, height, weight, totalCalories } = req.body;

    try {
        const newRecord = await UserRecord.create({
            userId,
            height,
            weight,
            totalCalories: totalCalories || 0
        });

        res.status(201).json({ message: 'Registro creado correctamente', recordId: newRecord.id });
    } catch (error) {
        console.error('Fallo al crear el registro:', error.message);
        res.status(400).json({ message: error.message });
    }
});

/**
 * @desc Actualizar un registro de usuario.
 * @param {id}
 */
router.put('/records/:id', async (req, res) => {
    const { id } = req.params;
    const { height, weight, totalCalories } = req.body;

    try {
        const record = await UserRecord.findByPk(id);
        if (!record) return res.status(404).json({ message: 'Registro no encontrado' });

        record.height = height || record.height;
        record.weight = weight || record.weight;
        record.totalCalories = totalCalories || record.totalCalories;

        await record.save();

        res.status(200).json({ message: 'Registro actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el registro:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

/**
 * @desc Eliminar un registro.
 * @param {id}
 */
router.delete('/records/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCount = await UserRecord.destroy({ where: { id } });

        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }

        res.status(200).json({ message: 'Registro eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el registro:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;