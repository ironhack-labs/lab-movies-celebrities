require("dotenv").config();
require('../config/db.config')

const Celebrity = require('../models/Celebrity.model');
const celebrities = require('../data/movies')

Movie.create(celebrities)
    .then((celebrities) => console.info(`${celebrities.length} celebrities created`) )
    .catch ((error) => console.error(error));
