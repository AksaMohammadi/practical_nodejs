const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        file: { type: DataTypes.BLOB('long'), allowNull: false, required:true },
        file_name: { type: DataTypes.STRING, allowNull: false, required:true },
        file_size: { type: DataTypes.STRING, allowNull: false, required:true },
        file_type: { type: DataTypes.STRING, allowNull: false, required:true }
    };


    return sequelize.define('File', attributes);
}