module.exports = app => {

  const indexRoutes = require("./index.routes")
  app.use("/", indexRoutes)

  const celebritiesRoutes = require("./celebrities.routes")
  app.use("/celebrities", celebritiesRoutes)

  const moviesRoutes = require("./movies.routes")
  app.use("/movies", moviesRoutes)


}
