const Sequelize = require("sequelize");
const sequelize = new Sequelize("bothealth", "postgres", "caio_testes", {
    dialect: "postgres"
});

module.exports = sequelize;

