const { where } = require("sequelize");
const userRepository = require("../../user.js");

class AuthService {
    
    async verifySecretKey(secretKey) {
        try {
            let authorized = false;

            const isValidUser = await userRepository.findAll({
                where: {
                    secret_key: secretKey
                }
            });

            if(isValidUser.length !== 0 ){
                authorized = true; 
            };

            return { user: isValidUser, authorized : authorized};

        } catch (error) {
            console.info(`AUTHSERVICE ERROR: ${error.message}`);
            return false;
        };
    };
    
};

module.exports = AuthService

