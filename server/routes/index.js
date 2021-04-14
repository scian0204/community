const { json } = require('body-parser');
var express = require('express');
var app = express();
const image = require('../images/image');
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

app.use(router)

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
  if (queryData.username !== null) {
    sql = `select postid, title, username, writedate, viewcnt, recmd from post where username='${queryData.username}'${queryData.order}`
  }
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

router.post('/postShow', (req, res) => {
  let responseData = {
    result: {
    }
  };
  let queryData = req.body;
  let sql = `UPDATE post SET viewcnt = viewcnt + 1 WHERE (postid = ${queryData.postid});`
  var query = connection.query(sql, function(err, rows) {
      if (err) throw err;
  });
  sql = `select post.*, userid from post left join member on member.username=post.username where postid=${queryData.postid}`;
  // console.log(sql);
  query = connection.query(sql, function(err, rows) {
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

router.post('/cmtList', (req, res) => {
  let responseData = {
    result: {
    }
  };
  let queryData = req.body;
  let sql = `select comment.*, userid from comment left join member on member.username=comment.username where postid=${queryData.postid}`;
  if (queryData.username !== null) {
    sql = `select comment.*, userid from comment left join member on member.username=comment.username where comment.username='${queryData.username}'`;
  }
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

router.post('/comment', function(req, res) {
  var {body} = req;
  var {postid, cmt, username} = body;
  var sql = `insert into comment (postid, cmt, username) values (${postid}, '${cmt}', '${username}')`;
  var query = connection.query(sql, function(err, rows) {
      if (err) throw err;
  });
});

router.post('/profile', (req, res) => {
  let responseData = {
    result: {
    }
  };
  let queryData = req.body;
  let sql = `select username, image, userid from member where userid='${queryData.userid}'`;
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

router.post('/form', (req, res) => {
  let formData = req.body.value;
  console.log(formData);
  res.json(formData);
});

router.use('/image', image);

module.exports = router;