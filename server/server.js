const express = require('express');
const app = express();
const api = require('./routes/index');
const bodyParser = require('body-parser');
const port =process.env.PORT || 3002;
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use('/api', api);

app.listen(port, ()=>console.log(`Listening on port ${port}`));