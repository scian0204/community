var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var responseData = {
  result: {
    postid: null,
    title: null,
    username: null,
    writedate: null,
    viewcnt: null,
    recmd: null
  }
};

var connection = mysql.createConnection({
  host : 'localhost',
  port : 3306,
  user : 'comu',
  password : '1234',
  database : 'community'  
});

connection.connect();

router.get('/', (req, res) => {
  var query = connection.query('select postid, title, username, writedate, viewcnt, recmd from post', function(err, rows) {
    if(err) throw err;
    if(rows[0]) {
      responseData.err = 1;
      responseData.result = {rows};
    } else {
      responseData.err = 0;
    }
    res.json(responseData);
  })
});

module.exports = router;