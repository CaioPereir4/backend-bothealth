const {Router} = require("express");
const { ChatController } = require("../controllers/chat.controller");
const chatController = new ChatController();

const chatRoute = Router();

chatRoute.post("/backend-bothealth/chat/startSession", async (req,res) => {
    return await chatController.verifyStartSession(req,res);
});

chatRoute.post("/backend-bothealth/chat/message", async (req,res) => {
    return await chatController.message(req,res)
});

chatRoute.post("/backend-bothealth/chat/finishSession", async (req,res) => {
    return await chatController.verifyFinishSession(req,res)
});

module.exports = {
    chatRoute
}