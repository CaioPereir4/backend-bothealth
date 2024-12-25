const  UserService  = require("./user.service");
const userService = new UserService();
const axios = require("axios");
const { gererateMessageToDisplay, generateMessageToDisplay } = require("../shared/chatUtils.js")
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

    async sendMessage(requestBody){
        try {
            const { userId, message} = requestBody;
            if(!userId || !message){
                return { httpCode: 400, message: "Requisicao enviada sem os campos [userid, message] esperado", result: []};
            };

            const userData = await userService.findByParamater('id', userId);

            if(!userData){
                return { httpCode: 404, message: "Usuário não encontrado para enviar mensagem", result: [] }
            };

            const threadId = userData.thread_id;
            let allMessages = userData.messages;

            allMessages.messages.push(generateMessageToDisplay(false, message));

            const body = {
                message,
                thread_id: threadId
            };
            const url = `${BACKEND_OPEN_AI_ROUTE}/chat`;
            const requestResponse = await axios.post(
                url,
                body
            );

            const messageResponse = requestResponse.data["message"];
            
            allMessages.messages.push(generateMessageToDisplay(true, messageResponse));

            await userService.update(userId, { messages: allMessages });

            return { httpCode: 200, message: "Troca de mensagens efetuada com sucesso", result: allMessages}
        } catch (error){

            console.info(`[sendMessage][ERROR]: ${error}`);
            return { httpCode: 500, message: "Erro interno do servidor", result: [] };
        }
    };
}

module.exports = {
    ChatService
}