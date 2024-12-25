
const generateMessageToDisplay = (isBot,message) => {
    return {
        text: message,
        isHuman: isBot === true ? false : true,
        isBot: isBot
    }
};

module.exports = {
    generateMessageToDisplay
}