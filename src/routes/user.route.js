const { Router } = require("express");

const UserController = require("../controllers/user.controller");

const userController = new UserController();
const userRoute = Router();


userRoute.get("/backend-bothealth/users", async (req,res) => {
    return await userController.listAll(req,res);
}); 

userRoute.post("/backend-bothealth/users/login", async (req,res) => {
    return await userController.getBySecretKey(req,res);
}); 

userRoute.post("/backend-bothealth/users", async (req,res) => {
    return await userController.insert(req,res)
})

module.exports = {
    userRoute
}