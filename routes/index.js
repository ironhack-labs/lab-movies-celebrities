const router = require("express").Router();

// 导入其他路由模块
const celebritiesRoutes = require('./celebrities.routes');
const moviesRoutes = require('./movies.routes');

// 将其他路由模块链接到主应用程序
router.use('/', celebritiesRoutes);
router.use('/', moviesRoutes);

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
