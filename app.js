const {app} = require("./src/routes");

const port = 8080;

app.listen(port, () => {
    console.info(`Backend-bothealth is listening on: ${port}`);
})