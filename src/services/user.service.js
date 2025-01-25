const { where } = require("sequelize");
const userRepository = require("../../user");


class UserService {

    async findAll(){
        try    {
            let allUsers = await userRepository.findAll();
            return allUsers.map(user => {
                user.secret_key =  "*******";
                return user
            });
        } catch (error){
            console.info(`USERSERVICE FINDALL ERROR: ${error.message}`);
            return [];
        };
    };

    async findByPk(pk){
        try {
            const user = await userRepository.findByPk(pk);
            
            if(user) {
                return { 
                    httpCode: 200,
                    name: user.name,
                    isUserAuthenticated: true,
                    role: user.role,
                    thread_id: user.thread_id,
                    messages: user.messages,
                    id: user.id
                };
            }

            return null;
        } catch (error){
            console.info(`[findByPk][ERROR]: ${error.message}`);
            return false;
        }
    }

    async create(userBody){
        try {
            const resultOfCreate = await userRepository.create(userBody);
            console.info(resultOfCreate);
            return { httpCode: 200, sucess: false, result: resultOfCreate, message: "Usuario criado com sucesso"};
        }  catch (error){
            return { httpCode: 500, sucess: false, result: [], message: "Erro interno do servidor" };
        };
    };

    async findByParamater(paramater, value){
        try {
            const user = await userRepository.findAll({where: {[paramater]: value}});

            if(user.length > 0) {
                return { 
                    httpCode: 200,
                    name: user[0].name,
                    isUserAuthenticated: true,
                    role: user[0].role,
                    thread_id: user[0].thread_id,
                    messages: user[0].messages,
                    id: user[0].id
                };
            }

            return { httpCode: 404, isUserAuthenticated: false, role: "not valid"};
        } catch (error){
            console.info(`[findByParamater][ERROR]: ${error.message}`);
            return { httpCode: 500, sucess: false, result: [], message: "Erro interno do servidor" };
        };
    };

    async update(id, userBody){
        try {
            console.info(id)
            console.info(userBody)
            await userRepository.update(userBody, { where: {id}});
            return { httpCode: 200, sucess: true, result: userBody, message: "Usuário atualizado com sucesso"};
        } catch (error){
            console.info(`[update][ERROR]: ${error.message}`);
            return { httpCode: 500, sucess: false, result: [], message: "Erro interno do servidor" };
        };

    };

};

module.exports = UserService