const { Router } = require("express");

const UserController = require("../controllers/user.controller");

const userController = new UserController();
const userRoute = Router();


userRoute.get("/backend-bothealth/users", async (req,res) => {
    return userController.listAll(req,res);
}); 



module.exports = {
    userRoute
}