const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

// all your rout

router.get('/celebrities', (req, res, next) => {
    res.render('celebrities-folder/celebrities-file')
});  

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities-folder/new-celebrity-file')
});  

router.post('/celebrities/create', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body;

    Celebrity.create({name, occupation, catchPhrase})
    .then((createdCeleb) => {
     console.log(`Created the book ${createdCeleb}`)
     
     res.redirect('/celebrities')
     //after creating the book, it's redirecting you to the books page.
    })
     
    .catch((err) => next(err));
     });


/* router.get('/books/edit', (req, res, next) => {
    res.render('books/book-edit')
});  

//POST route to receive the infor from the form and add it to the DB
router.post('/books/create', (req, res, next) => {
    const {title, author, description, rating} = req.body;

    Book.create({title, author, description, rating})
    .then((createdBook) => {
     console.log(`Created the book ${createdBook.title}`)
     res.redirect('/books') //after creating the book, it's redirecting you to the books page.
    })
     
    .catch((err) => next(err));
     });es here */

module.exports = router;