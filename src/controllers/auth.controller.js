const AuthService = require("../services/auth.service");
const authService = new AuthService();

class  AuthController {

    async login(req,res){
        try {
            const {body} = req;
            if(!body.secretKey){
                return res.status(400).json({httpCode: 400, sucess: false, message: "Request faltando parametro: secretKey"});
            };  
                    
            let response = await authService.verifySecretKey(body.secretKey);
            if(!response.authorized){
                return res.status(404).json({httpCode: 404, sucess: false, result:response, message: "SecretKey não encontrada"});
            };

            return res.status(200).json({httpCode: 200, sucess: true, result: response, message: "SecretKey encontrada com sucesso" });
        } catch (error){
            console.info(`AUTHCONTROLLER LOGIN ERROR: ${error.message}`);
            return res.status(500).json({httpCode: 500, sucess: false, result:[], message: "Erro interno do servidor"});
        }
    };

};

module.exports = AuthController