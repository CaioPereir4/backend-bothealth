const { ChatService } = require("../services/chat.service");
const chatService = new ChatService();


class ChatController {
    async verifyStartSession(req,res){
        const response = await  chatService.startSession(req.body);
        return res.status(response.httpCode).json(response)
    };

    async message(req,res){
        const response = await chatService.sendMessage(req.body);
        return res.status(response.httpCode).json(response)
    };

    async verifyFinishSession(req,res){
        const response = await chatService.finishSession(req.body);
        return res.status(response.httpCode).json(response);
    };
}

module.exports = {
    ChatController
}