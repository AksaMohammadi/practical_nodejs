const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        first_name: { type: DataTypes.STRING, allowNull: false, required:true },
        last_name: { type: DataTypes.STRING, allowNull: false, required:true },
        email: { type: DataTypes.STRING, allowNull: false, unique:true, required:true, },
        contact_no: { type: DataTypes.BIGINT, allowNull: false, required:true},
        address: { type: DataTypes.STRING, allowNull: false, required:true },
    };

    const options = {
        // defaultScope: {
        //     // exclude password hash by default
        //     attributes: { exclude: ['passwordHash'] }
        // },
        // scopes: {
        //     // include hash with this scope
        //     withHash: { attributes: {}, }
        // }
    };

    return sequelize.define('User', attributes, options);
}