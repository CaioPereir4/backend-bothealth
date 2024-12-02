const userRository = require("../../user");


class UserService {

    async findAll(){
        try    {
            const allUsers = await userRository.findAll();
            return allUsers;
        } catch (error){
            console.info(`USERSERVICE FINDALL ERROR: ${error.message}`);
            return [];
        };
    };

    async create(userBody){
        try {
            const resultOfCreate = await userRository.create(userBody);
            console.inf(resultOfCreate);
            return { httpCode: 200, sucess: false, result: resultOfCreate, message: "Usuario criado com sucesso"};
        }  catch (error){
            return { httpCode: 500, sucess: false, result: [], message: "Erro interno do servidor" };
        };
    }

};

module.exports = UserService