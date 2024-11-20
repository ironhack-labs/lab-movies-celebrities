const hbs = require("hbs");

hbs.registerPartials(__dirname + "/views");

hbs.registerHelper("isSelected", function (id, cast, options) {
  console.log(id)
  console.log(cast)
  // Verifica si el id está en el array cast
  if (cast.includes(id)) {
    return "selected";
  }
  return "";
});
