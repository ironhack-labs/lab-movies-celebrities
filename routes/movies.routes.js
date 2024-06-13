// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const Celebrity = require('../models/Celebrity'); // 导入 Celebrity 模型
const Movie = require('../models/Movie'); // 导入 Movie 模型

router.get("/movies", async (req, res, next) => {
    try {
      const movies = await Movie.find();
      res.render("movies/movies", { movies }); // Render movies.hbs and pass movies data
    } catch (error) {
      next(error);
    }
  });

// 显示创建新电影的表单页面
router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
      .then((celebrities) => {
        res.render('movies/new-movie', { celebrities }); // 传递 celebrities 到视图中以供用户选择演员
      })
      .catch((error) => {
        next(error);
      });
  });

// 处理从表单提交的数据，创建新电影并保存到数据库
router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
  
    Movie.create({ title, genre, plot, cast })
      .then(() => {
        res.redirect('/movies'); // 重定向回电影列表页面
      })
      .catch((error) => {
        next(error);
      });
  });

  // Display details of a specific movie
router.get('/movies/:id', async (req, res, next) => {
    try {
      const movieId = req.params.id;
      const movie = await Movie.findById(movieId).populate('cast');
      res.render('movies/movie-details', { movie });
    } catch (error) {
      next(error);
    }
  });

  // Delete movie
  router.post('/movies/:id/delete', async (req, res, next) => {
    try {
      const movieId = req.params.id;
      await Movie.findByIdAndRemove(movieId);
      res.redirect('/movies');
    } catch (error) {
      next(error);
    }
  });

  // Edit movie
  router.get('/movies/:id/edit', async (req, res, next) => {
    try {
      const movieId = req.params.id;
      const movie = await Movie.findById(movieId);
      const celebrities = await Celebrity.find();
      res.render('movies/edit-movie', { movie, celebrities });
    } catch (error) {
      next(error);
    }
  });

  // Update movie
  router.post('/movies/:id', async (req, res, next) => {
    try {
      const movieId = req.params.id;
      const { title, genre, plot, cast } = req.body;
  
      await Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast });
      res.redirect(`/movies/${movieId}`);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;