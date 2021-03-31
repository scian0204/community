const express = require('express');
const app = express();
const api = require('./routes/index');
const bodyParser = require('body-parser');
const port =process.env.PORT || 3002;
const cors = require('cors');


let corsOptions = {
    origin: 'http://localhost:3000', // 허락하고자 하는 요청 주소
    credentials: true // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
} 


app.use(bodyParser.json());
app.use(cors(corsOptions)); // config 추가
app.use('/api', api);

app.listen(port, ()=>console.log(`Listening on port ${port}`));