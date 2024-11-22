
const express = require("express");
const app = express();

app.get("/backend-bothealth", (req,res) => {
    res.status(200).json({httpCode: 200, sucess: true, message: "Request with sucess"});
});

module.exports = {
    app
}