const hbs = require('hbs');

hbs.registerPartials (`${__dirname}/../views/partials`)

hbs.registerHelper('eachCastName', function(cast, options) {
   
    let castNames = cast.map(function(actor) {
        return actor.name;
    });
   
    return options.fn(castNames);
});