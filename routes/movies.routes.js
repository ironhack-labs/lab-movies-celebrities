const router = require("express").Router();
const movies = require("../controllers/movie.controller");

// Todas las rutas aquí

router.post("/create", movies.doCreate);
//router.get("/list", movies.list);
//router.get("/:id", movies.detail);


module.exports = router;