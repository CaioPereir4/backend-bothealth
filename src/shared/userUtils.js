
const requestUserExpectedDataFields = ["name", "secret_key", "role", "company"];

const verifyUserRequestData = async (requestBody) => {
    if(!requestBody){
        return { sucess: false, message: "Corpo da requisicao invalido"};
    };

    for (const expectedField of requestUserExpectedDataFields){
        if(!requestBody.hasOwnProperty(expectedField)){
           return { sucess: false, message: `Corpo da requisicao invalido, campos esperados: ${requestUserExpectedDataFields}`};
        };
    };

    if(!["user", "admin"].includes(requestBody.role)){
        return { sucess: false, message: "Role invalido, e valido user ou admin"};
    };

    return { sucess: true, message:"Requisicao valida"};
};



module.exports = {
    verifyUserRequestData
};