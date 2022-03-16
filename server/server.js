const express = require('express');
const app = express();
const api = require('./routes/index');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8081;
const cors = require('cors');

var safesitelist = ['http://cianas.kro.kr:3000', 'http://192.168.123.102:3000']

var corsOptions = {
    origin: function(origin, callback) {
        var issafesitelisted = safesitelist.indexOf(origin) !== -1;
        callback(null, issafesitelisted);
    },
    credentials: true
}


app.use(bodyParser.json());
app.use(cors()); // config 추가
app.use('/api', api);

app.listen(port, ()=>console.log(`Listening on port ${port}`));