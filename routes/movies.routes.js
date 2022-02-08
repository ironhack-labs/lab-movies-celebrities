// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movies = require("../models/Movies.model");


router.get("/", (req, res, next) => {
    Book.find()
      .populate("author")
      .then( booksFromDB => {
        res.render("books/books-list", {books: booksFromDB});
      })
      .catch(err => {
        console.log('Error getting books from DB...', err);
      })
  });
  
  
  router.get("/create", (req, res, next) => {
    Author.find()
      .then(authors => {
        res.render("books/book-create", {authorsArr: authors});
      })
      .catch(err => {
        console.log('Error getting authors from DB...', err);
      })
  });
  
  
  router.post('/create', (req, res, next) => {
  
    const bookDetails = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      rating: req.body.rating,
    }
  
    Book.create(bookDetails)
      .then( book => {
        res.redirect("/books");
      })
      .catch( err => {
        console.log('Error creating new book...', err);
      })
  })
  
  
  router.get("/:bookId", (req, res, next) => {
    Book.findById(req.params.bookId)
      .populate("author")
      .then( book => {
        res.render("books/book-details", book);
      })
      .catch();
  });
  
  
  router.get("/:bookId/edit", (req, res, next) => {
    Book.findById(req.params.bookId)
      .then( (bookDetails) => {
        res.render("books/book-edit", bookDetails);
      })
      .catch( err => {
        console.log("Error getting book details from DB...", err);
      });
  });
  
  router.post("/:bookId/edit", (req, res, next) => {
    const bookId = req.params.bookId;
  
    const newDetails = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      rating: req.body.rating,
    }
  
    Book.findByIdAndUpdate(bookId, newDetails)
      .then( () => {
        res.redirect(`/books/${bookId}`);
      })
      .catch( err => {
        console.log("Error updating book...", err);
      });
  });
  
  
  router.post("/:bookId/delete", (req, res, next) => {
    Book.findByIdAndDelete(req.params.bookId)
      .then(() => {
        res.redirect("/books");
      })
      .catch(err => {
        console.log("Error deleting book...", err);
      });
  
  });
  




module.exports = router;