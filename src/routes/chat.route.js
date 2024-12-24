const {Router} = require("express");
const { ChatController } = require("../controllers/chat.controller");
const chatController = new ChatController();

const chatRoute = Router();

chatRoute.post("/backend-bothealth/chat/startSession", async (req,res) => {
    return await chatController.verifyStartSession(req,res);
});

module.exports = {
    chatRoute
}