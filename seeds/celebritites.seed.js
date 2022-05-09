require('../db');
const celebrities = require('../data/celebrities');
const Celebrity = require('../models/Celebrity.model');

const celebrityseed = async ()=>{
    try {
        await Celebrity.deleteMany();
        await Celebrity.create(celebrities);
    } catch (error) {
        console.log(error);
    }
}

celebrityseed();