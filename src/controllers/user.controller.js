
const UserService = require("../services/user.service");
const userService = new UserService();
const { verifyUserRequestData } = require("../shared/userUtils.js");

class UserController {

    async listAll(_req,res){
        try {
            const allUsers = await userService.findAll();
            return res.status(200).json({httoCode: 200, sucess: true, result: allUsers, message: "Todos usuários listados"})
        } catch (error){
            console.info(`USERCONTROLLER LISTALL ERROR: ${error.message}`);
            return res.status(500).json({httpCode: 500, sucess: false, result: [], message: "Erro interno do servidor"});
        }
    };

    async insert(req,res){

        const body = req.body;
        const isValidBody = await verifyUserRequestData(body);
        if(!isValidBody.sucess){
            return res.status(400).json({ httpCode: 400, sucess: false, result: [], message: isValidBody.message});
        };

        await userService.create(body);

        return res.status(200).json({httpCode: 200, sucess: true, result:[body], message: "Usuário criado com sucesso"});
    };

    async getBySecretKey(req,res){
        const  { secretKey } = req.body;

        const response  = await userService.findByParamater("secret_key", secretKey);
        
        return res.status(response.httpCode).json(response)

    };

};

module.exports = UserController;