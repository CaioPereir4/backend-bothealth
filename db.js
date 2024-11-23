const Sequelize = require("sequelize");
const sequelize = new Sequelize("testes", "postgres", "caio_testes", {
    dialect: "postgres"
});

module.exports = sequelize;

