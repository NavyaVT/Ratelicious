var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/', (req, res, next)=> {
  const body = req.body;
  console.log(body);
  res.json(body);
  // res.render('index', { title: 'Express' });
});
module.exports = router;
