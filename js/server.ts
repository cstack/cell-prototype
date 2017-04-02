import * as Express from "express";
let app = Express();
const port = 3000;

process.stdout.write(`http://localhost:${port}/`);

app.use(Express.static(__dirname + '/public'));
app.listen(port);