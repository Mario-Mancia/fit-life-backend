const sequelize = require('../config/database.js');
const { DataTypes } = require('sequelize');
const User = require('./users.js');

const UserRecord = sequelize.define('UserRecord', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            key: 'id',
            model: 'users'
        }
    },
    height: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false,
        validate: {
            min: 0,
            max: 3
        },
    },
    weight: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
            min: 0,
            max: 500
        },
    },
    totalCalories: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'userRecords'
}
);

User.hasMany(UserRecord, { foreignKey: 'userId', onDelete: 'CASCADE' });
UserRecord.belongsTo(User, { foreignKey: 'userId' });

module.exports = UserRecord;