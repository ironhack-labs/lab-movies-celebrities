const router = require("express").Router();
const celebrities = require("../controllers/celebrity.controller");

// Todas las rutas aquí
router.get("/create", celebrities.create);
router.post("/create", celebrities.doCreate);
router.get("/list", celebrities.list);

module.exports = router;