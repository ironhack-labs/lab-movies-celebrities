
const celebritiesRoutes = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

celebritiesRoutes.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
})

celebritiesRoutes.post('/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({ name, occupation, catchPhrase })
    .then(celebrityCreated => {
        console.log('created celebrity ', celebrityCreated);
        res.redirect('/celebrities');
    })
    .catch(error => {
        res.render('celebrities/new-celebrity');
    })
})

celebritiesRoutes.get('/', (req, res, next) => {
    Celebrity.find()
    .then(celebrities => {
        res.render('celebrities/celebrities', { celebrities });
    })
    .catch(error => next(error))

})

celebritiesRoutes.get('/:id/detail', (req, res, next) => {
    const { id } = req.params
    Celebrity.findById( id )
    .then(celebrityDetail => {

        res.render('celebrities/celebrity-details',  { celebrityDetail } );
        console.log(celebrityDetail);
    })
    .catch(error => next(error))

})

celebritiesRoutes.get('/:id/delete', (req, res, next) => {
    const { id } = req.params;
    Celebrity.findByIdAndRemove( id )
    .then(celebrityDeleted => {
        console.log('celebrity deleted', celebrityDeleted);
        res.redirect('/celebrities');
    })
    .catch(error => next(error))
})

celebritiesRoutes.get('/:id/edit', async (req, res, next) => {
    const { id } = req.params;
    Celebrity.findById( id )
    .then(celebrity => {
        res.render('celebrities/edit-celebrity', { celebrity });
    })
        
   
})

celebritiesRoutes.post('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, occupation, catchPhrase } = req.body
    try{
        await Celebrity.findByIdAndUpdate( id, { name, occupation, catchPhrase } )
        const celebrityDetail = await Celebrity.findById( id )
        res.render('celebrities/celebrity-details',  { celebrityDetail } );
    } catch (error){
        next(error);
    }
})


module.exports = celebritiesRoutes;