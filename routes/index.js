const router = require("express").Router();

// //(añadido por mi): tenemos que linkar las rutas o bien aquí, o bien en app.js(lo toma ya que index por defecto ya está aquí linkado)
const celebrities = require('./celebrities.routes');
router.use('/', celebrities);

const movies = require('./movies.routes')
router.use('/', movies)

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
