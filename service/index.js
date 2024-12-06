const express = require('express');
const app = express();

const uuid = require('uuid');

app.use(express.json());

let users = {};
let scores = [];

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

const port = process.argv.length > 2 ? process.argv[2] : 3000;

// app.get('*', (_req, res) => {
//     res.send({ msg: 'Simon service' });
// });



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

