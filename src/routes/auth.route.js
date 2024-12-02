
const { Router } = require("express");
const authRoute = Router();
const AuthController = require("../controllers/auth.controller");
const authController = new AuthController();

authRoute.post('/backend-bothealth/users/auth', async (req,res) => {
    return await authController.login(req,res);
});


module.exports = {
    authRoute
}

