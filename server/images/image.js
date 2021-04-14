var express = require("express");
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
    let {fileName} = req.query;
    res.sendFile(path.join(__dirname, `./${fileName}`));
});

module.exports = router;
