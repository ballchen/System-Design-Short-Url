const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const port = config.get('port');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.listen(port, () => console.log(`short url server listening on port ${port}!`));
