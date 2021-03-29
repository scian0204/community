const { json } = require('body-parser');
var express = require('express');
var app = express();
var router = express.Router();
var mysql = require("mysql");

var connection = mysql.createConnection({
  host : 'localhost',
  port : 3306,
  user : 'comu',
  password : '1234',
  database : 'community'  
});

connection.connect();

router.post('/postList', (req, res) => {
  let responseData = {
    result: {
      postid: null,
      title: null,
      username: null,
      writedate: null,
      viewcnt: null,
      recmd: null
    }
  };
  let queryData = req.body;
  let sql = `select postid, title, username, writedate, viewcnt, recmd from post${queryData.qwhere}${queryData.boardid}${queryData.order}`;
  // console.log(sql);
  var query = connection.query(sql, function(err, rows) {
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

router.post('/boardList', (req, res) => {
  let responseData = {
    result: {
      boardid: null,
      boardname: null,
      cnt: null
    }
  };
  let sql = `select post.boardid, board.boardname, count(post.postid) as cnt from post left join board on post.boardid = board.boardid group by boardid union select post.boardid, board.boardname, count(post.postid) as cnt from post right join board on post.boardid = board.boardid group by boardid order by cnt desc limit 8`;
  let boardList = {};
  var query = connection.query(sql, function(err, rows) {
    if(err) throw err;
    if(rows[0]) {
      responseData.err = 1;
      responseData.result = {rows};
    } else {
      responseData.err = 0;
    }
    res.json(responseData);
  });
});

router.post('/form', (req, res) => {
  let formData = req.body.value;
  console.log(formData);
  res.json(formData);
});

module.exports = router;