var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.json({greeting:'Hello React x Node.js'});
});

module.exports = router;