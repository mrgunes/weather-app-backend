let express = require('express');
let router = express.Router();

/* GET default weather page. */
router.get('/', (req, res, next)=>{
  res.render('index', { title: 'Express' });
});

module.exports = router;
