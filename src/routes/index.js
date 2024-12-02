
const express = require("express");
const { authRoute } = require("./auth.route");
const { userRoute } = require("./user.route");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/backend-bothealth", (req,res) => {
    res.status(200).json({httpCode: 200, sucess: true, message: "Requisicao com sucesso"});
});

app.use(authRoute);
app.use(userRoute);

module.exports = {
    app
}