const  UserService  = require("./user.service");
const userService = new UserService();
const axios = require("axios");

const BACKEND_OPEN_AI_ROUTE = process.env.BACKEND_OPEN_AI;

class ChatService {    
    async startSession(requestBody){
        const {userId} = requestBody;
        if(!userId){
            return { httpCode: 400, message: "Campo userId não recebido no corpo da requisicao", result : []}
        };

        const userData = await userService.findByParamater("id", userId);

        if(!userData){
            return { httpCode: 404, message: "Usário não encontrado para iniciar sessão", result : []}
        };

        if(!userData.thread_id && !userData.messages){
            console.info(`Iniciando sessão para usuário ${userId}`)
            const threadId = await this.generateThreadId();
            console.info(`thread_id gerada: ${threadId}`)
            const messages = {
                "messages": []
            };

            await userService.update(userId, {
                thread_id: threadId,
                messages:  messages
            });

            return { httpCode: 200, message: "Sessão iniciada com sucesso", result: messages};
        };

        return { httpCode: 200, message: "Já havia uma sessão iniciada", result: userData.messages };
    };

    async generateThreadId(){
        const url = `${BACKEND_OPEN_AI_ROUTE}/thread`;
        const response = await axios.get(url);
        return response.data["thread_id"];
    };
}

module.exports = {
    ChatService
}