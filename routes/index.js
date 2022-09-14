const router = require('express').Router();
 
// GET route to retrieve and display all the books
router.get('/', (req, res) => {
  console.log(res.render('index'))
  

});
 
module.exports = router;