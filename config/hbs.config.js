const hbs = require("hbs");

hbs.registerHelper("isOptionSelected", function (cast) {
  if (cast.includes(this.id)) {
    return "selected";
  }
  return "";
});
