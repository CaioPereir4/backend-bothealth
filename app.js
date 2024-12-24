require("dotenv").config();
    
(async () => {

    const database = require("./db.js");
    const User = require("./user.js");
    await database.sync();
    
})();

const {app} = require("./src/routes");

const port = 8080;

app.listen(port, () => {
    console.info(`Backend-bothealth is listening on: ${port}`);
});

