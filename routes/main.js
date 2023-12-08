const router = require("express").Router();
const celebritiesController = require("../controllers/celebrities.controller");
const moviesController = require("../controllers/movies.controller");
const usersController = require("../controllers/users.controller");
const authMiddlewares = require("../middlewares/auth.middlewares");

router.get("/", (req, res, next) => {
  res.render("home");
});

// Celebrities routes

router.get("/celebrities", celebritiesController.list);
router.get(
  "/celebrities/create",
  authMiddlewares.isAuthenticated,
  authMiddlewares.isAdmin,
  celebritiesController.create
);
router.get("/celebrities/:id", celebritiesController.detail);
router.post(
  "/celebrities",
  authMiddlewares.isAuthenticated,
  authMiddlewares.isAdmin,
  celebritiesController.doCreate
);
router.get(
  "/celebrities/:id/edit",
  authMiddlewares.isAuthenticated,
  authMiddlewares.isAdmin,
  celebritiesController.edit
);
router.post(
  "/celebrities/:id",
  authMiddlewares.isAuthenticated,
  authMiddlewares.isAdmin,
  celebritiesController.doEdit
);
router.post(
  "/celebrities/:id/delete",
  authMiddlewares.isAuthenticated,
  authMiddlewares.isAdmin,
  celebritiesController.delete
);

// Movies routes

router.get("/movies", moviesController.list);
router.get(
  "/movies/create",
  authMiddlewares.isAuthenticated,
  authMiddlewares.isAdmin,
  moviesController.create
);
router.get("/movies/:id", moviesController.detail);
router.post(
  "/movies",
  authMiddlewares.isAuthenticated,
  authMiddlewares.isAdmin,
  moviesController.doCreate
);
router.get(
  "/movies/:id/edit",
  authMiddlewares.isAuthenticated,
  authMiddlewares.isAdmin,
  moviesController.edit
);
router.post(
  "/movies/:id",
  authMiddlewares.isAuthenticated,
  authMiddlewares.isAdmin,
  moviesController.doEdit
);
router.post(
  "/movies/:id/delete",
  authMiddlewares.isAuthenticated,
  authMiddlewares.isAdmin,
  moviesController.delete
);

// User routes

router.get(
  "/register",
  authMiddlewares.isNotAuthenticated,
  usersController.register
);
router.get("/login", usersController.login);
router.post("/login", usersController.doLogin);
router.post("/register", usersController.doRegister);
router.get(
  "/profile",
  authMiddlewares.isAuthenticated,
  usersController.profile
);

router.get("/logout", usersController.logout);

module.exports = router;