const router = require("express").Router();
const celebritiesController = require ('../controllers/celebrities.controller')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//listar celebrities
router.get("/celebrities", celebritiesController.list)

//crear celebrities
router.get("/celebrities/create", celebritiesController.create)
router.post("/celebrities", celebritiesController.doCreate);

//delete celebrities
router.post("/celebrities/:id/delete", celebritiesController.delete)













module.exports = router;
