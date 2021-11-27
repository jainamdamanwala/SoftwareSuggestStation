const users = require('./users');
const constructorMethod = (app) => {
  app.use('/', users);
  app.use("*", (request, response) => {
    response.status(404).json({
      error: "Route not found !"
    });
  });

}

module.exports = constructorMethod;