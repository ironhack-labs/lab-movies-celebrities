const router = require("express").Router();
const celebrities = require('../controllers/celebrities.controller');
/* GET home page */

router.get('/', celebrities.index);
router.get('/celebrities/create', celebrities.createCelebrities);
router.post('/celebrities/create', celebrities.doCreateCelebrities);
router.get('/celebrities', celebrities.list);

module.exports = router;
