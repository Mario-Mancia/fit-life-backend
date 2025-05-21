-- Base de datos desarrollada para aplicación FITLIFE.
-- DESARROLLO DE APLICACIONES MÓVILES 1.
-- Jacquelinne Hernández, Mario Mancía.
UNLOCK TABLES;
DROP DATABASE IF EXISTS `fit_life_db`;
CREATE DATABASE `fit_life_db`;
USE `fit_life_db`;

-- Tabla de usuarios
CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`)
);

-- Tabla de registros por usuario
CREATE TABLE `userRecords` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `userId` INT NOT NULL,
    `height` DECIMAL(3,2) NOT NULL CHECK (`height` > 0 AND `height` < 3.00),
    `weight` DECIMAL(5,2) NOT NULL CHECK (`weight` > 0 AND `weight` < 500),
    `totalCalories` INT DEFAULT 0,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `userId` (`userId`),
    CONSTRAINT `userRecords_fk_1` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Insert de prueba (contraseña sin hash, solo para testeo)
INSERT INTO `users` (`userName`, `email`, `passwordHash`)
VALUES ('Admin', 'admin2025@gmail.com', 'admin123');