const router = require("express").Router();


//--------- this has to be `/`  and can't just be anything. this is refering to the "routes" folder
//         |
router.get(`/`, (req, res, next) => {
   console.log(res.render(`./celebrities/new-celebrity`));
  

  });
  

  

  module.exports = router;