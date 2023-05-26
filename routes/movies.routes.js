const router = require("express").Router();

// All your routes here
router.get('/create', async (req, res) => {
    try {
      const celebrities = await Celebrity.find();
      res.render('movies/new-movie', { celebrities });
    } catch (error) {
      // Handle the error
    }
  });
  
  router.post('/create', async (req, res) => {
    try {
      const { title, genre, plot, cast } = req.body;
      const movie = new Movie({ title, genre, plot, cast });
      await movie.save();
      res.redirect('/movies');
    } catch (error) {
      // Handle the error
    }
  });
  

module.exports = router;
