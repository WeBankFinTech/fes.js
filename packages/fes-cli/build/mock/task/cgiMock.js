

const express = require('express');
const argv = require('yargs').argv;

const port = argv.p || 8888;
const cwd = process.cwd();

const app = express();
const init = require('../init');

init(app, argv, cwd);

app.set('port', port);
app.listen(port, () => {
    console.log(`cgiMock server listening on ${port}`);
});
